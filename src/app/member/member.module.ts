import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import {ElectronService} from '../core/services';
import {MemberRoutingModule} from './member-routing.module';
import {FormsModule} from '@angular/forms';
import {LoggerService} from '../core/services/logger/logger.service';
import {MemberApiService} from '../core/services/member-api.service';



@NgModule({
  declarations: [MemberComponent],
    imports: [
        CommonModule, FormsModule,
        MemberRoutingModule
    ],
    providers: [
        ElectronService,
        LoggerService,
        MemberApiService
    ]
})
export class MemberModule { }
