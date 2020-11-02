const body = {
    'av': '100046024845887',
    '__user': '100046024845887',
    '__a': '1',
    '__dyn': '7AzHK4HwBgC265Q2m3mbG2KnFw9uu2i5U4e2O1szEdEc88EW3K1uwJxS1Az8bo6u3y4o27w7nCxS320om78-0BE88hwjEy11xmfz83WwgEcHzoaEaoG0Boy1txm2l2UtG7o4y0Mo5W3e9xy48aU8od8-UqwsUkxe2GewGwsoqBwJK2W5olwUwHwF-4VUfE9824zqxq2K',
    '__csr': 'iq8XGy8zl4rl4AheeApiVHhGiHVejgAyQh2V8yiiaVkp4V3e_R9lyUC44A9WD89zp4lLaJB9GbZRtZDyBKu4LvamIyOybBOyCJa85Ux2oSoEJal8GyveAm8WF1oGKpxoxKdQA9AnDAznG4oO_iJ6FUFecxwOmhsKqdIVpF4h3qO29S2gCALRDhp2K4eRKfKquqEqwOQu2a8qGXJQCnF6yq_QK5iaqFUVHXxbcCl6Ah2G8ykh5ACgTykaiB8S7piqzdCx22h0m8f8LoswAQx1EtpkbLt8V6honRBADoW3Cwn4hJ4CUG22fBwZgiwyxa8xSA6UqzayHKVo-F8bUa_OAlBgojz9Egqx8gh0XzVQejUB38Ne9GbokoGmcz9EuDK392fByk9hEogSmu5oqoBbgBBwYyVk9x2m3mmbyA9-pxqiEC5poogydbGejBwOBgtGE7e1LyQdwQwDwqoowb6bw8G-4u5oig8emqgi5ma5edx25omc8yXDyrJ0nU8K1qDCxV0xxm1Fy100g-wq86yaAxa0CoyEkxam9GGw8m1pw7Uym5o7-E5e1vxnhpJam0xE1iqg6Wawh8lBy2480eAw2Lo5-q0N448Byp62-0TE0U20GUqw152qK02alNAb0',
    '__req': '1b',
    '__beoa': '0',
    '__pc': 'EXP3:comet_pkg',
    'dpr': '1',
    '__ccg': 'GOOD',
    '__rev': '1002917466',
    '__s': '75szte:2d01rx:oysxte',
    '__hsi': '6890331736809186944-0',
    '__comet_req': '1',
    'fb_dtsg': 'AQF5HbN0-aBd:AQHGIiNGK84k',
    'jazoest': '21837',
    '__spin_r': '1002917466',
    '__spin_b': 'trunk',
    '__spin_t': '1604280373',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'CometGroupDiscussionRootSuccessQuery',
    'variables': '{"UFI2CommentsProvider_commentsKey":"CometGroupDiscussionRootSuccessQuery","creative_provider_id":null,"feedLocation":"GROUP","feedType":"DISCUSSION","feedbackSource":0,"focusCommentID":null,"groupID":"346009719391262","hasHoistStories":false,"hoistStories":[],"hoistStoriesCount":0,"privacySelectorRenderLocation":"COMET_STREAM","regular_stories_count":30,"regular_stories_stream_initial_count":29,"renderLocation":"group","scale":1,"shouldDeferMainFeed":false,"sortingSetting":null,"useDefaultActor":false}',
    'server_timestamps': 'true',
    'doc_id': '3622200737838918',
};

export class GetGroupBodyModel {
    av: string;
    __user: string;
    __a: string;
    __dyn: string;
    __csr: string;
    __req: string;
    __beoa: string;
    __pc: string;
    dpr: string;
    __ccg: string;
    __rev: string;
    __s: string;
    __hsi: string;
    __comet_req: string;
    fb_dtsg: string;
    jazoest: string;
    __spin_r: string;
    __spin_b: string;
    __spin_t: string;
    fb_api_caller_class: string;
    fb_api_req_friendly_name: string;
    variables: string;
    server_timestamps: string;
    doc_id: string;

    constructor(src?: any) {
        if (!src) {
            src = body;
        }
        this.av = src.av
        this.__user = src.__user
        this.__a = src.__a
        this.__dyn = src.__dyn
        this.__csr = src.__csr
        this.__req = src.__req
        this.__beoa = src.__beoa
        this.__pc = src.__pc
        this.dpr = src.dpr
        this.__ccg = src.__ccg
        this.__rev = src.__rev
        this.__s = src.__s
        this.__hsi = src.__hsi
        this.__comet_req = src.__comet_req
        this.fb_dtsg = src.fb_dtsg
        this.jazoest = src.jazoest
        this.__spin_r = src.__spin_r
        this.__spin_b = src.__spin_b
        this.__spin_t = src.__spin_t
        this.fb_api_caller_class = src.fb_api_caller_class
        this.fb_api_req_friendly_name = src.fb_api_req_friendly_name
        this.variables = src.variables
        this.server_timestamps = src.server_timestamps
        this.doc_id = src.doc_id
    }
    public setBody(field: string, value: string) {
        this[field] = value;
    }
    public setGroupId(groupId: string) {
        const body = JSON.parse(this.variables);
        body.groupID = groupId;
        this.variables = JSON.stringify(body);
    }
    public numberOfPost(number: number) {
        const body = JSON.parse(this.variables);
        body.regular_stories_count = number;
        body.regular_stories_stream_initial_count = number - 1;
        this.variables = JSON.stringify(body);
    }
}
