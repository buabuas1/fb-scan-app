import {Component, OnInit, ViewChild} from '@angular/core';
import * as queryString from 'query-string';
import {ElectronService} from '../core/services';
import {GetFriendRecentlyModel} from '../common/model/get-friend-recently.model';
import {HeaderModel} from '../common/model/header.model';
import {FB_COOKIE_LC_KEY, FB_GROUP_ID_LC_KEY, FB_INVITE_LC_KEY, LC_BODY_KEY} from '../common/constant';
import {LoggerService} from '../core/services/logger/logger.service';
import {InviteToGroupBodyModel} from '../common/model/invite-to-group-body.model';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../common/model/user-facebook-token';
import {interval, Observable} from 'rxjs';
import {BaseComponent} from '../shared/components/base/base.component';

@Component({
    selector: 'app-detail',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent extends BaseComponent implements OnInit {
    public fbBody: any;
    public body: GetFriendRecentlyModel;
    public header: HeaderModel;
    public LC_BODY_KEY = LC_BODY_KEY;
    public listIdsStr = '';
    public listIds = [];
    public groupId = '1854370624678388,3216226258488385,2867265896836477,634484607205600';
    public inviteBodyStr = '';
    public inviteBody = new InviteToGroupBodyModel();
    public isShowSetting = false;
    public userToken: UserFacebookToken;
    public timeSpace = 10;
    public logContent = '';
    public getRecentlyFriendSpaceTime = 10 * 60;
    public isRunningInviteFriend = false;
    public autoGetAndInviteFriend$: any;
    public inviteFriend$: any;
    constructor(private electronService: ElectronService,
                private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService) {
        super();
    }

    ngOnInit(): void {
        this.userToken  = this.userFacebookTokenService.getCurrentUserToken();
        if (this.userToken) {
            this.fbBody = this.userToken.getRecentlyFriendBody;
            this.body = new GetFriendRecentlyModel(this.fbBody);
            this.header = new HeaderModel(this.userToken);
            this.inviteBodyStr = this.userToken.inviteFriendToGroupBody;
            this.inviteBody = new InviteToGroupBodyModel(this.inviteBodyStr);
            this.groupId = localStorage.getItem(FB_GROUP_ID_LC_KEY);
        }
        this.userFacebookTokenService.resetOldRecentlyFriend();
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
            this.loggerService.success(`Tên: ${data.map(u => u.node.title.text).join(', ')}`);
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
        localStorage.setItem(FB_GROUP_ID_LC_KEY, this.groupId);
        if (lsGroupId.length === 0 || this.listIds.length === 0) {
            this.loggerService.error('Danh sách nhóm hoặc danh sách user đang trống!');
            return;
        }
        this.isRunningInviteFriend = true;
        this.inviteFriend$ = interval(1000 * this.timeSpace).take(lsGroupId.length * this.listIds.length)
            .takeUntil(this.destroyed$)
            .subscribe(async rs => {
                const g = lsGroupId[Math.floor(rs / this.listIds.length)];
                const i = this.listIds[rs % this.listIds.length];

                this.inviteBody.setGroupId(g);
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
                if (rs === lsGroupId.length * this.listIds.length - 1) {
                    this.loggerService.warning(`Đã xong!`);
                    console.log(`Đã xong!`);
                    this.logContent += `${new Date().toLocaleTimeString()} Đã xong! \n`;
                    this.isRunningInviteFriend = false;
                }
            })
    }

    public saveInviteBody() {
        this.inviteBody = new InviteToGroupBodyModel(this.inviteBodyStr);
        localStorage.setItem(FB_INVITE_LC_KEY, this.inviteBodyStr);
    }

    public Stop() {
        this.isRunningInviteFriend = false;
        if (this.inviteFriend$) {
            this.inviteFriend$.unsubscribe();
            this.isRunningInviteFriend = false;
            this.loggerService.success('Đã dừng hoàn toàn invite friend');
            this.logContent += `${new Date().toLocaleTimeString()} Đã dừng hoàn toàn invite friend\n`;
        }
    }

    public changeSetting() {
        this.isShowSetting = !this.isShowSetting;
        this.ngOnInit();
    }

    public onAuto() {
        if (this.isRunningInviteFriend) {
            this.loggerService.error('Đang chạy invite!. Stop it plz!');
        }
        if (this.getRecentlyFriendSpaceTime < (this.listIds.length * this.groupId.split(',').length + 5) * this.timeSpace) {
            this.loggerService.error('Thời gian giữa 2 lần chạy get user < thời gian gọi api invite!');
            this.logContent += `${new Date().toLocaleTimeString()} Thời gian giữa 2 lần chạy get user < thời gian gọi api invite!`
        }
        this.autoGetAndInviteFriend$ = Observable.concat(
            Observable.timer(0,1000 * this.getRecentlyFriendSpaceTime),
            Observable.interval(1000 * this.getRecentlyFriendSpaceTime).repeat()
        )
            .takeUntil(this.destroyed$)
            .subscribe(async rs => {
            if (this.isRunningInviteFriend) {
                this.loggerService.error('Đang chạy invite!. Stop it plz!');
                this.logContent += `${new Date().toLocaleTimeString()} 'Đang chạy invite!. Stop it plz!'`;
                this.onStop();
                return;
            }
            await this.callApi();
            this.listIds = this.userFacebookTokenService.getNewestFriendIds(this.listIds);
            this.logContent += `${new Date().toLocaleTimeString()} Có ${this.listIds.length} user mới \n`;

            await this.callInviteApi();

            this.userFacebookTokenService.setOldRecentlyFriend(this.listIds);

        });
    }

    public onStop() {
        if (this.autoGetAndInviteFriend$) {
            this.autoGetAndInviteFriend$.unsubscribe();
            this.loggerService.success('Stopped autoGetAndInviteFriend$!');
            this.logContent += `${new Date().toLocaleTimeString()} autoGetAndInviteFriend$ Stopped!`;
            if (this.inviteFriend$) {
                this.inviteFriend$.unsubscribe();
                this.loggerService.success('Stopped inviteFriend$!');
                this.logContent += `${new Date().toLocaleTimeString()} inviteFriend$ Stopped!`;
            }
        }
    }
}
