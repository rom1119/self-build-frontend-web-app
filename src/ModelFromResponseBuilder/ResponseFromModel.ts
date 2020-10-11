import ResponseObject from "~/types/response/ResponseObject";
import AggregateRoot from "~/types/AggregateRoot";
import BaseModel from "~/types/BaseModel";

export default interface ResponseFromModel<T extends BaseModel , N extends ResponseObject> {

    build(from: T, deep?: boolean): N
}
