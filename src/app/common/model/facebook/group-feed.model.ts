import {IBDSModel} from './IBDS.model';

export class GroupFeedModel implements IBDSModel {
    public groupId: string;
    public commentCount: number;
    public url: string;
    public content: string;
    public postTime: Date;
    public bdsType: string;
    public costs: any;
    public costsView: string;
    public postTimeView: Date;
    public contentTypes: any[];
    public numberCosts: any[];
    public numberOfRooms: number;
    public fbType: string;
    public id: string;
    public authorId: string;
    public viewContent: string;
    public isComment: boolean;
    public parentContent: string;
    constructor(feed: any) {
        try {
            this.url = getUrlFromMetaData(feed.node.comet_sections.context_layout.story.comet_sections.metadata);
            this.content = getContent(feed);
            this.postTime = getPosTime(feed);
            this.id = getId(feed);
            this.commentCount = getCommentCount(feed);
            this.authorId = getAuthorId(feed);
            this.groupId = getGroupIdFromUrl(this.url);
            this.isComment = false;
        } catch (e) {
            // console.log('Lỗi tại ', feed);
            // console.log('Lỗi tại Json: ', JSON.stringify(feed));
            console.log('POST Link ', this.url);
            console.log('POST Lỗi ', e);
        }
    }
}

function getUrlFromMetaData(metadata = []) {
    if (!(metadata[0]?.story?.url || metadata[1]?.story?.url)) {
        console.log('POST GET URL LỖI');
        return 'empty';
    }
    return metadata[0]?.story?.url || metadata[1]?.story?.url;
}

function getContent(feed: any) {
    try {
        return feed.node.comet_sections.content.story.comet_sections.message.story.message.text
    } catch (e) {
        console.log('POST GET CONTENT LỖI');
        return '';
    }
}

function getPosTime(feed: any) {
    try {
        return new Date(feed.node.comet_sections
            .context_layout.story.comet_sections.metadata[0].story.creation_time * 1000)
    } catch (e) {
        console.log('POST GET getPosTime LỖI');
        throw e;
    }
}

function getId(feed: any) {
    try {
        return feed.node.comet_sections.feedback.story.feedback_context.feedback_target_with_context
            .subscription_target_id;
    } catch (e) {
        console.log('POST GET getId LỖI');
        throw e;
    }
}

function getCommentCount(feed: any) {
    try {
        return feed.node.comet_sections.feedback.story.feedback_context.feedback_target_with_context
            .comment_count.total_count;
    } catch (e) {
        console.log('POST GET getCommentCount LỖI');
        throw e;
    }
}

function getAuthorId(feed: any) {
    try {
        return feed.node.comet_sections.context_layout.story.comet_sections.title
            .story.actors[0].id;
    } catch (e) {
        console.log('POST GET getAuthorId LỖI');
        throw e;
    }
}

function getGroupIdFromUrl(url: string) {
    try {
        return url.split('/')[4];
    } catch (e) {
        console.log('POST GET getGroupIdFromUrl LỖI');
        throw e;
    }
}
