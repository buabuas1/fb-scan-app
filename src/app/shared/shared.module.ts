import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import {ModalComponent} from './modal/modal.component';
import { ModalModule, PopoverModule, CollapseModule } from 'ngx-bootstrap';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {ConfirmComponent} from './modal/confirm/confirm.component';
@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective,
      ModalComponent,
      ConfirmComponent,
      HeaderComponent],
  imports: [CommonModule, TranslateModule, FormsModule,
      ModalModule.forRoot(),
      PopoverModule.forRoot(),
      CollapseModule.forRoot(),
      DropDownsModule,
      RouterModule
  ],
  exports: [TranslateModule, WebviewDirective, FormsModule, DropDownsModule,
      ModalComponent, HeaderComponent]
})
export class SharedModule {}
