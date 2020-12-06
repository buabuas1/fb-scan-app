import { Injectable } from '@angular/core';
import {AppConfig} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import {GetGroupBodyModel} from '../../common/model/get-group-body.model';
import {GetMemGroupBodyModel} from '../../common/model/get-mem-group-body.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {HeaderModel} from '../../common/model/header.model';
import {LoggerService} from './logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacebookTokenService {
    public TOKEN_KEY = 'TOKEN_KEY';
    // public CURRENT_TOKEN_KEY = 'CURRENT_TOKEN_KEY';
    private host = AppConfig.beHost;
    private oldRecentlyFriend = [];
    private isFirst = false;
    public tokenList: BehaviorSubject<UserFacebookToken[]> = new BehaviorSubject<UserFacebookToken[]>([]);
    public activeToken: BehaviorSubject<UserFacebookToken> = new BehaviorSubject<UserFacebookToken>({} as UserFacebookToken);

    constructor(public httpClient: HttpClient,
                private loggerService: LoggerService) {
    }

    getSettingToken() {
        return this.httpClient.get(`${this.host}api/fbtoken`);
    }

    saveSettingToken(userToken: UserFacebookToken) {
        if (userToken) {
            userToken = this.makeUpdateToken(userToken, userToken.token);
            userToken.cookie = userToken.cookie;
        }
        // localStorage.setItem(this.CURRENT_TOKEN_KEY, JSON.stringify(userToken));
        return this.httpClient.post(`${this.host}api/fbtoken`, userToken);
    }

    private makeUpdateToken(currentToken: UserFacebookToken, token: string) {
        let addFriendBody = new InviteFriendBodyModel(currentToken.addFriendBody);
        currentToken.addFriendBody = currentToken.addFriendBody.replace(addFriendBody.fb_dtsg, token);

        let getGroupFeedBody = new GetGroupBodyModel(currentToken.getGroupFeedBody);
        currentToken.getGroupFeedBody = currentToken.getGroupFeedBody.replace(getGroupFeedBody.fb_dtsg, token);

        let getMemberOfGroupBody = new GetMemGroupBodyModel(currentToken.getMemberOfGroupBody);
        currentToken.getMemberOfGroupBody = currentToken.getMemberOfGroupBody.replace(getMemberOfGroupBody.fb_dtsg, token);

        let getMemberOfGroupSecondBody = new GetMemGroupBodyModel(currentToken.getMemberOfGroupSecondBody);
        currentToken.getMemberOfGroupSecondBody = currentToken.getMemberOfGroupSecondBody.replace(getMemberOfGroupSecondBody.fb_dtsg, token);

        let getRecentlyFriendBody = new GetMemGroupBodyModel(currentToken.getRecentlyFriendBody);
        currentToken.getRecentlyFriendBody = currentToken.getRecentlyFriendBody.replace(getRecentlyFriendBody.fb_dtsg, token);

        let inviteFriendToGroupBody = new GetMemGroupBodyModel(currentToken.inviteFriendToGroupBody);
        currentToken.inviteFriendToGroupBody = currentToken.inviteFriendToGroupBody.replace(inviteFriendToGroupBody.fb_dtsg, token);

        return currentToken;
    }

    // public getCurrentUserToken() {
    //     return JSON.parse(localStorage.getItem(this.CURRENT_TOKEN_KEY)) as UserFacebookToken;
    // }

    public setOldRecentlyFriend(oldRecentlyFriend: string[]) {
        this.oldRecentlyFriend = oldRecentlyFriend;
    }

    public resetOldRecentlyFriend() {
        this.oldRecentlyFriend = [];
    }

    public getNewestFriendIds(ids: any[] = []) {
        const rs = ids.filter(id => this.oldRecentlyFriend.indexOf(id) === -1);
        return rs;
    }

    public resetTokenList() {
        this.getSettingToken()
            .subscribe(rs => {
                this.loggerService.success('Tải về danh sách token thành công!');
                this.tokenList.next(rs as UserFacebookToken[]);
            })

    }

    public setActiveToken(token: UserFacebookToken) {
        this.activeToken.next(token);
    }
}
