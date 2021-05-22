import Remover from "~/src/Remover";
import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableTrRemover from "~/src/Remover/impl/TableTrRemover";
import ApiService from "~/src/Api/ApiService";

export default class TableCellRemoverForColspanEditor extends HtmlNodeRemover
{
    protected trRemover: TableTrRemover


    constructor(listToFind: HtmlTag[], api: ApiService) {
        super(listToFind, api);
        // this.trRemover = trRemover;
    }

    remove(tag: TableCell): Promise<any>
    {

        let a = this.removeDeep(tag.uuid)
        tag.columnElement.removeChildById(tag.uuid)
        tag.rowElement.removeChildById(tag.uuid)
        return new Promise((resolve, reject) => {
            tag.api.deleteTag(tag).then(
                (htmltag) => {

                    // htmltag.synchronize()

                    // if (!htmltag.parent.children) {
                    //     this.trRemover.remove(htmltag.parent)
                    // }
                    resolve(htmltag)
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
