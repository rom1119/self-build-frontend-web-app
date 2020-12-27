import TableCell from '../TableCell';
import TableTr from '../TableTr';
import BasePropertyCss from '../../../../Css/BasePropertyCss';
import TableElementEl from "~/src/Layout/tag/Table/elements/TableElement";
import LeftCss from "~/src/Css/Display/Direction/LeftCss";
import Named from "~/src/Unit/Named";
import {TopCss} from "~/src/Css";
import Width from "~/src/Css/Size/Width";
import PositionCss from "~/src/Css/Display/PositionCss";
import BorderTopCss from "~/src/Css/Border/Top/BorderTopCss";
import BorderLeftCss from "~/src/Css/Border/Left/BorderLeftCss";
import Height from "~/src/Css/Size/Height";
import Pixel from "~/src/Unit/Size/Pixel";
import TableColumnPropertyAccessor from "~/src/Css/PropertyAccessor/TableColumnPropertyAccessor";
import TableRowPropertyAccessor from "~/src/Css/PropertyAccessor/TableRowPropertyAccessor";
import BorderBottomCss from "~/src/Css/Border/Bottom/BorderBottomCss";


export default class TableRowEl extends TableElementEl{

    tr: TableTr

    getDomainTagName(): string {
        return "";
    }

    getTagName(): string {
        return "";
    }

    public initHeight(w)
    {
        this.heightUnitCurrent = new Pixel()
        this._height = w
        // this.synchronizer.synchronize()

    }

    // protected contentTableDiffRealHeight(): number
    // {
    //     // console.log('table height', this.owner.calcRealContentHeight() )
    //     // console.log('calcContentHeight', this.owner.calcContentHeight() )
    //     var diff = this.owner.calcRealContentHeight() - this.owner.calcContentHeight()
    //
    //     return diff
    // }
    //
    //
    // public setHeightRow( h: Height) {
    //
    //     // for (var i = 0; i < this.children.length; i++) {
    //     //     var child = this.children[i]
    //     //     // child.initHeight(h)
    //     //
    //     // }
    //     // console.log('table height', this.owner.calcRealContentHeight() )
    //     // console.log('calcContentHeight', this.owner.calcContentHeight() )
    //     var diff = this.contentTableDiffRealHeight()
    //     var currTrHeight = this.tr.getComputedHeight()
    //     var tableRealHeight = parseInt(this.owner.getComputedCssValFromHidden(h))
    //
    //     var diffHeight = tableRealHeight - currTrHeight
    //
    //     console.log('diff', diff )
    //     console.log('diffHeight', diffHeight )
    //     console.log('RES', (diff - diffHeight) <= 0 )
    //     console.log(h.getValue())
    //     console.log(tableRealHeight)
    //     if ((diff - diffHeight) <= 0) {
    //         return
    //     }
    //     console.log(h.getValue())
    //     this.updateCssPropertyWithoutModel(h.getName(), h)
    //     this.initHeight(tableRealHeight)
    //     console.log('boxlist 22', this.tr.getHeightValue())
    //
    //
    //     this.tr.updateStylesForHeight(this.children[0])
    //
    //
    //
    //     // setTimeout(() => {
    //     //
    //     // }, 200)
    //
    //
    // }

    protected contentTableDiffRealHeight(): number
    {
        // console.log('table height', this.owner.calcRealContentHeight() )
        // console.log('calcContentHeight', this.owner.calcContentHeight() )
        var diff = this.owner.calcRealContentHeight() - this.owner.calcContentHeight()

        return diff
    }


