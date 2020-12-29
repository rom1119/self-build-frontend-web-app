import Remover from "~/src/Remover";
import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableTrRemover from "~/src/Remover/impl/TableTrRemover";
import ApiService from "~/src/Api/ApiService";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableCellRemover from "~/src/Remover/impl/TableCellRemover";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";

export default class TableRowRemover extends HtmlNodeRemover
{
    protected cellRemover: TableCellRemover
    protected trRemover: TableTrRemover


    constructor(listToFind: HtmlTag[], api: ApiService) {
        super(listToFind, api);
    }

    remove(row: TableRowEl): Promise<any>
    {
        if (! row.api) {
            row.api = this.api
        }
        return new Promise((resolve, reject) => {

            // for (var tag of col.children) {
            //     this.cellRemover.remove(tag).then(
            // () => {
            //         resolve()
            //     },
            //     () => {
            //         reject()
            //     })
            // }
            row.tr.api.deleteTag(row.tr).then(
                (res) => {

                    // tag.synchronize()
                    let a = this.removeDeep(row.tr.uuid)
                    resolve()
                },
                () => {
                    alert("Błąd serwera")
                    reject()
                },
            )
            row.removeFromTable()


        })
    }
}
