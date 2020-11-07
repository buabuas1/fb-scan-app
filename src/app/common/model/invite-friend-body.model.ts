
export class InviteFriendBodyModel {
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

    constructor(body: string = '') {
        const fields = body.split('\n');
        fields.forEach(r => {
            const f = r.substr(0, r.indexOf(':'));
            const v = r.substr(r.indexOf(':') + 2);
            this[f] = v;
        })
    }
    public setBody(field: string, value: string) {
        this[field] = value;
    }
    // public setGroupId(groupId: string) {
    //     const body = JSON.parse(this.variables);
    //     body.input.group_id = groupId;
    //     this.variables = JSON.stringify(body);
    // }

    public setUserId(userId: string) {
        const body = JSON.parse(this.variables);
        body.input.friend_requestee_ids = [userId];
        this.variables = JSON.stringify(body);
    }

    // public getGroupId() {
    //     const body = JSON.parse(this.variables);
    //     return body && body.input && body.input.group_id || '';
    // }
}
