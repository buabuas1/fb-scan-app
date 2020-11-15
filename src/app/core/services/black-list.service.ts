import {Injectable} from '@angular/core';
import {AppConfig} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BlackListService {
    private host = AppConfig.beHost;

    constructor(public httpClient: HttpClient) {
    }

    getBlackList(facebookUuid: string) {
        return this.httpClient.get(`${this.host}api/blacklist?facebookUuid=${facebookUuid}`);
    }

    saveBulkBlackList(blackList: any[], facebookUuid: string) {
        let unlessUser = blackList.map(b => {
            return {
                facebookUuid: facebookUuid,
                userId: b
            };
        })
        return this.httpClient.post(`${this.host}api/blacklist/bulk`, unlessUser);
    }
}
