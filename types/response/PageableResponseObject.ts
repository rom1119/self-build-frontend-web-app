import ResponseObject from "./ResponseObject";

export default class PageableResponseObject<T extends ResponseObject> extends ResponseObject {
    items: T[]
    pageSize: number = 0
    pageNumber: number = 0
    pagesCount: number = 0
    totalItemsCount: number = 0
}
