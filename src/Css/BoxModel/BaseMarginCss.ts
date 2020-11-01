import CssDirectionComposite from "../CssDirectionComposite"
import CssAuto from "../CssAuto"
import HtmlTag from "~/src/Layout/HtmlTag"
import TableCell from "~/src/Layout/tag/Table/TableCell"
import TableTBody from "~/src/Layout/tag/Table/TableTBody"
import TableTFoot from "~/src/Layout/tag/Table/TableTFoot"
import TableTHead from "~/src/Layout/tag/Table/TableTHead"
import TableTr from "~/src/Layout/tag/Table/TableTr"
import TableTd from "~/src/Layout/tag/Table/TableTd"
import TableTh from "~/src/Layout/tag/Table/TableTh"


export default class BaseMarginCss extends CssDirectionComposite implements CssAuto
{
    protected _auto = false
    public static PROP_NAME = 'margin'
    public getName(): string {
        return BaseMarginCss.PROP_NAME
    }

    isAuto(): boolean {
        return this._auto === true
    }
    notAuto() {
        this._auto = false
    }

    auto() 
    {
        this._auto = true
    }

    public static canBeManageBy(htmlTag: HtmlTag) {
        if (
            htmlTag.isElementOfTable()
            
        ) {          
            return false

        }

        return true
    }


    public getValue(): string
    {
        if (this.isAuto()) {
            return 'auto'
        }

        return super.getValue()
    }
}