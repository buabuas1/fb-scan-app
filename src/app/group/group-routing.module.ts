import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {GroupComponent} from './group.component';
import {HeaderComponent} from '../shared/components/header/header.component';

const routes: Routes = [
  {
    path: 'group',
    component: GroupComponent
  }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule {
}
