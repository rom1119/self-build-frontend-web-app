import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import MoveEventController from '~/src/MoveEventController'
import DefaultMoveEventController from '../src/Controller/DefaultMoveEventController';
import UnitSize from '~/src/Unit/UnitSize'
import Unit from '../src/Unit/Unit';
import AbstractModal from './AbstractModal'
import Pixel from '~/src/Unit/Size/Pixel'
import BasePaddingCss from '~/src/Css/BoxModel/BasePaddingCss'
import PaddingLeftCss from '~/src/Css/BoxModel/Padding/PaddingLeftCss'
import PaddingCss from '~/src/Css/BoxModel/Padding/PaddingCss'
import FetcherRealCssProp from '~/src/FetcherRealCssProp'
import PaddingRightCss from '~/src/Css/BoxModel/Padding/PaddingRightCss'
import PaddingTopCss from '~/src/Css/BoxModel/Padding/PaddingTopCss'
import PaddingBottomCss from '~/src/Css/BoxModel/Padding/PaddingBottomCss'


export default abstract class BoxModelModal extends AbstractModal
{

    DEFAULT_PADDING = 0
    DEFAULT_PADDING_UNIT = new Pixel()
    
    paddingLeftData: BasePaddingCss = new PaddingLeftCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    paddingRightData: BasePaddingCss = new PaddingRightCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    paddingTopData: BasePaddingCss = new PaddingTopCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    paddingBottomData: BasePaddingCss = new PaddingBottomCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    paddingGlobalData: BasePaddingCss = new PaddingCss(this.DEFAULT_PADDING, this.DEFAULT_PADDING_UNIT)
    paddingRealFetcher: FetcherRealCssProp

    constructor()
    {
        super()
        this.paddingGlobalData.setActive(false)
        this.paddingLeftData.setActive(false)
        this.paddingRightData.setActive(false)
        this.paddingTopData.setActive(false)
        this.paddingBottomData.setActive(false)

    }

    show(val: HtmlTag){
        super.show(val)
        this.paddingRealFetcher = this.value.paddingRealFetcher
        this.initPaddings()
    }

    updateDirectionsPaddings()
    {
        this.paddingGlobalData.setActive(false)
        this.paddingLeftData.setActive(false)
        this.paddingRightData.setActive(false)
        this.paddingTopData.setActive(false)
        this.paddingBottomData.setActive(false)
        this.initPaddings()
    }

    initPaddings()
    {   
        var propLeft = this.getPropertyCssFromModel(this.paddingLeftData.getName())
        let valLeft = this.paddingRealFetcher.fetchPropValue(this.paddingLeftData.getName())
        let unitLeft = this.paddingRealFetcher.fetchUnit(this.paddingLeftData.getName())
        
        if (propLeft) {
            this.paddingLeftData = <BasePaddingCss>propLeft
            this.paddingLeftData.setActive(true)
        } else {
            if (valLeft) {
                // this.paddingLeftData.setActive(true)
                this.paddingLeftData.setValue(valLeft)
            }  
            if (unitLeft) {
                this.paddingLeftData.setUnit(unitLeft)
            }
            this.setTmpPropertyToModel(this.paddingLeftData)
        }

        var propRight = this.getPropertyCssFromModel(this.paddingRightData.getName())
        let valRight = this.paddingRealFetcher.fetchPropValue(this.paddingRightData.getName())
        let unitRight = this.paddingRealFetcher.fetchUnit(this.paddingRightData.getName())
        
        if (propRight) {
            this.paddingRightData = <BasePaddingCss>propRight
            this.paddingRightData.setActive(true)
        } else {
            if (valRight) {
                this.paddingRightData.setValue(valRight)
            }  
            if (unitRight) {
                this.paddingRightData.setUnit(unitRight)
            }
            this.setTmpPropertyToModel(this.paddingRightData)
        }
        
        var propTop = this.getPropertyCssFromModel(this.paddingTopData.getName())
        let valTop = this.paddingRealFetcher.fetchPropValue(this.paddingTopData.getName())
        let unitTop = this.paddingRealFetcher.fetchUnit(this.paddingTopData.getName())
        
        if (propTop) {
            this.paddingTopData = <BasePaddingCss>propTop
            this.paddingTopData.setActive(true)
        } else {
            if (valTop) {
                this.paddingTopData.setValue(valTop)
            }  
            if (unitTop) {
                this.paddingTopData.setUnit(unitTop)
            }
            this.setTmpPropertyToModel(this.paddingTopData)
        }
        
        var propGlobal = this.getPropertyCssFromModel(this.paddingBottomData.getName())
        let valBottom = this.paddingRealFetcher.fetchPropValue(this.paddingBottomData.getName())
        let unitBottom = this.paddingRealFetcher.fetchUnit(this.paddingBottomData.getName())
        
        if (propGlobal) {
            this.paddingBottomData = <BasePaddingCss>propGlobal
            this.paddingBottomData.setActive(true)
        } else {
            if (valBottom) {
                this.paddingBottomData.setValue(valBottom)
            }  
            if (unitBottom) {
                this.paddingBottomData.setUnit(unitBottom)
            }
            this.setTmpPropertyToModel(this.paddingBottomData)

        }
        
        var propGlobal = this.getPropertyCssFromModel(this.paddingGlobalData.getName())
        let valGlobal = this.paddingRealFetcher.fetchPropValue(this.paddingGlobalData.getName())
        let unitGlobal = this.paddingRealFetcher.fetchUnit(this.paddingGlobalData.getName())
        
        if (propGlobal) {
            this.paddingGlobalData = <BasePaddingCss>propGlobal
            this.paddingGlobalData.setActive(true)
        } else {
            if (valGlobal) {
                this.paddingGlobalData.setValue(valGlobal)
            }  
            if (unitGlobal) {
                this.paddingGlobalData.setUnit(unitGlobal)
            }
        }
        
        
    }

