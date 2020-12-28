import Remover from "../Remover";
import HtmlTag from "../Layout/HtmlTag";
import ApiService from "~/src/Api/ApiService";
import HtmlNode from "~/src/Layout/HtmlNode";

export default class HtmlNodeRemover implements Remover<HtmlNode>
{
    protected listToFind: HtmlTag[]
    protected api: ApiService

    constructor(listToFind: HtmlTag[], api: ApiService)
    {
        this.listToFind = listToFind
        this.api = api
    }


    remove(tag: HtmlNode): Promise<any>
    {

        return new Promise((resolve, reject) => {
            tag.api.deleteTag(tag).then(
                (res) => {

                    // tag.synchronize()
                    let a = this.removeDeep(tag.uuid)
                    resolve()
                },
                () => {
                    alert("Błąd serwera")
                    reject()
                },
            )


        })
    }

    protected removeDeep(arg: string){
        for (let i = 0; i < this.listToFind.length; i++) {
            let item = this.listToFind[i]
            let isRemoved = this.removeRecursive(arg, item, this.listToFind, i)
            if (isRemoved) {
                return true
            }
        }

        return false
    }

    private removeRecursive(val: string, tag: HtmlTag, list: HtmlTag[], index: number)
    {
        if (tag.uuid === val) {
            list.splice(index, 1)

            return true
        }

        for (let i = 0; i < tag.children.length; i++) {
            let item: HtmlTag = <HtmlTag>tag.children[i]
            let isRemoved = this.removeRecursive(val, item, <HtmlTag[]>tag.children, i)
            if (isRemoved) {
                return true
            }
        }

        return false
    }
}
