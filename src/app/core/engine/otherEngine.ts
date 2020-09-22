import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class OtherEngine implements IBDSType {
    validateType(entity: IBDSModel): boolean {
        return true;
    }

}
