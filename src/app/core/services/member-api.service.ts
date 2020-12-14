import {Injectable} from '@angular/core';
import {AppConfig} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MemberApiService {
    private host = AppConfig.beHost;

    constructor(public httpClient: HttpClient) {
    }

    public saveMember(users: any[]) {
        return this.httpClient.post(`${this.host}api/member/bulk`, users);
    }

    public getConsumeMember(pageSize: number) {
        return this.httpClient.get(`${this.host}api/member?pageSize=${pageSize}`);
    }

    public markMemberIsConsumed(userIds: string[], userUuid: string, usedByName: string) {
        const body = {
            ids: userIds,
            usedByUuid: userUuid,
            usedByName: usedByName
        }
        return this.httpClient.post(`${this.host}api/member/mark`, body);
    }

    public unmarkMemberIsConsumed(userIds: string[], userUuid: string, usedByName: string) {
        const body = {
            ids: userIds,
            usedByUuid: userUuid,
            usedByName: usedByName
        }
        return this.httpClient.post(`${this.host}api/member/unmark`, body);
    }
}
