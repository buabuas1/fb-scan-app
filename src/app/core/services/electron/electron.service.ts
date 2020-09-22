import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      // If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
      // this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  public callApi(body: string): Promise<string> {
      return new Promise((resolve, reject) => {
          const net = this.remote.net;
          let data = '';
          const request = net.request({
              method: 'POST',
              protocol: 'https:',
              hostname: 'www.facebook.com/',
              path: 'api/graphql',
              redirect: 'follow'
          });
          request.on('response', (response) => {
              // console.log(`STATUS: ${response.statusCode}`);
              // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
              response.on('end', () => {
                  // console.log(response.statusCode);
                  // console.log(data);
                  resolve(data);
              });
              response.on('data', (chunk) => {
                  // this.fs.writeFile('test', chunk.toString('utf-8'), null, () => console.log('done'));
                  // this.fs.writeFile('test1', chunk.toString(), null, () => console.log('done'));
                  // resolve(chunk.toString('utf-8'));
                  // console.log(`BODY: ${chunk}`)
                  data += chunk.toString('utf-8');
              });
          });
          request.on('finish', () => {
              // console.log('Request is Finished')
          });
          request.on('abort', () => {
              // console.log('Request is Aborted')
          });
          request.on('error', (error) => {
              console.log(`ERROR: ${JSON.stringify(error)}`)
              reject(error);
          });
          request.on('close', (error) => {
              // console.log('Last Transaction has occured')
          });
          request.setHeader('authority', 'www.facebook.com');
          // request.setHeader('host', 'www.facebook.com');
          request.setHeader('pragma', 'no-cache');
          request.setHeader('cache-control', 'no-cache');
          request.setHeader('origin', 'https://www.facebook.com');
          request.setHeader('user-agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/85.0.134 Chrome/79.0.3945.134 Safari/537.36');
          request.setHeader('viewport-width', '1318');
          request.setHeader('content-type', 'application/x-www-form-urlencoded');
          // request.setHeader('content-length', body.length.toString());
          request.setHeader('accept', '*/*');
          request.setHeader('sec-fetch-site', 'same-origin');
          request.setHeader('sec-fetch-mode', 'cors');
          request.setHeader('referer', 'https://www.facebook.com/');
          request.setHeader('accept-encoding', 'gzip, deflate, br');
          request.setHeader('accept-language', 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5');
          request.setHeader('cookie', 'datr=tFlKX7OaeS616mYfmB08Hhf_; sb=ullKXz1t9QKYUrskK6fgfPz9; c_user=100046024845887; wd=1318x623; _fbp=fb.1.1598920724059.535470942; spin=r.1002600685_b.trunk_t.1598976575_s.1_v.2_; xs=46%3AzYEPy7jlImnM9A%3A2%3A1598708155%3A18239%3A6319%3A%3AAcW9rvCc0xQpN3sLGcj6FXLXQu5aZpnn6DXQWpRmuFw; fr=155JZ4JejkulIncRA.AWVfVuWqIEDNdwKqBV_1ePDM30E.BfSlm6.Lc.AAA.0.0.BfTt37.AWUl6U8w');

          request.write(body, 'utf-8');
          request.end();
      })
  }


}
