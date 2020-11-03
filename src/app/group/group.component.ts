import {Component, OnInit, ViewChild} from '@angular/core';
import * as queryString from 'query-string';
import {ElectronService} from '../core/services';
import {GetFriendRecentlyModel} from '../common/model/get-friend-recently.model';
import {HeaderModel} from '../common/model/header.model';
import {FB_COOKIE_LC_KEY} from '../common/constant';

@Component({
    selector: 'app-detail',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    public fbBody: any;
    public body: GetFriendRecentlyModel;
    public header: HeaderModel;
    public LC_BODY_KEY = 'FRIEND_RC_BODY'
    constructor(private electronService: ElectronService) {
    }

    ngOnInit(): void {
        this.fbBody = localStorage.getItem(this.LC_BODY_KEY);
        this.body = new GetFriendRecentlyModel(localStorage.getItem(this.LC_BODY_KEY));
        this.header = JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) ? JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) : new HeaderModel();
    }

    public saveFbToken() {
        localStorage.setItem(this.LC_BODY_KEY, this.fbBody);
        this.body = new GetFriendRecentlyModel(this.fbBody);
    }

    public async callApi() {
        const rs = await this.electronService.callApi(queryString.stringify(this.body), this.header);
        console.log(rs);
    }
}
