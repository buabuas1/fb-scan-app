import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class FindRoomEngine implements IBDSType {
    private regex = /Cần tìm phòng|tìm phòng|muốn thuê phòng|tìm phòg|tìm nhà|cần thuê|Cần tìm|tìm trọ/mui;
    private negativeRegex = /24\/7|24\/24|bên mình còn/mui;
    private commentFindRoom = /xin giá|inb|inbbox|ib/mui;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content) && !this.negativeRegex.test(entity.content)
            || this.isFindRoomComment(entity);
    }
    isFindRoomComment(entity: IBDSModel) {
        return entity.isComment && this.commentFindRoom.test(entity.content) && entity.content.length < 30;
    }
}
