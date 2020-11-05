import {Component, OnInit, ViewChild} from '@angular/core';
import * as queryString from 'query-string';
import {ElectronService} from '../core/services';
import {GetFriendRecentlyModel} from '../common/model/get-friend-recently.model';
import {HeaderModel} from '../common/model/header.model';
import {FB_COOKIE_LC_KEY} from '../common/constant';
import {LoggerService} from '../core/services/logger/logger.service';

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
    constructor(private electronService: ElectronService,
                private loggerService: LoggerService) {
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
        try {
            const rs = await this.electronService.callApi(queryString.stringify(this.body), this.header);
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
}
