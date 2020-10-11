import ResponseObject from "~/types/response/ResponseObject";

export default interface IDSUpdater<T, N extends ResponseObject> {
    update(domain: T, results: N)
}