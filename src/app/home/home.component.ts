import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivationStart, Router, RouterOutlet} from '@angular/router';
import {ElectronService} from "../core/services";
import * as queryString from 'query-string';
import {GetGroupBodyModel} from '../common/model/get-group-body.model';
import {ModalService} from '../core/services/modal/modal.service';
import {BodyDetailFormComponent} from './component/body-detail-form/body-detail-form.component';
import {LoggerService} from '../core/services/logger/logger.service';
import {FbGroupService} from '../core/services/fb-group/fb-group.service';
import {API_TOKEN_LC_K, BdsTypeArray, FB_COOKIE_LC_KEY, FB_TOKEN_LC_KEY} from '../common/constant';
import {IBDSModel} from '../common/model/facebook/IBDS.model';
import * as R from 'ramda';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {getMessageFromError, removeSpace} from '../common/util';
import {BdsContentApiService} from '../core/services/bds-content-api/bds-content-api.service';
import {BdsMongoModel} from '../common/model/facebook/bds-mongo.model';
import {HeaderModel} from '../common/model/header.model';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../common/model/user-facebook-token';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public body = new GetGroupBodyModel();
    public groups = '';
    public defaultSaveType = [BdsTypeArray[0],BdsTypeArray[1],BdsTypeArray[5]]
    public FB_TOKEN_LC_KEY = FB_TOKEN_LC_KEY;
    public FB_COOKIE_LC_KEY = FB_COOKIE_LC_KEY;
    // public API_TOKEN_LC_KEY = 'API_TOKEN_LC_KEY';
    public user = 'sonnvptit2402@gmail.com';
    public password = '123';
    public log = '';
    public numberOfPost = 30;
    public listItems = BdsTypeArray;
    public model: any = {
        typeDate: 'all',
        from: moment(new Date().setHours(0, 0, 0, 0)).add(-1, 'day').toDate(),
        to: new Date(),
        bdsType: [BdsTypeArray[0],BdsTypeArray[1],BdsTypeArray[5]], // TIM_PHONG
        typePrice: 'all',
        priceFrom: 0,
        priceTo: 100000000,
        searchText: '',
        groupIds: ''
    };
    public header = new HeaderModel();
    public fbBody: string;
    public userToken: UserFacebookToken;
    constructor(private router: Router,
                private electronService: ElectronService,
                private modalService: ModalService,
                private loggerService: LoggerService,
                private fbGroupService: FbGroupService,
                private bdsContentApiService: BdsContentApiService,
                private userFacebookTokenService: UserFacebookTokenService
    ) {
    }

    ngOnInit(): void {
        this.userToken  = this.userFacebookTokenService.getCurrentUserToken();
        this.fbBody = this.userToken.getGroupFeedBody;
        this.body = new GetGroupBodyModel(this.fbBody);
        this.header = new HeaderModel(this.userToken);
        this.userFacebookTokenService.getSettingToken()
            .subscribe(rs => {
                localStorage.setItem(this.userFacebookTokenService.TOKEN_KEY, JSON.stringify(rs));
                this.loggerService.success('Tải về Token thành công!');
            })
    }

    onOpenSetting() {
        console.log(this.groups.split(','));
        this.modalService.openModal({
            title: 'Ghi chú / Món thêm',
            inputs: [
            ],
            onSubmit: async () => {
            },
            component: BodyDetailFormComponent
        }, {
            class: 'modal-note'
        })
    }

    public async callApi() {
        const g = this.groups.split(',');
        const length = g.length;
        for (let i = 0; i < length; i++) {
            if (!g[i]) {
                continue;
            }
            await this.getGroupData(removeSpace(g[i]));
            this.loggerService.success(`${Math.round((i+1)*100/length)}%`);
        }
        this.loggerService.warning('Đã quét xong! Bạn có thể tiếp tục');
        console.log('GroupId: Done!');
        this.addLog('GroupId: Done!');
    };
    public async getGroupData(groupId: string) {
        // this.body.setBody('fb_dtsg', 'AQE-2qJ4zS4F:AQHRSF1ouoP5');
        this.body.setGroupId(groupId);
        this.body.numberOfPost(this.numberOfPost);
        let rs = ''
        try {
            rs = await this.electronService.callApi(this.body, this.header);
            this.loggerService.success(`get success: ${groupId}`);
            let data = this.fbGroupService.processScanData(rs.toString()) as IBDSModel[];
            data = data.filter(r =>
                R.any(i => this.model.bdsType.findIndex(h => h.key === i) !== -1,
                    r.contentTypes) && r.postTime.getTime() > moment(new Date()).add(-2, 'day'));
            console.log('rs', data);
            const save = data.map(v => {
                return new BdsMongoModel(v);
            });
            this.bdsContentApiService.saveFbContent(save)
                .subscribe(rs => {
                    this.loggerService.success(`${rs.toString()} ${save.length}`);
                }, error => {
                    this.loggerService.error(`${rs.toString()} ${save.length}`);
                })
        } catch (e) {
            console.log('Lỗi GroupId', e);
            console.log('GroupId: ', groupId);
            this.addLog('GroupId: ' + groupId);
            this.loggerService.error(`Có lỗi tại groupdID: ${groupId}`);
        }
    }

    public saveFbToken() {
        localStorage.setItem(this.FB_TOKEN_LC_KEY, this.fbBody);
        this.body = new GetGroupBodyModel(this.fbBody);
    }

    public saveApiToken() {
        this.bdsContentApiService.login(this.user, this.password).subscribe(u => {
            localStorage.setItem(API_TOKEN_LC_K, u.token);
            this.loggerService.success('Thành công!');
        }, error => {
            this.loggerService.error(getMessageFromError(error));
        })

    }

    private addLog(t: string) {
        this.log+= `\n ${new Date().toLocaleTimeString()} ${t}`;
    }

    public onBdsTypeChange($event: any[]) {

    }

    public saveFbCookie() {
        localStorage.setItem(this.FB_COOKIE_LC_KEY, JSON.stringify(this.header));
    }
}
