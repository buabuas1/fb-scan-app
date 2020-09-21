import {GetGroupBodyModel} from './model/get-group-body.model';

export function setBody(body: GetGroupBodyModel,field: string, value: string) {
    body[field] = value;
    return body;
}
