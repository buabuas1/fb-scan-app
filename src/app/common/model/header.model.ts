export class HeaderModel {
    cookie: string;
    constructor(src?: any) {
        if (!!src) {
            this.cookie = src.cookie
        } else {
            this.cookie = 'sb=RsRlX4sxhNDUvcOJbvRnFDpn; datr=RsRlX10lUKKPZ-c9gZ2tsFHW; c_user=100046024845887; spin=r.1002917466_b.trunk_t.1604280210_s.1_v.2_; xs=31%3AXow7MSQ3zn8bMQ%3A2%3A1602512659%3A1776%3A6319%3A%3AAcWqMPF4dQBxLEGpP57XhsSO7-XibbmY_oagVBvIYXw; fr=0hHmzsv2prtkUl9r5.AWWVEs0g9f4wJ2xkrO8Ih-N5WY8.BffzPg.w-.AAA.0.0.Bfn1-S.AWUvD3jQMQM';
        }
    }
}
