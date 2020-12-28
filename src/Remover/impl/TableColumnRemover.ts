import Remover from "~/src/Remover";
import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableTrRemover from "~/src/Remover/impl/TableTrRemover";
import ApiService from "~/src/Api/ApiService";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableCellRemover from "~/src/Remover/impl/TableCellRemover";

export default class TableColumnRemover extends HtmlNodeRemover
{
    protected cellRemover: TableCellRemover


    constructor(listToFind: HtmlTag[], api: ApiService, cellRemover: TableCellRemover) {
        super(listToFind, api);
        this.cellRemover = cellRemover;
    }

    remove(col: TableColumnEl): Promise<any>
    {
        if (! col.api) {
            col.api = this.api
        }
        return new Promise((resolve, reject) => {

            for (var tag of col.children) {
                this.cellRemover.remove(tag).then(
            () => {
                    resolve()
                },
                () => {
                    reject()
                })
            }
            col.removeFromTable()


        })
    }
}
