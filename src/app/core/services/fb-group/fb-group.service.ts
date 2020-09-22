import {Injectable} from '@angular/core';
import {LoggerService} from '../logger/logger.service';
import {BdsTypeService} from '../bds-type/bds-type.service';
import {GroupFeedModel} from '../../../common/model/facebook/group-feed.model';
import {IBDSModel} from '../../../common/model/facebook/IBDS.model';

@Injectable({
    providedIn: 'root'
})
export class FbGroupService {

    constructor(private loggerService: LoggerService, private bdsTypeService: BdsTypeService) {
    }

    public processScanData(a: string) {
        const b = a.split('\n');
        const content = JSON.parse(b[0]);
        let feeds: Array<any> = content.data && content.data.group && content.data.group.group_feed &&
            content.data.group.group_feed.edges || [];
        if (!feeds || (feeds && feeds.length === 0)) {
            this.loggerService.error('Không có thông tin bài viết!');
        } else {
            feeds = this.bdsTypeService.removeUnusedContent(feeds);
            feeds.splice(0, 1); // delete first element unused;
            // get Post content
            let postContent: Array<IBDSModel> = feeds.map(fe => {
                return new GroupFeedModel(fe) as IBDSModel;
            });
            // get Comment content
            let commentContent: Array<IBDSModel> = [];
            commentContent = this.bdsTypeService.getCommentFromFeeds(feeds);
            postContent = postContent.concat(commentContent);
            let data = postContent.filter(c => c.url && c.content);
            data = this.bdsTypeService.classifyBDSType(data);
            data = this.bdsTypeService.convertData(data);
            return data;
        }
    }
}
