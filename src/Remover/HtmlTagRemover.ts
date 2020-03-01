import Remover from "../Remover";
import HtmlTag from "../Layout/HtmlTag";

export default class HtmlTagRemover implements Remover<String>
{
    private listToFind: HtmlTag[]

    constructor(listToFind: HtmlTag[])
    {
        this.listToFind = listToFind
    }


    removeBy(arg: string): boolean
    {
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