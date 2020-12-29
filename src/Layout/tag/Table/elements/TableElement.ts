import TableCell from '../TableCell';
import TableTr from '../TableTr';
import BasePropertyCss from '../../../../Css/BasePropertyCss';
import HtmlTagPropertyAccessor from "~/src/Css/PropertyAccessor/HtmlTagPropertyAccessor";
import {VueFixStyleListTransform} from "~/src/Vue/VueFixStyleListTransform";
import DefaultAttributesAccessor from "~/src/Attribute/impl/DefaultAttributesAccessor";
import RealPositionCalculator from "~/src/PositionCss/RealPositionCalculator";
import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import PaddingFilterCssInjector from "~/src/FilterCssInjector/PaddingFilterCssInjector";
import MarginFilterCssInjector from "~/src/FilterCssInjector/MarginFilterCssInjector";
import BorderFilterCssInjector from "~/src/FilterCssInjector/BorderFilterCssInjector";
import ContentFilterCssInjector from "~/src/FilterCssInjector/ContentFilterCssInjector";
import TableTag from "~/src/Layout/tag/Table/TableTag";
import LayoutEl from "~/src/LayoutEl";
import CssList from "~/src/Layout/CssList";
import SizeActivable from "~/src/SizeActivable";
import HtmlTag from "~/src/Layout/HtmlTag";
import ContentSizeCss from "~/src/Css/Size/ContentSizeCss";
import BaseBorderCss from "~/src/Css/Border/BaseBorderCss";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import BasePaddingCss from "~/src/Css/BoxModel/BasePaddingCss";
import HtmlNode from "~/src/Layout/HtmlNode";


export default abstract class TableElement extends HtmlTag implements CssList, SizeActivable{

    protected owner: TableTag
    children: TableCell[]
    index

    constructor(owner: TableTag, index)
    {
        super()
        this.owner = owner
        this.index = index
        // this.initCssAccessor()



    }

    public abstract  removeFromTable()

    protected initCssAccessor()
    {
        // super.initCssAccessor()
        // this._tmpCssPropertyAccesor = new TableRowPropertyAccessor(this)
        // this._cssPropertyAccesor = new TableRowPropertyAccessor(this)

        this.paddingFilter = new PaddingFilterCssInjector(this)
        this.marginFilter = new MarginFilterCssInjector(this)
        this.borderFilter = new BorderFilterCssInjector(this)
        this.contentFilter = new ContentFilterCssInjector(this)

    }

    public addChild(child: TableCell)
    {
        this.children.push(child)

    }

    public getSelectedSelector()
    {
        return this.owner.getSelectedSelector()
    }

    public synchronize()
    {
        return this.owner.synchronize()
    }

    //
    // get cssList() : any
    // {
    //
    //     return {}
    // }


    changeAsActiveSize() {
    }

    changeAsDeactiveSize() {
    }

    public setHtmlEl(htmlEl)
    {
        this._htmlEl = htmlEl

        this.notifyPositionalTag()
        // this.recalculateRealComputedProperties()

    }

}
