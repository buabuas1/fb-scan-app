import {Component, OnInit, ViewChild} from '@angular/core';
import * as queryString from 'query-string';
import {ElectronService} from '../core/services';
import {GetFriendRecentlyModel} from '../common/model/get-friend-recently.model';
import {HeaderModel} from '../common/model/header.model';
import {FB_COOKIE_LC_KEY, FB_INVITE_LC_KEY} from '../common/constant';
import {LoggerService} from '../core/services/logger/logger.service';
import {InviteToGroupBodyModel} from '../common/model/invite-to-group-body.model';

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
    public listIdsStr = '';
    public listIds = [];
    public groupId = '1854370624678388,3216226258488385,4052747384740056,634484607205600';
    public inviteBodyStr = '';
    public inviteBody = new InviteToGroupBodyModel();
    constructor(private electronService: ElectronService,
                private loggerService: LoggerService) {
    }

    ngOnInit(): void {
        this.fbBody = localStorage.getItem(this.LC_BODY_KEY) || '';
        this.body = new GetFriendRecentlyModel(this.fbBody);
        this.header = JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) ? JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) : new HeaderModel();
        this.inviteBodyStr = localStorage.getItem(FB_INVITE_LC_KEY) || '';
        this.inviteBody = new InviteToGroupBodyModel(this.inviteBodyStr);
    }

    public saveFbToken() {
        localStorage.setItem(this.LC_BODY_KEY, this.fbBody);
        this.body = new GetFriendRecentlyModel(this.fbBody);
    }

    public async callApi() {
        try {
            const rs = await this.electronService.callApi(this.body, this.header);
            const data = (JSON.parse(rs) as any).data.node.all_collections.nodes[0].style_renderer.collection.pageItems.edges as any[]
            const ids = data.map(u => u.node.node.id);
            console.log(ids);
            this.listIds = ids;
            this.listIdsStr = this.listIds.join(',');
            this.loggerService.success(`Get bạn gần đây thành công: ${ids.length}`);
        } catch (e) {
            this.loggerService.error(JSON.stringify(e));
            console.log(e);
        }

    }

    public saveListId() {
        this.listIds = this.listIdsStr.split(',');
    }

    public async callInviteApi() {
        const lsGroupId = this.groupId.split(',');
        for (const g of lsGroupId) {
            this.inviteBody.setGroupId(g);
            for (const i of this.listIds) {
                this.inviteBody.setUserId(i);
                try {
                    const rs = await this.electronService.callApi(this.inviteBody, this.header);
                    if (rs && rs.indexOf(g) !== -1) {
                        this.loggerService.success(`Mời thành công: ${i} vào nhóm ${g}`);
                    } else {
                        this.loggerService.error(`Mời KHÔNG thành công: ${i} vào nhóm ${g}`);
                    }
                } catch (ex) {
                    console.log(ex);
                    this.loggerService.error(ex);
                }
            }
        }
        this.loggerService.warning(`Đã xong!`);
        console.log(`Đã xong!`);
    }

    public saveInviteBody() {
        this.inviteBody = new InviteToGroupBodyModel(this.inviteBodyStr);
        localStorage.setItem(FB_INVITE_LC_KEY, this.inviteBodyStr);
    }
}