    public setHeightRow( h) {

        // for (var i = 0; i < this.children.length; i++) {
        //     var child = this.children[i]
        //     // child.initHeight(h)
        //
        // }
        // console.log('table height', this.owner.calcRealContentHeight() )
        // console.log('calcContentHeight', this.owner.calcContentHeight() )
        var diff = this.contentTableDiffRealHeight()
        var currTrHeight = this.tr.getComputedHeight()
        var diffHeight = h - currTrHeight

        // console.log('diff', diff )
        // console.log('diffHeight', diffHeight )
        // console.log('RES', (diff - diffHeight) <= 0 )
        if ((diff - diffHeight + 3) <= 0) {
            return
        }
        this.tr.initHeight(h)
        // console.log('setWidthColumn col EL', this.children.length)

        this.initHeight(h)

        this.tr.updateStylesForHeight(this.children[0])



        // setTimeout(() => {
        //
        // }, 200)


    }

    public updateCssPropertyWithoutModel(name:string, css: BasePropertyCss) {

        super.updateCssPropertyWithoutModel(name, css)
        this.tr.updateCssPropertyWithoutModel(name, css)
        if (css instanceof Height) {
            return
        }
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.updateCssPropertyWithoutModel(name, css)

        }

    }

    public removeCssPropertyByName(propName: string)
    {
        // super.removeCssProperty(prop)
        this.cssAccessor.removePropWithName(propName);
        var prop = this.tmpCssAccessor.getProperty(propName);
        if (prop) {
            prop.id = null
            prop.setActive(false)
        }
        this.tr.removeCssPropertyByName(propName)
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.removeCssPropertyByName(propName)

        }

        // this.synchronize()
    }


    public recalculateRealComputedProperties(){
        super.recalculateRealComputedProperties()
        this.tr.recalculateRealComputedProperties()

        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            child.recalculateRealComputedProperties()

        }
    }


    protected initCssAccessor()
    {
        super.initCssAccessor()
        this._tmpCssPropertyAccesor = new TableRowPropertyAccessor(this)
        this._cssPropertyAccesor = new TableRowPropertyAccessor(this)
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
        var realHeight = this.children[0].getComputedVal(Height.PROP_NAME)
        var realTopBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderTopCss.PROP_NAME)
        var realTopBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderTopCss.PROP_NAME)

        var realBottomBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderBottomCss.PROP_NAME)
        var realBottomBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderBottomCss.PROP_NAME)

        var realLeftBorderWidth = this.children[0].borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var realLeftBorderWidthUnit = this.children[0].borderRealFetcher.fetchUnitWidth(BorderLeftCss.PROP_NAME)

        var thisWidth = this.getComputedWidth()
        // var offsetY = realTopBorderWidth + thisHeight
        // css[Height.PROP_NAME] = realHeight.toString() + 'px'

        if (realTopBorderWidthUnit && realBottomBorderWidthUnit) {
            css[Height.PROP_NAME] = `calc(100% + ${realTopBorderWidthUnit.getValue(realTopBorderWidth)} + ${realBottomBorderWidthUnit.getValue(realBottomBorderWidth)})`

        } else if (realTopBorderWidthUnit) {
            css[Height.PROP_NAME] = `calc(100% + ${realTopBorderWidthUnit.getValue(realTopBorderWidth)} )`

        } else if (realBottomBorderWidthUnit) {
            css[Height.PROP_NAME] = `calc(100% + ${realBottomBorderWidthUnit.getValue(realBottomBorderWidth)} )`

        } else {
            css[Height.PROP_NAME] = '100%'

        }

        if (realLeftBorderWidthUnit) {
            css[LeftCss.PROP_NAME] =  `calc(0px - ${thisWidth.toString()}px - ${realLeftBorderWidthUnit.getValue(realLeftBorderWidth)})`

        } else {
            css[LeftCss.PROP_NAME] =  `calc(0px - ${thisWidth.toString()}px`

        }

        if (realTopBorderWidthUnit) {

            css[TopCss.PROP_NAME] =  `calc(0px  - ${realTopBorderWidthUnit.getValue(realTopBorderWidth)})`
        }
        //     console.log('APPPPPPPPPPPPP', realTopBorderWidthUnit.getValue(realTopBorderWidth));
        // console.log('APPPPPPPPPPPPP', thisHeight);
        // console.log('APPPPPPPPPPPPP', css);


        return css

    }

}
