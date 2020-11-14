import {Component, OnInit} from '@angular/core';
import {UserFacebookTokenService} from '../../core/services/user-facebook-token.service';
import {LoggerService} from '../../core/services/logger/logger.service';
import {UserFacebookToken} from '../../common/model/user-facebook-token';

@Component({
    selector: 'app-setting-token',
    templateUrl: './setting-token.component.html',
    styleUrls: ['./setting-token.component.scss']
})
export class SettingTokenComponent implements OnInit {
    public userTokens: UserFacebookToken[] = [];
    public currentToken: UserFacebookToken = {} as UserFacebookToken;
    constructor(private userFacebookTokenService: UserFacebookTokenService,
                private loggerService: LoggerService) {
    }

    ngOnInit(): void {
        this.userTokens = JSON.parse(localStorage.getItem(this.userFacebookTokenService.TOKEN_KEY)) as UserFacebookToken[];
        this.currentToken = JSON.parse(localStorage.getItem(this.userFacebookTokenService.CURRENT_TOKEN_KEY)) as UserFacebookToken;
        if (!this.currentToken && this.userTokens.length > 0) {
            this.currentToken = this.userTokens[0];
            this.onUserChange(null);
        }
    }

    public saveData() {
        this.userFacebookTokenService.saveSettingToken(this.currentToken)
            .subscribe(rs => {
                this.onUserChange(null);
                this.loggerService.success('Thành công!');
            }, error => {
                this.loggerService.error(error);
                console.log(error);
            })
    }

    public onUserChange($event: any) {
        localStorage.setItem(this.userFacebookTokenService.CURRENT_TOKEN_KEY, JSON.stringify(this.currentToken));
    }
}
