export class BdsMongoModel {
    public content: string;
    public contentTypes: any[];
    public costs: any[];
    public id: string;
    public numberCosts: any[];
    public postTime: Date;
    public url: string;
    public groupId: string;
    public commentCount: number;
    public authorId: string;

    constructor(source: any) {
        this.content = source.content;
        this.contentTypes = source.contentTypes;
        this.costs = source.costs;
        this.id = source.id;
        this.numberCosts = source.numberCosts;
        this.postTime = source.postTime;
        this.url = source.url;
        this.groupId = source.groupId;
        this.commentCount = source.commentCount;
        this.authorId = source.authorId;
    }
}
