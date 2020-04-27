import Unit from "~/src/Unit/Unit";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import HtmlTag from "~/src/Layout/HtmlTag";
import Pixel from "~/src/Unit/Size/Pixel";
import DirectionComputedPropertyManager, { DirectionsProperty } from "../DirectionComputedPropertyManager";
import BasePaddingCss from "~/src/Css/BoxModel/BasePaddingCss";
import _ from 'lodash'
import FetcherRealCssProp from '../../../src/FetcherRealCssProp';
import PaddingLeftCss from "~/src/Css/BoxModel/Padding/PaddingLeftCss";
import PaddingRightCss from "~/src/Css/BoxModel/Padding/PaddingRightCss";
import PaddingTopCss from "~/src/Css/BoxModel/Padding/PaddingTopCss";
import PaddingBottomCss from "~/src/Css/BoxModel/Padding/PaddingBottomCss";
import PaddingCss from "~/src/Css/BoxModel/Padding/PaddingCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";
import BorderSizeCalculator from "~/src/Calculator/Size/BorderSizeCalculator";
import BorderOffsetSizeCalculator from "~/src/Calculator/OffsetSize/BorderOffsetSizeCalculator";

export default class PaddingComputedPropertyManager implements DirectionComputedPropertyManager
{
    protected value: HtmlTag
    DEFAULT_PADDING = 0
    DEFAULT_PADDING_UNIT = new Pixel()

