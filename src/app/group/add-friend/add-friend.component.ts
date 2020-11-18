import {Component, OnInit} from '@angular/core';
import {FB_FRIEND_ADD_LC_KEY} from '../../common/constant';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import * as R from 'ramda';
import {ElectronService, ModalService} from '../../core/services';
import {LoggerService} from '../../core/services/logger/logger.service';
import {HeaderModel} from '../../common/model/header.model';
import {UserFacebookTokenService} from '../../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {interval} from 'rxjs';
import {BlackListService} from '../../core/services/black-list.service';
import {IConfirmOptions} from '../../shared/modal/confirm/confirm.component';
import {BaseComponent} from '../../shared/components/base/base.component';

@Component({
    selector: 'app-add-friend',
    templateUrl: './add-friend.component.html',
    styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent extends BaseComponent implements OnInit {
    public listIdsStr: any;
    public inviteBodyStr: any;
    public inviteBody: InviteFriendBodyModel;
    public header: HeaderModel;
    public cancelToken = false;
    public userToken: UserFacebookToken;
    public spaceTime = 30;
    public logContent = '';
    public blackListUser = [];

    constructor(private electronService: ElectronService,
                private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService,
                private modalService: ModalService,
                private blackListService: BlackListService) {
        super();
    }

    ngOnInit(): void {
        this.userToken  = this.userFacebookTokenService.getCurrentUserToken();
        this.inviteBodyStr = this.userToken.addFriendBody;
        this.inviteBody = new InviteFriendBodyModel(this.inviteBodyStr);
        this.header = new HeaderModel(this.userToken);
        this.blackListService.getBlackList(this.userToken.facebookUuid)
            .subscribe(rs => {
                this.blackListUser = rs as any[];
                this.loggerService.success('Lấy thành công danh sách black list');
            })
    }

    public async onAddFriend() {
        this.cancelToken = false;
        if (this.blackListUser && this.blackListUser.length === 0) {
            this.loggerService.warning('Danh sách blacklist đang trống!');
        }
        let listIds = this.listIdsStr.replace(/"/g, '').split(',');
        listIds = R.uniq(listIds).filter(r => r && !R.any(u => u.userId === r, this.blackListUser));
        const a = interval(1000 * this.spaceTime).take(listIds.length)
            .takeUntil(this.destroyed$)
            .subscribe(async rs => {
                const i = listIds[rs];
                if (this.cancelToken) {
                    a.unsubscribe();
                }
                this.inviteBody.setUserId(i);
                try {
                    const rs = await this.electronService.callApi(this.inviteBody, this.header);
                    if (rs && rs.indexOf('OUTGOING_REQUEST') !== -1) {
                        this.loggerService.success(`Thêm bạn thành công: ${i}`);
                    } else {
                        this.loggerService.error(`Thêm bạn KHÔNG thành công: ${i}`);
                        this.logContent += `Error ${new Date().toLocaleTimeString()} Thêm bạn KHÔNG thành công: ${i}\n`;
                    }
                } catch (ex) {
                    console.log(ex);
                    this.loggerService.error(ex);
                }
                if (rs === listIds.length - 1) {
                    this.loggerService.warning(`Đã xong ${listIds.length}!`);
                    console.log(`Đã xong! ${listIds.length}`);
                    this.logContent += `${new Date().toLocaleTimeString()} Đã xong! ${listIds.length}\n`;

                    this.modalService.confirm(<IConfirmOptions>{
                        title: `Thông báo`,
                        message: `Bạn đã adđ ${listIds.length} user bạn có muốn lưu k?`,
                    }).subscribe(async confirmed => {
                        if (confirmed) {
                            this.blackListService.saveBulkBlackList(listIds, this.userToken.facebookUuid)
                                .subscribe(rs => {
                                    this.loggerService.success('Update danh sách BL thành công!');
                                    this.logContent += `${new Date().toLocaleTimeString()} Update danh sách BL thành công! ${listIds.length}\n`;
                                }, error => {
                                    console.log(error);
                                    this.loggerService.error(error);
                                });
                        }
                    });
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
