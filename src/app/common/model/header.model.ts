const agentDefault = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/85.0.134 Chrome/79.0.3945.134 Safari/537.36';
const cookieDefault = 'sb=RsRlX4sxhNDUvcOJbvRnFDpn; datr=RsRlX10lUKKPZ-c9gZ2tsFHW; c_user=100046024845887; spin=r.1002917466_b.trunk_t.1604280210_s.1_v.2_; xs=31%3AXow7MSQ3zn8bMQ%3A2%3A1602512659%3A1776%3A6319%3A%3AAcWqMPF4dQBxLEGpP57XhsSO7-XibbmY_oagVBvIYXw; fr=0hHmzsv2prtkUl9r5.AWWVEs0g9f4wJ2xkrO8Ih-N5WY8.BffzPg.w-.AAA.0.0.Bfn1-S.AWUvD3jQMQM';
export class HeaderModel {
    cookie: string;
    userAgent: string;
    constructor(src?: any) {
        this.cookie = src && src.cookie ? src.cookie : cookieDefault
        this.userAgent = src && src.agent ? src.agent : agentDefault
    }
}
