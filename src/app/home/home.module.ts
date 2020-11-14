import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {ElectronService} from "../core/services";
import {BodyDetailFormComponent} from './component/body-detail-form/body-detail-form.component';
import {ModalService} from '../core/services/modal/modal.service';
import {LoggerService} from '../core/services/logger/logger.service';
import {FbGroupService} from '../core/services/fb-group/fb-group.service';
import {BdsContentApiService} from '../core/services/bds-content-api/bds-content-api.service';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';

@NgModule({
    declarations: [HomeComponent, BodyDetailFormComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule],
    providers: [ElectronService,
        ModalService,
        LoggerService,
        FbGroupService,
        BdsContentApiService,
        UserFacebookTokenService
    ]
})
export class HomeModule {
}
