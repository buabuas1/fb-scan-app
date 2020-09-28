import {IBDSModel} from '../../common/model/facebook/IBDS.model';
import {IBDSType} from './baseEngine';

export class OfficeEngine implements IBDSType {
    private regex = /cho thuê|khoá vân tay|24\/7/mui;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
