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
import BaseMarginCss from '~/src/Css/BoxModel/BaseMarginCss'
import MarginLeftCss from '~/src/Css/BoxModel/Margin/MarginLeftCss'
import MarginRightCss from '~/src/Css/BoxModel/Margin/MarginRightCss'
import MarginTopCss from '~/src/Css/BoxModel/Margin/MarginTopCss'
import MarginBottomCss from '~/src/Css/BoxModel/Margin/MarginBottomCss'
import MarginCss from '~/src/Css/BoxModel/Margin/MarginCss'
import DirectionComputedPropertyManager from './computedPropertyManagers/DirectionComputedPropertyManager'
import PaddingComputedPropertyManager from './computedPropertyManagers/impl/PaddingComputedPropertyManager';
import MarginComputedPropertyManager from './computedPropertyManagers/impl/MarginComputedPropertyManager'
import BorderComputedPropertyManager from './computedPropertyManagers/impl/BorderComputedPropertyManager'
import BaseBorderCss from '~/src/Css/Border/BaseBorderCss'
import BorderFetcherRealCssProp from '~/src/BorderFetcherRealCssProp'
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import Width from '../src/Css/Size/Width';
import { Height } from '~/src/Css'
import WidthProperty from './computedPropertyManagers/impl/ComputedProperty/Content/WidthProperty'
import HeightProperty from './computedPropertyManagers/impl/ComputedProperty/Content/HeightProperty';


export default abstract class BoxModelModal extends AbstractModal
{
    paddingRealFetcher: FetcherRealCssProp
    marginRealFetcher: FetcherRealCssProp
    borderRealFetcher: BorderFetcherRealCssProp

    paddingManager: DirectionComputedPropertyManager
    marginManager: DirectionComputedPropertyManager
    borderManager: BorderComputedPropertyManager

    widthManager: BaseComputedPropertyManager<Width>
    heightManager: BaseComputedPropertyManager<Height>


    constructor()
    {
        super()
        this.paddingManager = new PaddingComputedPropertyManager()
        this.marginManager = new MarginComputedPropertyManager()
        this.borderManager = new BorderComputedPropertyManager()
        this.widthManager = new WidthProperty()
        this.heightManager = new HeightProperty()

    }

    show(val: HtmlTag){
        super.show(val)
        this.paddingRealFetcher = this.value.paddingRealFetcher
        this.marginRealFetcher = this.value.marginRealFetcher
        this.borderRealFetcher = this.value.borderRealFetcher

        this.paddingManager.setHtmlEl(val)
        this.marginManager.setHtmlEl(val)
        this.borderManager.setHtmlEl(val)
        this.widthManager.setHtmlEl(val)
        this.heightManager.setHtmlEl(val)

        this.paddingManager.setFetcher(this.paddingRealFetcher)
        this.marginManager.setFetcher(this.marginRealFetcher)
        this.borderManager.setFetcher(this.borderRealFetcher)

        this.initPaddings()
        this.initMargins()
        this.initBorders()

        this.widthManager.init()
        this.heightManager.init()
    }

    // PADDING METHODS
    updateDirectionsPaddings()
    {
        this.paddingManager.updateDirections()
    }

    initPaddings()
    {   
        this.paddingManager.init()   
    }

    setDirectionsPaddingsFromVal(newVal, newUnit: UnitSize)
    {
        this.paddingManager.setDirectionsPropertiesFromVal(newVal, newUnit)
    }

    deactiveGlobalPaddingProp(prop: BasePaddingCss): any {
        this.paddingManager.deactiveGlobalPropCss(prop)
    }
    
    deactivePaddingProp(prop: BasePaddingCss): any {
        this.paddingManager.deactivePropCss(prop)
    }

    activePaddingProp(prop: BasePaddingCss): any {
        this.paddingManager.activePropCss(prop)
    }

    updateCssPropWithPaddingFilter(prop: BasePropertyCss)
    {
        this.paddingManager.updateCssProp(prop)
    }

    // BORDERS METHODS
    updateDirectionsBorders()
    {
        this.borderManager.updateDirections()
    }

    initBorders()
    {   
        this.borderManager.init()   
    }

    setDirectionsBordersFromVal(newVal, newUnit: UnitSize)
    {
        this.borderManager.setDirectionsPropertiesFromVal(newVal, newUnit)
    }

    deactiveGlobalBorderProp(prop: BaseBorderCss): any {
        this.borderManager.deactiveGlobalPropCss(prop)
    }
    
    deactiveBorderProp(prop: BaseBorderCss): any {
        this.borderManager.deactivePropCss(prop)
    }

    activeBorderProp(prop: BaseBorderCss): any {
        this.borderManager.activePropCss(prop)
    }

    updateCssPropWithBorderFilter(prop: BaseBorderCss)
    {
        this.borderManager.updateCssProp(prop)
    }

    // MARGIN METHODS

    updateDirectionsMargins()
    {
        this.marginManager.updateDirections()
    }

    initMargins()
    {   
        this.marginManager.init()   
    }

    setDirectionsMarginsFromVal(newVal, newUnit: UnitSize)
    {
        this.marginManager.setDirectionsPropertiesFromVal(newVal, newUnit)
    }

    deactiveGlobalMarginProp(prop: BaseMarginCss): any {
        this.marginManager.deactiveGlobalPropCss(prop)
    }
    
    deactiveMarginProp(prop: BaseMarginCss): any {
        this.marginManager.deactivePropCss(prop)
    }

    activeMarginProp(prop: BaseMarginCss): any {
        this.marginManager.activePropCss(prop)
    }

    updateCssPropWithMarginFilter(prop: BasePropertyCss)
    {
        this.marginManager.updateCssProp(prop)
    }


    
}