    private initPadding(propData: BasePaddingCss)
    {
        var prop = this.getPropertyCssFromModel(propData.getName())
        let val = this.paddingRealFetcher.fetchPropValue(propData.getName())
        let unit = this.paddingRealFetcher.fetchUnit(propData.getName())
        // console.log('START');
        // console.log(propData);
        // console.log(prop);
        // console.log(val);
        // console.log(unit);
        // console.log('END');
        
        if (prop) {
            propData = <BasePaddingCss>prop
            propData.setActive(true)
        } else {
            if (val) {
                propData.setActive(true)
                propData.setValue(val)
            }  
            if (unit) {
                propData.setUnit(unit)
    
            }

        }
    }

    setDirectionsPaddingsFromVal(newVal, newUnit: UnitSize)
    {
        if (!this.value.cssAccessor.hasCssProperty(PaddingLeftCss.PROP_NAME)) {
            this.paddingLeftData.setValue(newVal)
            this.paddingLeftData.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingRightCss.PROP_NAME)) {
            this.paddingRightData.setValue(newVal)
            this.paddingRightData.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingTopCss.PROP_NAME)) {
            this.paddingTopData.setValue(newVal)
            this.paddingTopData.setUnit(newUnit)
        }
        if (!this.value.cssAccessor.hasCssProperty(PaddingBottomCss.PROP_NAME)) {
            this.paddingBottomData.setValue(newVal)
            this.paddingBottomData.setUnit(newUnit)
        }
    }

    deactiveGlobalPaddingProp(prop: BasePaddingCss): any {
        this.value.cssAccessor.removePropWithName(prop.getName())
        this.value.paddingFilter.deactivateProp(prop)
        return null
    }
    
    deactivePaddingProp(prop: BasePaddingCss): any {
        this.value.cssAccessor.removePropWithName(prop.getName())
        if (!this.paddingGlobalData.active) {
            this.value.paddingFilter.deactivateProp(prop)

        } else {
            
            prop.setValue(this.paddingGlobalData.getClearValue())
            prop.setUnit(this.paddingGlobalData.getUnit())
            this.value.paddingFilter.injectCssProperty(this.paddingGlobalData)
        }
        return null
    }

    activePaddingProp(prop: BasePaddingCss): any {
        if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
            this.value.cssAccessor.addNewProperty(prop)

        }
        console.log('activr');
        
        this.value.paddingFilter.activateProp(prop)
        return prop
    }

    updateCssPropWithPadingFilter(newProp: BasePropertyCss)
    {
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

        return newProp.getClearValue()
    }


    
}