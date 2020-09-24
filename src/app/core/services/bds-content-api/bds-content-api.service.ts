import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdsContentApiService {

    private host = AppConfig.beHost;

    constructor(public httpClient: HttpClient) {
    }

    getFbContent(postTime: Date, groupIds: string) {
        return this.httpClient.get(this.host + 'api/fbcontent', {
            params:
                {postTime: postTime.toISOString(), groupIds: groupIds}
        });
    }

    saveFbContent(data) {
        return this.httpClient.post(this.host + 'api/fbcontent/bulk', {data: data});
    }

    getFindRoomChart(postTime: Date, limit: number) {
        const params = new HttpParams({
            fromObject: {
                postTime: postTime.toISOString(),
                limit: limit.toString(),
            }
        });
        return this.httpClient.get(this.host + 'api/fbcontent/chart', {
            params: params
        });
    }

    getTopPostChart(postTime: Date, limit: number) {
        const params = new HttpParams({
            fromObject: {
                postTime: postTime.toISOString(),
                limit: limit.toString(),
            }
        });
        return this.httpClient.get(this.host + 'api/fbcontent/chart/top/post', {
            params: params
        });
    }

    public login(name: string, password: string): Observable<any> {
        // const user = new UserData(name, 'admin');
        // this.session.createNewSession(user);
        // // this.store.dispatch(new AuthActionAddAction(user));
        // return Observable.of(user);
        return new Observable(obs => {
            this.httpClient.post(this.host + 'api/auth/login', {
                'email': name,
                'password': password
            })
                .take(1)
                .subscribe((rs: any) => {
                    obs.next(rs.user);
                });
        });
    }
}
