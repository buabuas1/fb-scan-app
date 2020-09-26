import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import {ModalComponent} from './modal/modal.component';
import { ModalModule, PopoverModule, CollapseModule } from 'ngx-bootstrap';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective,
      ModalComponent],
  imports: [CommonModule, TranslateModule, FormsModule,
      ModalModule.forRoot(),
      PopoverModule.forRoot(),
      CollapseModule.forRoot(),
      DropDownsModule
  ],
  exports: [TranslateModule, WebviewDirective, FormsModule, DropDownsModule,
      ModalComponent]
})
export class SharedModule {}
