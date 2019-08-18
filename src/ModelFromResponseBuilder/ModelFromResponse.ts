import ResponseObject from "~/types/response/ResponseObject";
import AggregateRoot from "~/types/AggregateRoot";
import BaseModel from "~/types/BaseModel";

export default interface ModelFromResponse<T extends ResponseObject, N extends BaseModel> {

    build(from: T): N
}
