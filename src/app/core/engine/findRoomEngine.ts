import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class FindRoomEngine implements IBDSType {
    private regex = /Cần tìm phòng|tìm phòng|muốn thuê phòng|tìm phòg|tìm nhà|cần thuê|Cần tìm|tìm trọ/muig;
    private negativeRegex = /24\/7|24\/24/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content) && !this.negativeRegex.test(entity.content);
    }

}
