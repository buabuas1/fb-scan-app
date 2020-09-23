import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {API_TOKEN_LC_KEY} from '../constant';
// import {SessionSettingsService} from '@core/services/settings';
// import {AuthService} from '@core/services/auth';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(
        // private sessionSettingsService: SessionSettingsService,
        //         private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log('intercepted request ... ');

        // Clone the request to add the new header.
        let token = localStorage.getItem(API_TOKEN_LC_KEY);
        // if (this.authService.isAuthenticated()) {
        //     token = this.sessionSettingsService.getToken();
        // }
        const authReq = token ?
            req.clone(
                {
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                }) : req.clone({});

        console.log('Sending request with new header now ...');

        // send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                console.log(error);
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
