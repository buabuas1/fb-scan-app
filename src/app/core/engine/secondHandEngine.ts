import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class SecondHandEngine implements IBDSType {
    private regex = /thanh lý|thanh lí|thanh ly|thanh li/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
