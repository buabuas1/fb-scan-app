import {IBDSType} from './baseEngine';
import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export class ChangeHostEngine implements IBDSType {
    private regex = /sang nhượng|sang nhuong|cần nhượng lại|nhượng lại/mui;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
