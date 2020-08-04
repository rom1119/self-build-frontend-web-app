import Unit from "~/src/Unit/Unit";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import HtmlTag from "~/src/Layout/HtmlTag";
import Pixel from "~/src/Unit/Size/Pixel";
import DirectionComputedPropertyManager, { DirectionsProperty } from "../DirectionComputedPropertyManager";
import BaseBorderCss from "~/src/Css/Border/BaseBorderCss";
import _ from 'lodash'
import FetcherRealCssProp from '../../../src/FetcherRealCssProp';
import BorderLeftCss from "~/src/Css/Border/Left/BorderLeftCss";
import BorderRightCss from "~/src/Css/Border/Right/BorderRightCss";
import BorderTopCss from "~/src/Css/Border/Top/BorderTopCss";
import BorderBottomCss from "~/src/Css/Border/Bottom/BorderBottomCss";
import BorderCss from "~/src/Css/Border/Global/BorderGlobalCss";
import MarginSizeCalculator from "~/src/Calculator/Size/MarginSizeCalculator";
import MarginOffsetSizeCalculator from "~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator";
import BorderSizeCalculator from "~/src/Calculator/Size/BorderSizeCalculator";
import BorderOffsetSizeCalculator from "~/src/Calculator/OffsetSize/BorderOffsetSizeCalculator";
import { Named } from "~/src/Unit";
import BorderFetcherRealCssProp from "~/src/BorderFetcherRealCssProp";
import BaseBorderRadiusCss from "~/src/Css/Border/BaseBorderRadiusCss";
import BorderRadiusBottomLeft from "~/src/Css/Border/Radius/BorderRadiusBottomLeft";
import BorderRadiusBottomRight from "~/src/Css/Border/Radius/BorderRadiusBottomRight";
import BorderRadiusTopRight from "~/src/Css/Border/Radius/BorderRadiusTopRight";
import BorderRadiusTopLeft from "~/src/Css/Border/Radius/BorderRadiusTopLeft";
import BorderRadiusGlobal from "~/src/Css/Border/Radius/BorderRadiusGlobal";
import BorderRecalculate from '../../../src/Recalculator/HtmlTagImpl/BorderRecalculate';
import HtmlTagRecalculator from '../../../src/Recalculator/HtmlTagRecalculator';
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";

export default class BorderComputedPropertyManager implements DirectionComputedPropertyManager
{
    protected value: HtmlTag
    DEFAULT_BORDER = 0
    DEFAULT_BORDER_STYLE = 'dotted'
    DEFAULT_BORDER_COLOR = 'green'
    DEFAULT_BORDER_COLOR_UNIT = new Named()
    DEFAULT_BORDER_UNIT = new Pixel()

    DEFAULT_BORDER_RADIUS = 5
    DEFAULT_BORDER_RADIUS_UNIT = new Pixel()

    leftProperty: BaseBorderCss = new BorderLeftCss(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
    rightProperty: BaseBorderCss = new BorderRightCss(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
    topProperty: BaseBorderCss = new BorderTopCss(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
    bottomProperty: BaseBorderCss = new BorderBottomCss(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
    globalProperty: BaseBorderCss = new BorderCss(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
    
    bottomLeftRadiusProperty: BaseBorderRadiusCss = new BorderRadiusBottomLeft(this.DEFAULT_BORDER_RADIUS, this.DEFAULT_BORDER_RADIUS_UNIT)
    bottomRightRadiusProperty: BaseBorderRadiusCss = new BorderRadiusBottomRight(this.DEFAULT_BORDER_RADIUS, this.DEFAULT_BORDER_RADIUS_UNIT)
    topRightRadiusProperty: BaseBorderRadiusCss = new BorderRadiusTopRight(this.DEFAULT_BORDER_RADIUS, this.DEFAULT_BORDER_RADIUS_UNIT)
    topLeftRadiusProperty: BaseBorderRadiusCss = new BorderRadiusTopLeft(this.DEFAULT_BORDER_RADIUS, this.DEFAULT_BORDER_RADIUS_UNIT)
    globalRadiusProperty: BaseBorderRadiusCss = new BorderRadiusGlobal(this.DEFAULT_BORDER_RADIUS, this.DEFAULT_BORDER_RADIUS_UNIT)

    protected realFetcher: BorderFetcherRealCssProp
    
    protected borderRecalculator: HtmlTagRecalculator
    protected marginRecalculator: HtmlTagRecalculator


    constructor(  )
    {   
        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()

        this.leftProperty.setActive(false)
        this.leftProperty.setType(this.DEFAULT_BORDER_STYLE)
        this.leftProperty.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)

        this.rightProperty.setActive(false)
        this.rightProperty.setType(this.DEFAULT_BORDER_STYLE)
        this.rightProperty.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)

        this.topProperty.setActive(false)
        this.topProperty.setType(this.DEFAULT_BORDER_STYLE)
        this.topProperty.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)

        this.bottomProperty.setActive(false)
        this.bottomProperty.setType(this.DEFAULT_BORDER_STYLE)
        this.bottomProperty.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)

        this.globalProperty.setActive(false)
        this.globalProperty.setType(this.DEFAULT_BORDER_STYLE)
        this.globalProperty.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)

        // RADIUS PROPS
        this.bottomLeftRadiusProperty.setActive(false)
        this.bottomRightRadiusProperty.setActive(false)
        this.topRightRadiusProperty.setActive(false)
        this.topLeftRadiusProperty.setActive(false)
        this.globalRadiusProperty.setActive(false)

    }

