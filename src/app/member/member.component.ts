import {Component, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {BaseComponent} from '../shared/components/base/base.component';
import {ElectronService} from '../core/services';
import {HeaderModel} from '../common/model/header.model';
import {UserFacebookTokenService} from '../core/services/user-facebook-token.service';
import {UserFacebookToken} from '../common/model/user-facebook-token';
import {GetMemGroupBodyModel} from '../common/model/get-mem-group-body.model';
import {GetMemGroupSecondBodyModel} from '../common/model/get-mem-group-second-body.model';
import {LoggerService} from '../core/services/logger/logger.service';
import * as R from 'ramda';
import {MemberApiService} from '../core/services/member-api.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent extends BaseComponent implements OnInit {
    public groupId = '111';
    public logContent = '111';
    public callApi$: Subject<number> = new Subject<number>();
    public saveUser$: Subject<any[]> = new Subject<any[]>();

    public spaceTime = 1;
    public getMemBody: GetMemGroupBodyModel;
    public getMemSecondBody: GetMemGroupSecondBodyModel;
    public header: HeaderModel;
    public userToken: UserFacebookToken;
    public pageSize: number = 10;
    public hasNext = false;
    public latestCursor: string;
    public numberOfMem = 0;
    public isRunning = false;
    private sub: Subscription;

    constructor(private electronService: ElectronService,
                private userFacebookTokenService: UserFacebookTokenService,
                private memberApiService: MemberApiService,
                private loggerService: LoggerService) {
        super();
    }

    ngOnInit(): void {
        this.userFacebookTokenService.activeToken
            .takeUntil(this.destroyed$)
            .subscribe(rs => {
                this.userToken = rs;
                if (this.userToken) {
                    this.header = new HeaderModel(this.userToken);
                    this.getMemBody = new GetMemGroupBodyModel(this.userToken.getMemberOfGroupBody)
                    this.getMemSecondBody = new GetMemGroupSecondBodyModel(this.userToken.getMemberOfGroupSecondBody)
                }
            })

        this.saveUser$
            .takeUntil(this.destroyed$)
            .subscribe(us => {
                this.memberApiService.saveMember(us)
                    .subscribe(rs => {
                        this.loggerService.success(`Lưu thành công ${rs}`);
                        this.loggerService.addLog(this.logContent, `Lưu thành công ${rs}`);
                    }, error => {
                        this.loggerService.error('Lưu user không thành công!');
                        console.log('lưu Không thành công', error);
                        this.loggerService.addLog(this.logContent, `Lưu Không thành công`);
                    })
            })
    }

    public onGet() {
        if (!this.groupId) {
            this.loggerService.error('Group Id đang trống');
            return;
        }
        if (this.isRunning) {
            this.loggerService.error('Quá trình đang chạy hãy dừng nó trc khi bắt đầu cái mới');
            return;
        }
        this.sub = this.callApi$
            .debounceTime(this.spaceTime * 1000)
            .takeUntil(this.destroyed$)
            .subscribe(async rs => {
                try {
                    if (this.hasNext) {
                        await this.getMember(rs);
                        this.callApi$.next(rs + 1);
                    } else {
                        this.loggerService.success('Đã tạm dừng');
                        this.logContent = this.loggerService.addLog(this.logContent, 'Đã tạm dừng');
                    }
                } catch (e) {
                    console.log(e);
                    this.loggerService.error('Lỗi khi get thành viên: ' + JSON.stringify(e))
                    this.logContent += this.loggerService.addLog(this.logContent, 'Lỗi khi get thành viên: ' + JSON.stringify(e));
                    this.onStop();
                }
            });
        this.hasNext = true;
        if (this.latestCursor) {
            this.callApi$.next(1);
        } else {
            this.callApi$.next(0);
        }
        this.isRunning = true;
    }

    public onStop() {
        this.isRunning = false;
        if (this.callApi$) {
            this.callApi$.next(-1);
            this.logContent += this.loggerService.addLog(this.logContent, 'Đã dừng');
        }
        this.hasNext = false;
        this.loggerService.success('Đã tạm dừng!');
        this.sub.unsubscribe();
    }

    public async getMember(pageNum: number) {
        if (pageNum === -1) {
            this.hasNext = false;
            return ;
        }
        if (pageNum === 0) {
            this.getMemBody.setGroupId(this.groupId);
            this.getMemBody.setNumber(this.pageSize);
            const rs = await this.electronService.callApi(this.getMemBody, this.header);
            if (rs && rs.indexOf(this.groupId) !== -1) {
                this.loggerService.success(`Lấy thành công: ${this.groupId}`);
                const data = JSON.parse(rs).data.group.new_members;
                const ls = data.edges;
                const name = ls.map(m => m.node.name).join(',');
                this.logContent = this.loggerService.addLog(this.logContent, name);
                const users = ls.map(m => {
                    return {
                        userId: m.node.id,
                        groupId: this.groupId
                    }
                });
                console.log(users);
                this.saveUser$.next(users);
                this.numberOfMem += users.length;
                this.hasNext = data.page_info.has_next_page;
                this.latestCursor = data.page_info.end_cursor
            } else {
                this.loggerService.error(`Lấy KHÔNG thành công: ${this.groupId}`);
            }
        } else {
            if (this.hasNext) {
                this.getMemSecondBody.setGroupId(this.groupId);
                this.getMemSecondBody.setNumber(this.pageSize);
                this.getMemSecondBody.setCursor(this.latestCursor);
                const rs = await this.electronService.callApi(this.getMemSecondBody, this.header);
                if (rs && rs.indexOf(this.groupId) !== -1) {
                    this.loggerService.success(`Lấy thành công: ${this.groupId}`);
                    const data = JSON.parse(rs).data.node.new_members;
                    const ls = data.edges;
                    const name = ls.map(m => m.node.name).join(',');
                    console.log(name);
                    this.logContent = this.loggerService.addLog(this.logContent, name);
                    const users = ls.map(m => {
                        return {
                            userId: m.node.id,
                            groupId: this.groupId,
                        }
                    });
                    this.numberOfMem += users.length;
                    console.log(users);
                    this.saveUser$.next(users);
                    this.hasNext = data.page_info.has_next_page;
                    this.latestCursor = data.page_info.end_cursor;
                } else {
                    this.loggerService.error(`Lấy KHÔNG thành công: ${this.groupId}`);
                }
            } else {
                this.loggerService.success('Hết!');
                this.logContent = this.loggerService.addLog(this.logContent, 'Hết!!!')
            }

        }
    }
}
