import {Component, OnInit} from '@angular/core';
import {UserFacebookTokenService} from '../../core/services/user-facebook-token.service';
import {LoggerService} from '../../core/services/logger/logger.service';
import {UserFacebookToken} from '../../common/model/user-facebook-token';
import {BaseComponent} from '../../shared/components/base/base.component';

@Component({
    selector: 'app-setting-token',
    templateUrl: './setting-token.component.html',
    styleUrls: ['./setting-token.component.scss']
})
export class SettingTokenComponent extends BaseComponent implements OnInit {
    public userTokens: UserFacebookToken[] = [];
    public currentToken: UserFacebookToken = {} as UserFacebookToken;
    constructor(private userFacebookTokenService: UserFacebookTokenService,
                private loggerService: LoggerService) {
        super();
    }

    ngOnInit(): void {
        this.userFacebookTokenService.tokenList
            .takeUntil(this.destroyed$)
            .subscribe(rs => {
                this.userTokens = rs;
                this.userTokens = this.userTokens.sort((r1, r2) => {
                    if (r1.position > r2.position) {
                        return 1;
                    }
                    if (r1.position  < r2.position) {
                        return -1;
                    }
                    return 0;
                });
            })
        this.userFacebookTokenService.activeToken
            .takeUntil(this.destroyed$)
            .subscribe(rs => {
                this.currentToken = rs;
            })
    }

    public saveData() {
        this.userFacebookTokenService.saveSettingToken(this.currentToken)
            .subscribe(rs => {
                this.userFacebookTokenService.activeToken.next(rs as UserFacebookToken);
                this.userFacebookTokenService.resetTokenList()
                this.loggerService.success('Thành công!');
            }, error => {
                this.loggerService.error(error);
                console.log(error);
            })
    }

    public onUserChange($event: any) {
        this.userFacebookTokenService.activeToken.next(this.currentToken);
    }
}