    public setHtmlEl(val: HtmlTag)
    {
        this.value = val
    }
    
    public setFetcher(fetcher)
    {
        this.realFetcher = fetcher
    }

    protected getPropertyCssFromModel(prop: string)
    {
        if (!this.value) {
            return null
        }
        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            return activeSelector.cssAccessor.getProperty(prop)

        }
        return this.value.cssAccessor.getProperty(prop)
    }

    protected setTmpPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return false
        }

        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            if (!activeSelector.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
                activeSelector.tmpCssAccessor.addNewProperty(newCssProp)
            } else {
                activeSelector.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)
                
            }

        } else {
            if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
                this.value.tmpCssAccessor.addNewProperty(newCssProp)
            } else {
                this.value.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)
                
            }

        }
        // this.value.updateModelComponent()

    }
    
    private initRadiusProperty(propertyArg: BaseBorderRadiusCss): BaseBorderRadiusCss
    {
        var prop = this.getPropertyCssFromModel(propertyArg.getName())
        let val = propertyArg.getClearValue()
        let unit = propertyArg.getUnit()
        
        if (prop) {
            propertyArg = prop
            propertyArg.setActive(true)

            return propertyArg
        } 
        propertyArg.setActive(false)
        let copy = _.cloneDeep(propertyArg)
        propertyArg = copy
        this.setTmpPropertyToModel(copy)
        if (val) {
            propertyArg.setValue(val)
        } else {
            propertyArg.setValue(this.DEFAULT_BORDER_RADIUS.toString())
        }
        if (unit) {
            propertyArg.setUnit(unit)
        } else {
            propertyArg.setUnit(this.DEFAULT_BORDER_RADIUS_UNIT)
        }
    
        return propertyArg
    }

    private initProperty(propertyArg: BaseBorderCss): BaseBorderCss
    {
        var prop = <BaseBorderCss> this.getPropertyCssFromModel(propertyArg.getName())
        let clearWidth = this.realFetcher.fetchPropWidth(propertyArg.getName())
        let clearStyle = this.realFetcher.fetchPropStyle(propertyArg.getName())
        let clearColor = this.realFetcher.fetchPropColor(propertyArg.getName())
            // console.log(propertyArg.getName());
            // console.log(prop);
            // console.log(propertyArg);
            // console.log(clearWidth);
            // console.log(clearColor);
            
        let unitWidth = this.realFetcher.fetchUnitWidth(propertyArg.getName())
        let unitStyle = this.realFetcher.fetchUnitStyle(propertyArg.getName())
        let unitColor = this.realFetcher.fetchUnitColor(propertyArg.getName())
        
        if (prop) {
            propertyArg = <BaseBorderCss>prop
            propertyArg.setActive(true)

            return prop
        } 

        propertyArg.setActive(false)
        let copy = _.cloneDeep(propertyArg)
        propertyArg = copy
        this.setTmpPropertyToModel(copy)
        if (clearWidth) {
            propertyArg.setWidth(Number(clearWidth), unitWidth)
            propertyArg.setType(clearStyle)
            propertyArg.setSecondUnit(unitStyle)
            propertyArg.setColor(clearColor, unitColor)
        } else {
            propertyArg.setWidth(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)
            propertyArg.setType(this.DEFAULT_BORDER_STYLE)
            propertyArg.setColor(this.DEFAULT_BORDER_COLOR, this.DEFAULT_BORDER_COLOR_UNIT)            
        }
        
        return propertyArg
   
    }
    init() {
        this.leftProperty  = this.initProperty(this.leftProperty)
        this.rightProperty = this.initProperty(this.rightProperty)
        this.topProperty = this.initProperty(this.topProperty)
        this.bottomProperty = this.initProperty(this.bottomProperty)
        this.globalProperty = this.initProperty(this.globalProperty)


        this.bottomLeftRadiusProperty = this.initRadiusProperty(this.bottomLeftRadiusProperty)
        this.bottomRightRadiusProperty = this.initRadiusProperty(this.bottomRightRadiusProperty)
        this.topRightRadiusProperty = this.initRadiusProperty(this.topRightRadiusProperty)
        this.topLeftRadiusProperty = this.initRadiusProperty(this.topLeftRadiusProperty)
        this.globalRadiusProperty = this.initRadiusProperty(this.globalRadiusProperty)
    }

    updateDirections() {
        this.globalProperty.setActive(false)
        this.leftProperty.setActive(false)
        this.rightProperty.setActive(false)
        this.topProperty.setActive(false)
        this.bottomProperty.setActive(false)
        
        this.bottomLeftRadiusProperty.setActive(false)
        this.bottomRightRadiusProperty.setActive(false)
        this.topRightRadiusProperty.setActive(false)
        this.topLeftRadiusProperty.setActive(false)
        this.globalRadiusProperty.setActive(false)
        this.init()
    }
    
    setDirectionsPropertiesFromVal(newVal: any, newUnit: Unit) {
        if (!this.value.cssAccessor.hasCssProperty(BorderLeftCss.PROP_NAME)) {
            this.leftProperty.setValue(newVal)
            this.leftProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(BorderRightCss.PROP_NAME)) {
            this.rightProperty.setValue(newVal)
            this.rightProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(BorderTopCss.PROP_NAME)) {
            this.topProperty.setValue(newVal)
            this.topProperty.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(BorderBottomCss.PROP_NAME)) {
            this.bottomProperty.setValue(newVal)
            this.bottomProperty.setUnit(newUnit)
        }
    }
    deactiveGlobalPropCss(prop: BasePropertyCss) {
        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            activeSelector.cssAccessor.removePropWithName(prop.getName())
            activeSelector.synchronize()

        } else {
            this.value.removeCssProperty(prop)
            
        }
        this.value.borderFilter.deactivateProp(prop)

        this.value.recalculateRealComputedProperties()
        // this.value.updateCssPropertyWithoutModel(prop.getName(), prop)

        this.value.notifyPositionalTag()

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return null
    }
    deactivePropCss(prop: BasePropertyCss) {
        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            activeSelector.cssAccessor.removePropWithName(prop.getName())
            activeSelector.synchronize()

        } else {
            this.value.cssAccessor.removePropWithName(prop.getName())  
        }

        if (!this.globalProperty.active) {
            this.value.borderFilter.deactivateProp(prop)
            
        } else {
            this.value.borderFilter.injectCssProperty(this.globalProperty)
        }
        prop.id = null

        this.value.synchronize()
        this.value.recalculateRealComputedProperties()

        this.value.notifyPositionalTag()

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return null
    }
    activePropCss(prop: BasePropertyCss) {
        prop.id = null

        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            if (!activeSelector.cssAccessor.hasCssProperty(prop.getName())) {
                activeSelector.cssAccessor.addNewProperty(prop)
                activeSelector.synchronize()
            }
        } else {
            if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
                this.value.cssAccessor.addNewProperty(prop)
            }
            
        }
        this.value.borderFilter.activateProp(prop)
        console.log('activr');
        
        this.value.synchronize()
        this.value.recalculateRealComputedProperties()

        this.value.notifyPositionalTag()
        

        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)
        return prop
    }
    updateCssProp(newProp: BaseBorderCss) {
        // console.log('ALA MA');
        // console.log(newProp.getUnit());
        // console.log(newProp);
        let val = this.value.getComputedCssVal(newProp)
        let clonedCss: BaseBorderCss = _.cloneDeep(newProp)
        clonedCss.setWidth(parseInt(val), new Pixel())
        // clonedCss.setUnit()
        // console.log(newProp);
        // console.log(val);
        // console.log(clonedCss);
        // console.log('ALA MA');
        var activeSelector = this.value.getSelectedSelector()
        if (activeSelector) {
            activeSelector.updateCssPropertyWithoutModel(newProp.getName(), newProp)
            activeSelector.synchronize()

        } else {
            this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)
        }
        this.value.borderFilter.injectCssProperty(newProp)
        console.log(newProp);
        
        // this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

        this.value.recalculateRealComputedProperties()

        this.value.notifyPositionalTag()
        // this.value.realPositionCalculator.updateProps()


        this.recalculateBorders(this.value)
        this.recalculateMargins(this.value)

        return newProp.getClearValue()
    }

    private recalculateMargins(htmlTag: HtmlTag)
    {
        this.marginRecalculator.recalculate(htmlTag)
            
    }

    private recalculateBorders(htmlTag: HtmlTag)
    {
        this.borderRecalculator.recalculate(htmlTag)
    }


}