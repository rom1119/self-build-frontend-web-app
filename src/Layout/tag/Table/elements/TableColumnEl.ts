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
import BorderRightCss from "~/src/Css/Border/Right/BorderRightCss";
import TableColumnPropertyTmpAccessor from "~/src/Css/PropertyAccessor/TableColumnPropertyTmpAccessor";
import Pixel from '../../../../Unit/Size/Pixel';


export default class TableColumnEl extends TableElement{
    
    protected _lengthOffsetCalc: string = 'calc(0px)'

    constructor(owner: TableTag, index)
    {
        super(owner, index)

        // console.log('constructor TableColumnEl')

        // this.initCssAccessor()
    }

    get IDHiddenEl() {
        return this.owner.shortUUID + '-column-hidden-box-' + this.index
    }

    get widthToRealInject() {
        return this._widthToRealInject
    }
    
    set widthToRealInject(arg) {
        this._widthToRealInject = arg

        // for (var i = 0; i < this.allChildren.length; i++) {
        //     var child = this.allChildren[i]
        //     child.widthToRealInject = arg
            
        // }
    }
    getDomainTagName(): string {
        this.updateComponentKey
        return "";
    }

    getTagName(): string {
        return "";
    }

    public removeFromTable()
    {
        this.owner.columns.splice(this.index, 1)
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

    get isOverflowContent() {
        for (const child of this.allChildren) {
            if (child.isOverflowContent) {
                return true
            }
        }
        return false
    }

    public setWidthColumn(width) {
        var currColWidth = this.allChildren[0].getComputedWidth()
        var diffWidth = width - currColWidth

        // console.log('currColWidth', currColWidth )
        // console.log('diffWidth', diffWidth )
        // console.log('width', width )
        // console.log('RES', ( diffWidth + 3) <= 0 )
        if (( diffWidth) <= 0) {
            if (this.isOverflowContent) {
                return
            }
        }
        var len = this.allChildren.length
        for (var i = 0; i < len; i++) {
            var child = this.allChildren[i]
            // child.checkIsOverflow()
            
            child.initWidth(width)

        }
        // this.owner.setWidthColumn(this.children[0].shortUUID, width)
        // this.owner.updateWidthStylesForColumn(this, width)

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
        this._tmpCssPropertyAccesor = new TableColumnPropertyTmpAccessor(this)
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

    // getComputedOffsetWidth() {
    //     return this.children[0].getComputedOffsetWidth()
    // }

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
 
        var tes = this._updateComponent

        // var rel = new PositionCss(PositionCss.ABSOLUTE, new Named())
        // css[PositionCss.PROP_NAME] = rel.getValue()
        // var realWidth = this.children[0].getComputedVal(Width.PROP_NAME)
        var realTopBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderTopCss.PROP_NAME)
        var realTopBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderTopCss.PROP_NAME)

        var realLeftBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var realLeftBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderLeftCss.PROP_NAME)

        var realRightBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderRightCss.PROP_NAME)
        var realRightBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderRightCss.PROP_NAME)

        var thisHeight = this.getComputedHeight()
        // var offsetY = realTopBorderWidth + thisHeight

        if (realLeftBorderWidthUnit && realRightBorderWidthUnit) {
            css[Width.PROP_NAME] = `calc(100% + ${realLeftBorderWidthUnit.getValue(realLeftBorderWidth)} + ${realRightBorderWidthUnit.getValue(realRightBorderWidth)})`

        } else if (realLeftBorderWidthUnit) {
            css[Width.PROP_NAME] = `calc(100% + ${realLeftBorderWidthUnit.getValue(realLeftBorderWidth)} )`

        } else if (realRightBorderWidthUnit) {
            css[Width.PROP_NAME] = `calc(100% + ${realRightBorderWidthUnit.getValue(realRightBorderWidth)} )`

        } else {
            css[Width.PROP_NAME] = '100%'

        }

        if (this.widthToRealInject != null) {
            var width = new Width(this.widthToRealInject, new Pixel())
            css[width.getName()] = width.getValue()

        } else {
            delete css[Width.PROP_NAME]

        }
        
        
        if (realLeftBorderWidthUnit) {
            css[LeftCss.PROP_NAME] =  `calc(0px - ${realLeftBorderWidthUnit.getValue(realLeftBorderWidth)})`
            
        }
        if (realTopBorderWidthUnit) {
            
            // console.log('APPPPPPPPPPPPP realTopBorderWidth', realTopBorderWidthUnit.getValue(realTopBorderWidth));
            css[TopCss.PROP_NAME] =  `calc(0px - ${thisHeight.toString()}px - ${realTopBorderWidthUnit.getValue(realTopBorderWidth)})`
        } else {
            
        }
        css[TopCss.PROP_NAME] =  `calc(0px - ${thisHeight.toString()}px)`
        // console.log('APPPPPPPPPPPPP thisHeight', thisHeight);
        // console.log('APPPPPPPPPPPPP index', this.index);
        

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
