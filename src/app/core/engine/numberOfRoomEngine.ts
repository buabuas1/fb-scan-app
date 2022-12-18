import {IBDSType, INumberOfRoom} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';
import {removeVietnameseTones} from '../../common/util';

export class NumberOfRoomEngine implements INumberOfRoom {
    private regex = /\d+(phon|pkk| phon| pkk| 1k1n|1k1n| 1n1k|1n1k | pn|pn)/gmi;
    private regexTrash = /t[^r \d \W]|tr[^i\d \W]/gmiu;

    getNumberOfRoom(entity: IBDSModel): any[] {
        let m;
        const numberOfRooms = [];
        const contentFull = entity.isComment ? entity.content + ' ' + entity.parentContent : entity.content;
        const content = contentFull ? removeVietnameseTones(contentFull)
            .replace(this.regexTrash, '').toLowerCase() : contentFull;
        while ((m = this.regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }

            if (m[0] && parseInt(m[0]) != NaN) {
                numberOfRooms.push(parseInt(m[0]));
            }
        }
        return numberOfRooms;
    }
}
