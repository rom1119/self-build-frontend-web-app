import Remover from "~/src/Remover";
import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import TableCell from "~/src/Layout/tag/Table/TableCell";
import TableTr from "~/src/Layout/tag/Table/TableTr";
import ApiService from "~/src/Api/ApiService";
import TableTag from "~/src/Layout/tag/Table/TableTag";

export default class TableTrRemover extends HtmlNodeRemover
{
    protected tagRemover: HtmlNodeRemover


    constructor(listToFind: HtmlTag[], api: ApiService, tagRemover: HtmlNodeRemover) {
        super(listToFind, api);
        this.tagRemover = tagRemover;
    }

    remove(tag: TableTr): Promise<any>
    {

        return new Promise((resolve, reject) => {
            tag.api.deleteTag(tag).then(
                (res) => {

                    tag.synchronize()
                    let a = this.removeDeep(tag.uuid)
                    if (!tag.parent.children) {
                        if (!(tag.parent instanceof TableTag)) {
                            this.tagRemover.remove(tag.parent)

                        }
                    }

                    resolve()
                },
                () => {
                    alert("Błąd serwera")
                    reject()
                },
            )


        })
    }
}
