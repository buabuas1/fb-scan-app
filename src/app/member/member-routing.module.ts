import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MemberComponent} from './member.component';

const routes: Routes = [
  {
    path: 'member',
    component: MemberComponent
  }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule {
}
