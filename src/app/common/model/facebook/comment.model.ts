import {getGroupIdFromUrl} from '../../util';
import {IBDSModel} from './IBDS.model';

export class CommentModel implements IBDSModel {
    bdsType: string;
    content: string;
    contentTypes: any[];
    costs: any;
    costsView: string;
    fbType: string;
    id: string;
    numberCosts: any[];
    postTime: any;
    postTimeView: Date;
    public url: string;
    public groupId: string;
    public commentCount: number;
    public authorId: string;
    public viewContent: string;

    constructor(feed: any) {
        this.url = feed.node.url;
        this.content = feed.node.body.text;
        this.postTime = new Date(feed.node.created_time * 1000);
        this.id = feed.node.legacy_fbid;
        this.groupId = getGroupIdFromUrl(this.url);
        this.authorId = feed.node.node.author.id;
    }


}
