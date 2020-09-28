import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class ForRentEngine implements IBDSType {
    private regex = /cho thu|khoá vân tay|CCMN|mình có phòng|ccmn|24\/7|24\/24|còn.{0,100}phòng|giảm.{0,100}phòng/mui;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }
}
