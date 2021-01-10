import {Component, OnInit, ViewChild} from '@angular/core';
import * as R from 'ramda';
import {ElectronService, ModalService} from '../core/services';
import {GetFriendRecentlyModel} from '../common/model/get-friend-recently.model';
import {HeaderModel} from '../common/model/header.model';
import {FB_COOKIE_LC_KEY, FB_GROUP_ID_LC_KEY, FB_INVITE_LC_KEY, LC_BODY_KEY} from '../common/constant';
import {LoggerService} from '../core/services/logger/logger.service';
import {InviteToGroupBodyModel} from '../common/model/invite-to-group-body.model';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../common/model/user-facebook-token';
import {interval, Observable} from 'rxjs';
import {BaseComponent} from '../shared/components/base/base.component';
import {IConfirmOptions} from '../shared/modal/confirm/confirm.component';

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
    public timeSpace = 30;
    public logContent = '';
    public getRecentlyFriendSpaceTime = 20 * 60;
    public isRunningInviteFriend = false;
    public autoGetAndInviteFriend$: any;
    public inviteFriend$: any;
    public numberOfCalledInviteApi = 0;
    public numberOfSuccessInviteApi = 0;
    public ignoreUsers = [];
    public maxInviteNumber = 50;
    public stopIfInviteFail = true;
    public ignoreFirstList = true;
    constructor(private electronService: ElectronService,
                private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService,
                private modalService: ModalService) {
        super();
    }

    ngOnInit(): void {
        this.userFacebookTokenService.activeToken
            .takeUntil(this.destroyed$)
            .subscribe(rs => {
                this.userToken = rs;
                if (this.userToken) {
                    this.fbBody = this.userToken.getRecentlyFriendBody;
                    this.body = new GetFriendRecentlyModel(this.fbBody);
                    this.header = new HeaderModel(this.userToken);
                    this.inviteBodyStr = this.userToken.inviteFriendToGroupBody;
                    this.inviteBody = new InviteToGroupBodyModel(this.inviteBodyStr);
                    document.title = this.userToken.facebookName;
                }
                this.userFacebookTokenService.resetOldRecentlyFriend();
                this.numberOfCalledInviteApi = 0;
            })
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
            this.logContent += `${new Date().toLocaleTimeString()} Tên: ${data.map(u => u.node.title.text).join(', ')}\n`;
        } catch (e) {
            this.onStop()
            this.loggerService.error(JSON.stringify(e));
            console.log(e);
            this.logContent += `Error ${new Date().toLocaleTimeString()} Get bạn gần đây KHÔNG thành công \n`
        }

    }

    public saveListId() {
        this.listIds = this.listIdsStr.split(',');
    }

    public async callInviteApi() {
        const lsGroupId = this.groupId.split(',');
        if (lsGroupId.length === 0 || this.listIds.length === 0) {
            this.loggerService.error('Danh sách nhóm hoặc danh sách user đang trống!');
            this.logContent += `${new Date().toLocaleTimeString()} Danh sách nhóm hoặc danh sách user đang trống!\n`;
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
                    if (this.stopIfInviteFail && this.ignoreUsers.indexOf(i) !== -1) {
                        this.logContent += `Error: Ignore user ${i}\n`;
                        this.loggerService.warning(`Error: Ignore user ${i}`);
                        return;
                    }
                    const rs1 = await this.electronService.callApi(this.inviteBody, this.header);
                    if (rs1 && rs1.indexOf(i) !== -1) {
                        this.loggerService.success(`Mời thành công: ${i} vào nhóm ${g}`);
                        this.numberOfSuccessInviteApi++;
                    } else if (rs1 && rs1.indexOf(g) !== -1) {
                        this.loggerService.success(`Gọi API thành công: ${i} vào nhóm ${g}`);
                    } else if (this.isError(rs1)) {
                        this.modalService.confirm(<IConfirmOptions>{
                            title: `Thông báo`,
                            message: `Đã có lỗi xảy ra, token hết hạn hoặc đã bị chặn?`,
                            ignoreBackdropClick: true
                        }).subscribe(() => {

                        });
                        this.ignoreUsers.push(i);
                        console.log('invite result: ', rs1);
                        this.logContent += this.loggerService.addLog(this.logContent, `'invite result: ', ${rs1}`);
                        this.loggerService.error(`Mời KHÔNG thành công: ${i} vào nhóm ${g}`);
                        this.logContent += `Error ${new Date().toLocaleTimeString()} Mời KHÔNG thành công: ${i} vào nhóm ${g}\n`;
                        this.logContent += `Error ${new Date().toLocaleTimeString()} Mời KHÔNG thành công ở api thứ ${rs}\n`;
                        this.onStop();
                        const parseRs = JSON.parse(rs1);
                        if (parseRs && parseRs.errors) {
                            console.log('parseRs.errors ', parseRs.errors)
                        }
                    } else {
                        this.ignoreUsers.push(i);
                        console.log('invite result: ', rs1);
                        this.logContent += `${new Date().toLocaleTimeString()} Error: Can not invite ${i} vào nhóm ${g}\n`;
                    }
                    this.numberOfCalledInviteApi++;
                    if (this.numberOfCalledInviteApi >= this.maxInviteNumber * lsGroupId.length) {
                        this.loggerService.error('Vợt quá số lượng gọi api 1 ngày!');
                        this.logContent += `${new Date().toLocaleTimeString()} vượt quá giới hạn\n`;
                        this.onStop();
                        return ;
                    }
                } catch (ex) {
                    console.log(ex);
                    console.log('result:', rs);
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
            const latestFriends = R.clone(this.listIds);
            this.listIds = this.userFacebookTokenService.getNewestFriendIds(this.listIds);
            this.listIdsStr = this.listIds.join(',');
            this.logContent += `${new Date().toLocaleTimeString()} DS Bạn mới mới ${this.listIdsStr}\n`;
            this.logContent += `${new Date().toLocaleTimeString()} Có ${this.listIds.length} user mới \n`;

            if (this.ignoreFirstList && rs === 0) {
                this.loggerService.warning('Bỏ qua 8 ng đầu tiên');
                this.logContent += `${new Date().toLocaleTimeString()} Bỏ qua 8 ng đầu tiên \n`;
            } else {
                await this.callInviteApi();
            }

            if (this.listIds && this.listIds.length > 0) {
                this.userFacebookTokenService.setOldRecentlyFriend(latestFriends);
            }
        });
    }

    public onStop() {
        if (this.autoGetAndInviteFriend$) {
            this.autoGetAndInviteFriend$.unsubscribe();
            this.loggerService.success('Stopped autoGetAndInviteFriend$!');
            this.logContent += `${new Date().toLocaleTimeString()} autoGetAndInviteFriend$ Stopped!`;
        }
        this.Stop();
    }

    public getPercent() {
        return Math.round(this.numberOfSuccessInviteApi / this.numberOfCalledInviteApi * 100);
    }

    private isError(rs1: string) {
        try {
            const parseRs = JSON.parse(rs1);
            return parseRs && parseRs.errors
        } catch (e) {
            console.log('rs1:', rs1);
            return true;
        }
    }
}
