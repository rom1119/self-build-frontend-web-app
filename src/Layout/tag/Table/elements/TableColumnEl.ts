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
import HtmlTag from "~/src/Layout/HtmlTag";
import TableElement from "~/src/Layout/tag/Table/elements/TableElement";
import Width from "~/src/Css/Size/Width";
import Height from "~/src/Css/Size/Height";
import FontSize from "~/src/Css/Text/FontSize";
import BasePaddingCss from "~/src/Css/BoxModel/BasePaddingCss";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import BaseBorderCss from "~/src/Css/Border/BaseBorderCss";
import ContentSizeCss from "~/src/Css/Size/ContentSizeCss";
import BoxShadowCss from "~/src/Css/Shadow/BoxShadowCss";
import PositionCss from "~/src/Css/Display/PositionCss";
import LeftCss from "~/src/Css/Display/Direction/LeftCss";
import {BottomCss, RightCss, TopCss} from "~/src/Css";
import MarginLeftCss from "~/src/Css/BoxModel/Margin/MarginLeftCss";
import Named from "~/src/Unit/Named";
import TableContainer from "~/src/Layout/tag/Table/TableContainer";
import BorderTopCss from "~/src/Css/Border/Top/BorderTopCss";
import BorderLeftCss from "~/src/Css/Border/Left/BorderLeftCss";
import TableColumnPropertyAccessor from "~/src/Css/PropertyAccessor/TableColumnPropertyAccessor";


export default class TableColumnEl extends TableElement{
    protected _lengthOffsetCalc: string = 'calc(0px)'


    getDomainTagName(): string {
        this.updateComponentKey
        return "";
    }

    getTagName(): string {
        return "";
    }

    get lengthOffsetCalc(): string
    {
        return this._lengthOffsetCalc
    }
    set lengthOffsetCalc(arg: string)
    {
        this._lengthOffsetCalc = arg
    }

    public initSize(w, h?)
    {
        this.toInitSizeUnits()
        // console.log(w);
        // console.log(h);

        this._width = w

        let width = new Width(this._width, this.widthUnitCurrent)
        this.updateCssPropertyWithoutModel(width.getName(), width)

    }

    public setWidthColumn( width) {

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.initWidth(width)

        }
        // console.log('setWidthColumn col EL', this.children.length)

        this.initSize(width)

    }

    public updateCssPropertyWithoutModel(name:string, css: BasePropertyCss) {

        super.updateCssPropertyWithoutModel(name, css)
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.updateCssPropertyWithoutModel(name, css)

        }

    }


    public recalculateRealComputedProperties(){
        super.recalculateRealComputedProperties()

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.recalculateRealComputedProperties()

        }
    }


    protected initCssAccessor()
    {
        super.initCssAccessor()
        this._tmpCssPropertyAccesor = new TableColumnPropertyAccessor(this)
        this._cssPropertyAccesor = new TableColumnPropertyAccessor(this)
        // let width = new Width(this.width, this.widthUnit)
        // let height = new Height(this.lengthCalc, new Named())
        let left = new LeftCss('calc(0px)', new Named())
        // let top = new TopCss(this.lengthOffsetCalc, new Named())
        let top = new TopCss('calc(-60px)', new Named())

        // this._cssPropertyAccesor.addNewProperty(width)
        // this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(left)
        this._cssPropertyAccesor.addNewProperty(top)
    }

    canAddToCssList(css: BasePropertyCss): boolean
    {
        if (css instanceof Width) {
            return true
        }

        if (css instanceof LeftCss) {
            return true
        }

        if (css instanceof TopCss) {
            return true
        }


        return false
    }

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            if (!this.canAddToCssList(cssProp)) {
                continue
            }

            css[cssProp.getName()] = cssProp.getValue()

            // if (cssProp instanceof FontSize) {
            //     this._innerText = 'Font-size: ' + cssProp.getValue()
            // }
        }

        var rel = new PositionCss(PositionCss.ABSOLUTE, new Named())
        css[PositionCss.PROP_NAME] = rel.getValue()
        var realWidth = this.children[0].getComputedVal(Width.PROP_NAME)
        var realTopBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderTopCss.PROP_NAME)
        var realTopBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderTopCss.PROP_NAME)

        var realLeftBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var realLeftBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderLeftCss.PROP_NAME)

        var thisHeight = this.getComputedHeight()
        // var offsetY = realTopBorderWidth + thisHeight
        css[Width.PROP_NAME] = realWidth.toString() + 'px'

        if (realLeftBorderWidthUnit) {
            css[LeftCss.PROP_NAME] =  `calc(0px - ${realLeftBorderWidthUnit.getValue(realLeftBorderWidth)})`

        }
        if (realTopBorderWidthUnit) {

            css[TopCss.PROP_NAME] =  `calc(0px - ${thisHeight.toString()}px - ${realTopBorderWidthUnit.getValue(realTopBorderWidth)})`
        } else {

            css[TopCss.PROP_NAME] =  `calc(0px - ${thisHeight.toString()}px)`
        }
        //     console.log('APPPPPPPPPPPPP', realTopBorderWidthUnit.getValue(realTopBorderWidth));
        // console.log('APPPPPPPPPPPPP', thisHeight);
        // console.log('APPPPPPPPPPPPP', css);


        // if (this.hasAbsolute || this.hasFixed) {
        //     css[Width.PROP_NAME] = this.widthCalc
        //     css[Height.PROP_NAME] = this.heightCalc
        //
        // } else {
        //     css[Width.PROP_NAME] = '100%'
        //     css[Height.PROP_NAME] = '100%'
        //
        // }
        //
        // if (css[Height.PROP_NAME]) {
        //     let height = new Height(this._height, this.heightUnitCurrent)
        // }

        // console.log('APPPPPPPPPPPPP');
        // console.log(css);


        return css

    }

}
