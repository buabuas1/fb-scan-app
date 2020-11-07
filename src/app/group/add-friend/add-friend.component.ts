import {Component, OnInit} from '@angular/core';
import {FB_COOKIE_LC_KEY, FB_FRIEND_ADD_LC_KEY} from '../../common/constant';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import {InviteToGroupBodyModel} from '../../common/model/invite-to-group-body.model';
import {ElectronService} from '../../core/services';
import {LoggerService} from '../../core/services/logger/logger.service';
import {HeaderModel} from '../../common/model/header.model';

@Component({
    selector: 'app-add-friend',
    templateUrl: './add-friend.component.html',
    styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
    public listIdsStr: any;
    public inviteBodyStr: any;
    public inviteBody: InviteFriendBodyModel;
    public header: HeaderModel;
    public cancelToken = false;

    constructor(private electronService: ElectronService,
                private loggerService: LoggerService) {
    }

    ngOnInit(): void {
        this.inviteBodyStr = localStorage.getItem(FB_FRIEND_ADD_LC_KEY) || '';
        this.inviteBody = new InviteFriendBodyModel(this.inviteBodyStr);
        this.header = JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) ? JSON.parse(localStorage.getItem(FB_COOKIE_LC_KEY)) : new HeaderModel();
    }

    public async onAddFriend() {
        this.cancelToken = false;
        const listIds = this.listIdsStr.replace(/"/g, '').split(',');
        for (const i of listIds) {
            if (this.cancelToken) {
                return ;
            }
            this.inviteBody.setUserId(i);
            try {
                const rs = await this.electronService.callApi(this.inviteBody, this.header);
                if (rs && rs.indexOf('OUTGOING_REQUEST') !== -1) {
                    this.loggerService.success(`Thêm bạn thành công: ${i}`);
                } else {
                    this.loggerService.error(`Thêm bạn KHÔNG thành công: ${i}`);
                }
            } catch (ex) {
                console.log(ex);
                this.loggerService.error(ex);
            }
        }
        this.loggerService.warning(`Đã xong ${listIds.length}!`);
        console.log(`Đã xong! ${listIds.length}`);
    }

    public saveInviteBody() {
        this.inviteBody = new InviteFriendBodyModel(this.inviteBodyStr);
        localStorage.setItem(FB_FRIEND_ADD_LC_KEY, this.inviteBodyStr);
    }

    public onStop() {
        this.cancelToken = true;
    }
}
