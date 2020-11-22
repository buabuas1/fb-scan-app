import {Component, OnInit} from '@angular/core';
import {InviteFriendBodyModel} from '../../common/model/invite-friend-body.model';
import {HeaderModel} from '../../common/model/header.model';
import {ElectronService} from '../../core/services';
import {LoggerService} from '../../core/services/logger/logger.service';
import {FB_COOKIE_LC_KEY, FB_GET_MEM_LC_KEY} from '../../common/constant';
import {GetMemGroupBodyModel} from '../../common/model/get-mem-group-body.model';
import {UserFacebookTokenService} from '../../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {BaseComponent} from '../../shared/components/base/base.component';

@Component({
    selector: 'app-get-group-member',
    templateUrl: './get-group-member.component.html',
    styleUrls: ['./get-group-member.component.scss']
})
export class GetGroupMemberComponent extends BaseComponent implements OnInit {

    public listIdsStr: any;
    public inviteBodyStr: any;
    public inviteBody: GetMemGroupBodyModel;
    public header: HeaderModel;
    public uids: any;
    public numberOfMem = 100;
    public userToken: UserFacebookToken;

    constructor(private electronService: ElectronService,
                private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService) {
        super();
    }

    ngOnInit(): void {
        this.userFacebookTokenService.activeToken
            .takeUntil(this.destroyed$)
            .subscribe(rs => {
                this.userToken = rs;
                this.inviteBodyStr = this.userToken.getMemberOfGroupBody;
                this.inviteBody = new GetMemGroupBodyModel(this.inviteBodyStr);
                this.header = new HeaderModel(this.userToken);
            })
    }

    public async onGetMember() {
        const listIds = this.listIdsStr.replace(/"/g, '').split(',');
        for (const i of listIds) {
            this.inviteBody.setGroupId(i);
            this.inviteBody.setNumber(this.numberOfMem);
            try {
                const rs = await this.electronService.callApi(this.inviteBody, this.header);
                if (rs && rs.indexOf(i) !== -1) {
                    this.loggerService.success(`Lấy thành công: ${i}`);
                    const ls = JSON.parse(rs).data.node.new_members.edges;
                    console.log(ls);
                    this.uids = ls.map(m => m.node.id);
                } else {
                    this.loggerService.error(`Lấy KHÔNG thành công: ${i}`);
                }
            } catch (ex) {
                console.log(ex);
                this.loggerService.error(ex);
            }
        }
        this.loggerService.warning(`Đã xong!`);
        console.log(`Đã xong!`);
    }

    public saveInviteBody() {
        this.inviteBody = new GetMemGroupBodyModel(this.inviteBodyStr);
        // localStorage.setItem(FB_GET_MEM_LC_KEY, this.inviteBodyStr);
    }

}
