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
            if (valLeft) {
                // this.paddingLeftData.setActive(true)
                this.leftProperty.setValue(valLeft)
            }  
            if (unitLeft) {
                this.leftProperty.setUnit(unitLeft)
            }
            this.leftProperty.setActive(false)
            this.setTmpPropertyToModel(this.leftProperty)
        }

        var propRight = this.getPropertyCssFromModel(this.rightProperty.getName())
        let valRight = this.realFetcher.fetchPropValue(this.rightProperty.getName())
        let unitRight = this.realFetcher.fetchUnit(this.rightProperty.getName())
        
        if (propRight) {
            this.rightProperty = <BasePaddingCss>propRight
            this.rightProperty.setActive(true)
        } else {
            if (valRight) {
                this.rightProperty.setValue(valRight)
            }  
            if (unitRight) {
                this.rightProperty.setUnit(unitRight)
            }
            this.rightProperty.setActive(false)
            this.setTmpPropertyToModel(this.rightProperty)
        }
        
        var propTop = this.getPropertyCssFromModel(this.topProperty.getName())
        let valTop = this.realFetcher.fetchPropValue(this.topProperty.getName())
        let unitTop = this.realFetcher.fetchUnit(this.topProperty.getName())
        
        if (propTop) {
            this.topProperty = <BasePaddingCss>propTop
            this.topProperty.setActive(true)
        } else {
            if (valTop) {
                this.topProperty.setValue(valTop)
            }  
            if (unitTop) {
                this.topProperty.setUnit(unitTop)
            }
            this.topProperty.setActive(false)
            this.setTmpPropertyToModel(this.topProperty)
        }
        
        var propGlobal = this.getPropertyCssFromModel(this.bottomProperty.getName())
        let valBottom = this.realFetcher.fetchPropValue(this.bottomProperty.getName())
        let unitBottom = this.realFetcher.fetchUnit(this.bottomProperty.getName())
        
        if (propGlobal) {
            this.bottomProperty = <BasePaddingCss>propGlobal
            this.bottomProperty.setActive(true)
        } else {
            if (valBottom) {
                this.bottomProperty.setValue(valBottom)
            }  
            if (unitBottom) {
                this.bottomProperty.setUnit(unitBottom)
            }
            this.bottomProperty.setActive(false)
            this.setTmpPropertyToModel(this.bottomProperty)

        }
        
        var propGlobal = this.getPropertyCssFromModel(this.globalProperty.getName())
        let valGlobal = this.realFetcher.fetchPropValue(this.globalProperty.getName())
        let unitGlobal = this.realFetcher.fetchUnit(this.globalProperty.getName())
        
        if (propGlobal) {
            this.globalProperty = <BasePaddingCss>propGlobal
            this.globalProperty.setActive(true)
        } else {
            if (valGlobal) {
                this.globalProperty.setValue(valGlobal)
            }  
            if (unitGlobal) {
                this.globalProperty.setUnit(unitGlobal)
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
        if (!this.globalProperty.active) {
            this.value.paddingFilter.deactivateProp(prop)

        } else {
            
            prop.setValue(this.globalProperty.getClearValue())
            prop.setUnit(this.globalProperty.getUnit())
            this.value.paddingFilter.injectCssProperty(this.globalProperty)
        }

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return null
    }
    activePropCss(prop: BasePropertyCss) {
        if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
            this.value.cssAccessor.addNewProperty(prop)

        }
        console.log('activr');
        
        this.value.paddingFilter.activateProp(prop)

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return prop
    }
    updateCssProp(newProp: BasePropertyCss) {
        console.log('ALA MA');
        console.log(newProp.getUnit());
        console.log(newProp);
        let val = this.value.getComputedCssVal(newProp)
        let clonedCss = _.cloneDeep(newProp)
        clonedCss.setValue(parseInt(val).toString())
        clonedCss.setUnit(new Pixel())
        console.log(newProp);
        console.log(val);
        console.log(clonedCss);
        console.log('ALA MA');
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