    leftProperty: BasePaddingCss = new PaddingLeftCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    rightProperty: BasePaddingCss = new PaddingRightCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    topProperty: BasePaddingCss = new PaddingTopCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    bottomProperty: BasePaddingCss = new PaddingBottomCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    globalProperty: BasePaddingCss = new PaddingCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)

    protected realFetcher: FetcherRealCssProp

    constructor(  )
    {
        this.leftProperty.setActive(false)
        this.rightProperty.setActive(false)
        this.topProperty.setActive(false)
        this.bottomProperty.setActive(false)
        this.globalProperty.setActive(false)

    }

    public setHtmlEl(val: HtmlTag)
    {
        this.value = val
    }
    
    public setFetcher(fetcher:  FetcherRealCssProp)
    {
        this.realFetcher = fetcher
    }

    protected getPropertyCssFromModel(prop: string)
    {
        if (!this.value) {
            return null
        }
        return this.value.cssAccessor.getProperty(prop)
    }

    protected setTmpPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return false
        }
        if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.tmpCssAccessor.addNewProperty(newCssProp)
        } else {
            this.value.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)
            
        }
        // this.value.updateModelComponent()

    }
    
    init() {
        var propLeft = this.getPropertyCssFromModel(this.leftProperty.getName())
        let valLeft = this.realFetcher.fetchPropValue(this.leftProperty.getName())
        let unitLeft = this.realFetcher.fetchUnit(this.leftProperty.getName())
        
        if (propLeft) {
            this.leftProperty = <BasePaddingCss>propLeft
            this.leftProperty.setActive(true)
        } else {
            this.leftProperty.setActive(false)
            let copy = _.cloneDeep(this.leftProperty)
            this.leftProperty = copy
            this.setTmpPropertyToModel(copy)
            if (valLeft) {
                this.leftProperty.setValue(valLeft)
            } else {
                this.leftProperty.setValue(this.DEFAULT_PADDING.toString())
            }
            if (unitLeft) {
                this.leftProperty.setUnit(unitLeft)
            } else {
                this.leftProperty.setUnit(this.DEFAULT_PADDING_UNIT)
            }
        }

        var propRight = this.getPropertyCssFromModel(this.rightProperty.getName())
        let valRight = this.realFetcher.fetchPropValue(this.rightProperty.getName())
        let unitRight = this.realFetcher.fetchUnit(this.rightProperty.getName())
        
        if (propRight) {
            this.rightProperty = <BasePaddingCss>propRight
            this.rightProperty.setActive(true)
        } else {
            this.rightProperty.setActive(false)
            let copy = _.cloneDeep(this.rightProperty)
            this.rightProperty = copy
            this.setTmpPropertyToModel(copy)
            if (valRight) {
                this.rightProperty.setValue(valRight)
            } else {
                this.rightProperty.setValue(this.DEFAULT_PADDING.toString())
            }
            if (unitRight) {
                this.rightProperty.setUnit(unitRight)
            } else {
                this.rightProperty.setUnit(this.DEFAULT_PADDING_UNIT)
            }

        }
        
        var propTop = this.getPropertyCssFromModel(this.topProperty.getName())
        let valTop = this.realFetcher.fetchPropValue(this.topProperty.getName())
        let unitTop = this.realFetcher.fetchUnit(this.topProperty.getName())
        
        if (propTop) {
            this.topProperty = <BasePaddingCss>propTop
            this.topProperty.setActive(true)
        } else {
            this.topProperty.setActive(false)
            let copy = _.cloneDeep(this.topProperty)
            this.topProperty = copy
            this.setTmpPropertyToModel(copy)
            if (valTop) {
                this.topProperty.setValue(valTop)
            } else {
                this.topProperty.setValue(this.DEFAULT_PADDING.toString())
            }
            if (unitTop) {
                this.topProperty.setUnit(unitTop)
            } else {
                this.topProperty.setUnit(this.DEFAULT_PADDING_UNIT)
            }

        }
        
        var propGlobal = this.getPropertyCssFromModel(this.bottomProperty.getName())
        let valBottom = this.realFetcher.fetchPropValue(this.bottomProperty.getName())
        let unitBottom = this.realFetcher.fetchUnit(this.bottomProperty.getName())
        
        if (propGlobal) {
            this.bottomProperty = <BasePaddingCss>propGlobal
            this.bottomProperty.setActive(true)
        } else {
            this.bottomProperty.setActive(false)
            let copy = _.cloneDeep(this.bottomProperty)
            this.bottomProperty = copy
            this.setTmpPropertyToModel(copy)
            if (valBottom) {
                this.bottomProperty.setValue(valBottom)
            } else {
                this.bottomProperty.setValue(this.DEFAULT_PADDING.toString())
            }
            if (unitBottom) {
                this.bottomProperty.setUnit(unitBottom)
            } else {
                this.bottomProperty.setUnit(this.DEFAULT_PADDING_UNIT)
            }


        }
        
        var propGlobal = this.getPropertyCssFromModel(this.globalProperty.getName())
        let valGlobal = this.realFetcher.fetchPropValue(this.globalProperty.getName())
        let unitGlobal = this.realFetcher.fetchUnit(this.globalProperty.getName())
        
        if (propGlobal) {
            this.globalProperty = <BasePaddingCss>propGlobal
            this.globalProperty.setActive(true)
        } else {
            this.globalProperty.setActive(false)
            let copy = _.cloneDeep(this.globalProperty)
            this.globalProperty = copy
            this.setTmpPropertyToModel(copy)
            if (valGlobal) {
                this.globalProperty.setValue(valGlobal)
            } else {
                this.globalProperty.setValue(this.DEFAULT_PADDING.toString())
            }
            if (unitGlobal) {
                this.globalProperty.setUnit(unitGlobal)
            } else {
                this.globalProperty.setUnit(this.DEFAULT_PADDING_UNIT)
            }
        }
    }

    updateDirections() {
        this.globalProperty.setActive(false)
        this.leftProperty.setActive(false)
        this.rightProperty.setActive(false)
        this.topProperty.setActive(false)
        this.bottomProperty.setActive(false)
        this.init()
    }
    
    setDirectionsPropertiesFromVal(newVal: any, newUnit: Unit) {
        if (!this.value.cssAccessor.hasCssProperty(PaddingLeftCss.PROP_NAME)) {
            this.leftProperty.setValue(newVal)
            this.leftProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingRightCss.PROP_NAME)) {
            this.rightProperty.setValue(newVal)
            this.rightProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingTopCss.PROP_NAME)) {
            this.topProperty.setValue(newVal)
            this.topProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingBottomCss.PROP_NAME)) {
            this.bottomProperty.setValue(newVal)
            this.bottomProperty.setUnit(newUnit)
        }
    }
    deactiveGlobalPropCss(prop: BasePropertyCss) {
        this.value.cssAccessor.removePropWithName(prop.getName())
        this.value.paddingFilter.deactivateProp(prop)

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return null
    }
    deactivePropCss(prop: BasePropertyCss) {
        this.value.cssAccessor.removePropWithName(prop.getName())
        prop.id = null
        if (!this.globalProperty.active) {
            this.value.paddingFilter.deactivateProp(prop)

        } else {
            
            prop.setValue(this.globalProperty.getClearValue())
            prop.setUnit(this.globalProperty.getUnit())
            this.value.paddingFilter.injectCssProperty(this.globalProperty)
        }

        this.value.synchronize()

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return null
    }
    activePropCss(prop: BasePropertyCss) {
        prop.id = null

        if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
            this.value.cssAccessor.addNewProperty(prop)

        }
        console.log('activr');
        
        this.value.paddingFilter.activateProp(prop)
        this.value.synchronize()

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return prop
    }
    updateCssProp(newProp: BasePropertyCss) {
        // console.log('ALA MA');
        // console.log(newProp.getUnit());
        // console.log(newProp);
        let val = this.value.getComputedCssVal(newProp)
        let clonedCss = _.cloneDeep(newProp)
        clonedCss.setValue(parseInt(val).toString())
        clonedCss.setUnit(new Pixel())
        // console.log(newProp);
        // console.log(val);
        // console.log(clonedCss);
        // console.log('ALA MA');
        this.value.paddingFilter.injectCssProperty(clonedCss)
        console.log(newProp);
        
        this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)

        return newProp.getClearValue()
    }

    private recalculateMargins(htmlTag: HtmlTag)
    {
        let sizeCalc = new MarginSizeCalculator(htmlTag)
        let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)
        
        htmlTag.marginTop.length = sizeCalc.calculateSize(htmlTag.marginTop)
        htmlTag.marginTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginTop)
        htmlTag.marginBottom.length = sizeCalc.calculateSize(htmlTag.marginBottom)
        htmlTag.marginBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginBottom)
        htmlTag.marginLeft.length = sizeCalc.calculateSize(htmlTag.marginLeft)
        htmlTag.marginLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginLeft)
        htmlTag.marginRight.length = sizeCalc.calculateSize(htmlTag.marginRight)
        htmlTag.marginRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginRight)
            
    }

    private recalculateBorders(htmlTag: HtmlTag)
    {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)
        
        htmlTag.borderTop.length = sizeCalc.calculateSize(htmlTag.borderTop)
        htmlTag.borderTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderTop)
        htmlTag.borderBottom.length = sizeCalc.calculateSize(htmlTag.borderBottom)
        htmlTag.borderBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderBottom)
        htmlTag.borderLeft.length = sizeCalc.calculateSize(htmlTag.borderLeft)
        htmlTag.borderLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderLeft)
        htmlTag.borderRight.length = sizeCalc.calculateSize(htmlTag.borderRight)
        htmlTag.borderRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderRight)
            
    }


}