import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingComponent} from './setting.component';
import {SettingRoutingModule} from './setting-routing.module';
import {LoggerService} from '../core/services/logger/logger.service';
import {BdsContentApiService} from '../core/services/bds-content-api/bds-content-api.service';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {SettingTokenComponent} from './setting-token/setting-token.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [SettingComponent, SettingTokenComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        SharedModule
    ],
    providers: [
        LoggerService,
        BdsContentApiService,
        UserFacebookTokenService,
    ]
})
export class SettingTokenModule {
}
