import {Component, OnInit} from '@angular/core';
import {FB_COOKIE_LC_KEY, FB_FRIEND_ADD_LC_KEY} from '../../common/constant';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import * as R from 'ramda';
import {ElectronService} from '../../core/services';
import {LoggerService} from '../../core/services/logger/logger.service';
import {HeaderModel} from '../../common/model/header.model';
import {UserFacebookTokenService} from '../../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {interval, Observable} from 'rxjs';

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
    public userToken: UserFacebookToken;
    public spaceTime = 1;
    public logContent = '';

    constructor(private electronService: ElectronService,
                private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService) {
    }

    ngOnInit(): void {
        this.userToken  = this.userFacebookTokenService.getCurrentUserToken();
        this.inviteBodyStr = this.userToken.addFriendBody;
        this.inviteBody = new InviteFriendBodyModel(this.inviteBodyStr);
        this.header = new HeaderModel(this.userToken);
    }

    public async onAddFriend() {
        this.cancelToken = false;
        let listIds = this.listIdsStr.replace(/"/g, '').split(',');
        listIds = R.uniq(listIds).filter(r => r);
        interval(1000 * this.spaceTime).take(listIds.length)
            .subscribe(async rs => {
                const i = listIds[rs];
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
                if (rs === listIds.length - 1) {
                    this.loggerService.warning(`Đã xong ${listIds.length}!`);
                    console.log(`Đã xong! ${listIds.length}`);
                    this.logContent += `${new Date().toLocaleTimeString()} Đã xong! ${listIds.length}`;
                }
            });
    }

    public saveInviteBody() {
        this.inviteBody = new InviteFriendBodyModel(this.inviteBodyStr);
        localStorage.setItem(FB_FRIEND_ADD_LC_KEY, this.inviteBodyStr);
    }

    public onStop() {
        this.cancelToken = true;
    }
}
