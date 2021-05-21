import Remover from "~/src/Remover";
import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableTrRemover from "~/src/Remover/impl/TableTrRemover";
import ApiService from "~/src/Api/ApiService";

export default class TableCellRemover extends HtmlNodeRemover
{
    protected trRemover: TableTrRemover


    constructor(listToFind: HtmlTag[], api: ApiService, trRemover: TableTrRemover) {
        super(listToFind, api);
        this.trRemover = trRemover;
    }

    remove(tag: TableCell): Promise<any>
    {

        return new Promise((resolve, reject) => {
            tag.api.deleteTag(tag).then(
                (htmltag) => {

                    // htmltag.synchronize()
                    let a = this.removeDeep(htmltag.uuid)
                    var colIdx = tag.colIndex
                    tag.columnElement.removeChildById(tag.uuid)

                    if (!htmltag.parent.children) {
                        this.trRemover.remove(htmltag.parent)
                    }
                    resolve(htmltag)
                    tag.getTable().updateTableStructure()
                    tag.getTable().updateRealView()
                },
                () => {
                    reject()
                    alert("Błąd serwera")
                    throw Error('Błąd serwera')
                },
            )


        })
    }
}
