export type Pagination = {
    descending: boolean,
    page: number,
    itemsPerPage: number,
    totalItems: number,
    items: any[],
    pageCount: number,
    search: string,
    sortBy?: string
}
