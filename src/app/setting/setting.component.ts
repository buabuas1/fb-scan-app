import {Component, OnInit} from '@angular/core';
import {API_TOKEN_LC_K} from '../common/constant';
import {getMessageFromError} from '../common/util';
import {BdsContentApiService} from '../core/services/bds-content-api/bds-content-api.service';
import {LoggerService} from '../core/services/logger/logger.service';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    public user = 'sonnvptit2402@gmail.com';
    public password = '123';

    constructor(private bdsContentApiService: BdsContentApiService, private loggerService: LoggerService,
                private userFacebookTokenService: UserFacebookTokenService) {
    }

    ngOnInit(): void {
    }

    public saveApiToken() {
        this.bdsContentApiService.login(this.user, this.password).subscribe(u => {
            localStorage.setItem(API_TOKEN_LC_K, u.token);
            this.loggerService.success('Thành công!');
            this.userFacebookTokenService.resetTokenList();
        }, error => {
            this.loggerService.error(getMessageFromError(error));
        })

    }

}
