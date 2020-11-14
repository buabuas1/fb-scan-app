import { Injectable } from '@angular/core';
import {AppConfig} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import {GetGroupBodyModel} from '../../common/model/get-group-body.model';
import {GetMemGroupBodyModel} from '../../common/model/get-mem-group-body.model';

@Injectable({
  providedIn: 'root'
})
export class UserFacebookTokenService {
    public TOKEN_KEY = 'TOKEN_KEY';
    public CURRENT_TOKEN_KEY = 'CURRENT_TOKEN_KEY';
    private host = AppConfig.beHost;

    constructor(public httpClient: HttpClient) {
    }

    getSettingToken() {
        return this.httpClient.get(`${this.host}api/fbtoken`);
    }

    saveSettingToken(userToken: UserFacebookToken) {
        if (userToken) {
            userToken = this.makeUpdateToken(userToken, userToken.token);
            userToken.cookie = userToken.cookie;
        }
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(userToken));
        return this.httpClient.post(`${this.host}api/fbtoken`, userToken);
    }

    private makeUpdateToken(currentToken: UserFacebookToken, token: string) {
        let addFriendBody = new InviteFriendBodyModel(currentToken.addFriendBody);
        currentToken.addFriendBody = currentToken.addFriendBody.replace(addFriendBody.fb_dtsg, token);

        let getGroupFeedBody = new GetGroupBodyModel(currentToken.getGroupFeedBody);
        currentToken.getGroupFeedBody = currentToken.getGroupFeedBody.replace(getGroupFeedBody.fb_dtsg, token);

        let getMemberOfGroupBody = new GetMemGroupBodyModel(currentToken.getMemberOfGroupBody);
        currentToken.getMemberOfGroupBody = currentToken.getMemberOfGroupBody.replace(getMemberOfGroupBody.fb_dtsg, token);

        let getRecentlyFriendBody = new GetMemGroupBodyModel(currentToken.getRecentlyFriendBody);
        currentToken.getRecentlyFriendBody = currentToken.getRecentlyFriendBody.replace(getRecentlyFriendBody.fb_dtsg, token);

        let inviteFriendToGroupBody = new GetMemGroupBodyModel(currentToken.inviteFriendToGroupBody);
        currentToken.inviteFriendToGroupBody = currentToken.inviteFriendToGroupBody.replace(inviteFriendToGroupBody.fb_dtsg, token);

        return currentToken;
    }

    public getCurrentUserToken() {
        return JSON.parse(localStorage.getItem(this.CURRENT_TOKEN_KEY)) as UserFacebookToken;
    }
}