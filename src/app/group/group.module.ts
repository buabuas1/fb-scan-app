import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRoutingModule} from './group-routing.module';

import {GroupComponent} from './group.component';
import {SharedModule} from '../shared/shared.module';
import {ElectronService, ModalService} from '../core/services';
import {LoggerService} from '../core/services/logger/logger.service';
import {BdsContentApiService} from '../core/services/bds-content-api/bds-content-api.service';
import {FbGroupService} from '../core/services/fb-group/fb-group.service';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { GetGroupMemberComponent } from './get-group-member/get-group-member.component';
import { SettingTokenComponent } from './setting-token/setting-token.component';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {BlackListService} from '../core/services/black-list.service';
import {MemberApiService} from '../core/services/member-api.service';

@NgModule({
    declarations: [GroupComponent, AddFriendComponent, GetGroupMemberComponent, SettingTokenComponent],
    imports: [CommonModule, SharedModule, GroupRoutingModule],
    providers: [
        ElectronService,
        ModalService,
        LoggerService,
        FbGroupService,
        BdsContentApiService,
        UserFacebookTokenService,
        BlackListService,
        MemberApiService
    ]
})
export class GroupModule {
}
