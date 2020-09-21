const body = {
    'av': '100046024845887',
    '__user': '100046024845887',
    '__a': '1',
    '__dyn': '7AzHJ16U9k9wxxt0BwRyaG5UjBWo2nDwAxu13wIwk8KEK3q2ibwyzEeU5W2Saxa1Az8bo6u3y4o27wyw6QCxS320LE36xOfwwwto88hwKx-8wgolzUOm0Z84a3aUS2G2CaCzU7W8wnolwBgK7qxS18wc61axe2C9yoox22K263ifK6E7e58jwGzEaEfUjxS6FocobElxm3y2K2DUrw-wAw',
    '__csr': 'jAJ94jWqmZeFlV4ZBG4WZ9fV6UCiquVkju8miQnEFu_aCzRXz9AahFAoBrgCXRhV3dbEizLruHxF8uFNjoiCAGnn-iqB8vB8m4e-t7F6y49ghp9AbyRqKa-64apiyERGyupeGSFF8PUpjZk8yGUboOF6dAFpohiabogiBCCmQih5iFd26EByWBAy4pyAaDix29DCiDK9Ajgkg9uKiAmeuUKuXUtw-gUgkNUKbl5yPy8CikzXghuQEOd43p43i17VK6FoJ6pUOm-dApV8E40Cv6cCUR3AHpP1-8ai9yKNz4zVpd6CCm99SbKvVp66v5oFamqWAxy8GGy8G8jg9HqglAho8ax6dzaAmAdjg89Ehz0zGywCAzAl4olDmdAKUoU5ydocaAgQgbiaJ1bxebyE9h8R-uu8BonAzZ1V0gGwkopzU9EWlxm6ohwAUtwjA5E4esUgwMUO4E2lxFxK0AE560axwJwilG5o9oiG2KDKE2AxN1W7871pJ0Nz2AgfokGEAwzwQauUnz8422WEChw16i0yEqU3zw70wlhqa2KaohorGZ2K14w0OIyEjoc80qcw',
    '__req': 'bg',
    '__beoa': '1',
    '__pc': 'EXP2:comet_pkg',
    'dpr': '1',
    '__ccg': 'GOOD',
    '__rev': '1002603640',
    '__s': 'iolkzp:oduo69:7pnhr9',
    '__hsi': '6867672025084082239-0',
    '__comet_req': '1',
    'fb_dtsg': 'AQGKoxdL9Fax:AQGUyPzwmkZB',
    'jazoest': '22101',
    '__spin_r': '1002603640',
    '__spin_b': 'trunk',
    '__spin_t': '1599004498',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'CometGroupDiscussionRootSuccessQuery',
    'variables': '{"UFI2CommentsProvider_commentsKey":"CometGroupDiscussionRootSuccessQuery","creative_provider_id":null,"feedLocation":"GROUP","feedType":"BUY_AND_SELL","feedbackSource":0,"focusCommentID":null,"groupID":"126771741342941","hasHoistStories":false,"hoistStories":[],"hoistStoriesCount":0,"isComet":true,"privacySelectorRenderLocation":"COMET_STREAM","regular_stories_count":3,"regular_stories_stream_initial_count":2,"renderLocation":"group","scale":1,"shouldDeferMainFeed":false,"sortingSetting":null,"useDefaultActor":false}',
    'server_timestamps': 'true',
    'doc_id': '3234595526626493',
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
}
