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

@NgModule({
    declarations: [GroupComponent, AddFriendComponent],
    imports: [CommonModule, SharedModule, GroupRoutingModule],
    providers: [
        ElectronService,
        ModalService,
        LoggerService,
        FbGroupService,
        BdsContentApiService
    ]
})
export class GroupModule {
}
