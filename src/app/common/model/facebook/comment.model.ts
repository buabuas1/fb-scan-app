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
    public isComment: boolean;
    public parentContent: string;

    constructor(feed: any, parentContent?: string) {
        try {
            this.url = getUrl(feed);
            this.content = getContent(feed);
            this.postTime = getPostTime(feed);
            this.id = getId(feed);
            this.groupId = getGroupIdFromUrl(this.url);
            this.authorId = getAuthor(feed);
            this.isComment = true;
            this.parentContent = parentContent || '';
        } catch (e) {
            console.log('COMMENT KHỞI TẠO Link', this.url);
            throw e;
        }

    }
}

function getUrl(feed) {
    try {
        return feed.node.url;
    } catch (e) {
        console.log('COMMENT getUrl lỗi', e);
        throw e;
    }
}

function getContent(feed) {
    try {
        return feed.node.body.text;
    } catch (e) {
        console.log('COMMENT getContent lỗi');
        return '';
    }
}

function getPostTime(feed) {
    try {
        return new Date(feed.node.created_time * 1000);
    } catch (e) {
        console.log('COMMENT getPostTime lỗi', e);
        throw e;
    }
}

function getId(feed: any) {
    try {
        return feed.node.legacy_fbid;
    } catch (e) {
        console.log('COMMENT getId lỗi', e);
        throw e;
    }
}

function getGroupIdFromUrl(url: string) {
    try {
        return url.split('/')[4];
    } catch (e) {
        console.log('COMMENT getGroupIdFromUrl lỗi', e);
        throw e;
    }
}


function getAuthor(feed: any) {
    try {
        return feed.node.author.id;
    } catch (e) {
        console.log('COMMENT getAuthor lỗi', e);
        throw e;
    }
}
