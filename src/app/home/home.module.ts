import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {ElectronService} from "../core/services";
import {BodyDetailFormComponent} from './component/body-detail-form/body-detail-form.component';
import {ModalService} from '../core/services/modal/modal.service';

@NgModule({
    declarations: [HomeComponent, BodyDetailFormComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule],
    providers: [ElectronService,
        ModalService
    ]
})
export class HomeModule {
}
