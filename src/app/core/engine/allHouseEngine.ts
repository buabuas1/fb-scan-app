import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class AllHouseEngine implements IBDSType {
    private regex = /nguyên căn|cho thuê cả nhà|cả nhà/mui;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
