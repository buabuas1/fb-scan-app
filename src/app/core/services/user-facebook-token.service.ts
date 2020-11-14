import { Injectable } from '@angular/core';
import {AppConfig} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';

@Injectable({
  providedIn: 'root'
})
export class UserFacebookTokenService {
    public TOKEN_KEY = 'TOKEN_KEY';
    private host = AppConfig.beHost;

    constructor(public httpClient: HttpClient) {
    }

    saveSettingToken(token: string) {
        let currentToken = JSON.parse(localStorage.getItem(this.TOKEN_KEY)) as UserFacebookToken;
        if (currentToken) {
            this.makeUpdateToken(currentToken, token);
        }
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(currentToken));
        return this.httpClient.post(`${this.host}/fbtoken`, currentToken);
    }

    private makeUpdateToken(currentToken: UserFacebookToken, token: string) {
        let addFriendBody = new InviteFriendBodyModel(currentToken.addFriendBody);
        currentToken.addFriendBody.replace(addFriendBody.fb_dtsg, token);
        currentToken.getGroupFeedBody = '';
        currentToken.getMemberOfGroupBody = '';
        currentToken.getRecentlyFriendBody = '';
        currentToken.inviteFriendToGroupBody = '';
    }

    getSettingToken() {
        return this.httpClient.get(`${this.host}/fbtoken`);
    }
}
