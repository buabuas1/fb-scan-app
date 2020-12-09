import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {HeaderComponent} from './shared/components/header/header.component';
import {AppComponent} from './app.component';
import {MemberRoutingModule} from './member/member-routing.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'setting',
        pathMatch: 'full'
    },
    {
        path: 'group',
        // pathMatch: 'full',
        loadChildren: 'app/group/group.module#GroupModule'
    },
    {
        path: 'member',
        // pathMatch: 'full',
        loadChildren: 'app/member/member.module#MemberModule'
    },
    {
        path: 'setting',
        // pathMatch: 'full',
        loadChildren: 'app/setting/setting.module#SettingTokenModule'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HomeRoutingModule,
        MemberRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
