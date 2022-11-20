import {IBDSModel} from '../../common/model/facebook/IBDS.model';

export interface IBDSType {
    validateType(entity: IBDSModel): boolean;
}

export interface ICost {
    getCosts(entity: IBDSModel): any[];
}

export interface INumberOfRoom {
    getNumberOfRoom(entity: IBDSModel): number[];
}
