import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';

import { GroupComponent } from './group.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GroupComponent],
  imports: [CommonModule, SharedModule, GroupRoutingModule]
})
export class GroupModule {}
