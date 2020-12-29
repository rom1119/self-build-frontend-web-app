import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import RemoverAdvisor from "~/src/Remover/RemoverAdvisor";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableCellRemover from "~/src/Remover/impl/TableCellRemover";
import ApiService from "~/src/Api/ApiService";
import TableTrRemover from "~/src/Remover/impl/TableTrRemover";
import TableTr from "~/src/Layout/tag/Table/TableTr";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableColumnRemover from "~/src/Remover/impl/TableColumnRemover";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import TableRowRemover from "~/src/Remover/impl/TableRowRemover";

export default class DefaultRemoverAdvisor implements RemoverAdvisor  {

    private listToFind: HtmlTag[]
    private api: ApiService

    constructor(listToFind: HtmlTag[], api: ApiService)
    {
        this.listToFind = listToFind
        this.api = api
    }

    advise(tag: HtmlTag): HtmlNodeRemover
    {

        var tagRemove = new HtmlNodeRemover(this.listToFind, this.api)
        var trRemove = new TableTrRemover(this.listToFind, this.api, tagRemove)
        var cellRemove = new TableCellRemover(this.listToFind, this.api, trRemove)
        if (tag instanceof TableCell) {
            return cellRemove
        }

        if (tag instanceof TableTr) {
            return trRemove
        }

        if (tag instanceof TableColumnEl) {
            return new TableColumnRemover(this.listToFind, this.api, cellRemove)
        }

        if (tag instanceof TableRowEl) {
            return new TableRowRemover(this.listToFind, this.api)
        }

        return tagRemove

    }
}
