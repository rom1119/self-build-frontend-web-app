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
import { Height, MinWidth, MaxWidth, MinHeight, MaxHeight, BorderRadiusBottomLeft, BorderRadiusBottomRight } from '~/src/Css'
import WidthProperty from './computedPropertyManagers/impl/ComputedProperty/Content/WidthProperty'
import HeightProperty from './computedPropertyManagers/impl/ComputedProperty/Content/HeightProperty';
import MinWidthProperty from './computedPropertyManagers/impl/ComputedProperty/Content/MinWidthProperty'
import MaxWidthProperty from './computedPropertyManagers/impl/ComputedProperty/Content/MaxWidthProperty'
import MinHeightProperty from './computedPropertyManagers/impl/ComputedProperty/Content/MinHeightProperty'
import MaxHeightProperty from './computedPropertyManagers/impl/ComputedProperty/Content/MaxHeightProperty'
import BorderRadiusGlobal from '../src/Css/Border/Radius/BorderRadiusGlobal';
import BorderRadiusTopLeft from '../src/Css/Border/Radius/BorderRadiusTopLeft';
import BorderRadiusTopRight from '../src/Css/Border/Radius/BorderRadiusTopRight';
import BorderRadiusGlobalProperty from './computedPropertyManagers/impl/ComputedProperty/BorderRadius/BorderRadiusGlobalProperty'
import BorderRadiusTopLeftProperty from './computedPropertyManagers/impl/ComputedProperty/BorderRadius/BorderRadiusTopLeftProperty'
import BorderRadiusTopRightProperty from './computedPropertyManagers/impl/ComputedProperty/BorderRadius/BorderRadiusTopRightProperty'
import BorderRadiusBottomLeftProperty from './computedPropertyManagers/impl/ComputedProperty/BorderRadius/BorderRadiusBottomLeftProperty'
import BorderRadiusBottomRightProperty from './computedPropertyManagers/impl/ComputedProperty/BorderRadius/BorderRadiusBottomRightProperty'
import BoxSizing from '../src/Css/BoxModel/BoxSizing';
import BoxSizingProperty from './computedPropertyManagers/impl/ComputedProperty/Content/BoxSizingProperty'


export default abstract class BoxModelModal extends AbstractModal
{
    paddingRealFetcher: FetcherRealCssProp
    marginRealFetcher: FetcherRealCssProp
    borderRealFetcher: BorderFetcherRealCssProp

    paddingManager: DirectionComputedPropertyManager
    marginManager: DirectionComputedPropertyManager
    borderManager: BorderComputedPropertyManager

    borderRadiusGlobalManager: BaseComputedPropertyManager<BorderRadiusGlobal>
    borderRadiusTopLeftManager: BaseComputedPropertyManager<BorderRadiusTopLeft>
    borderRadiusTopRightManager: BaseComputedPropertyManager<BorderRadiusTopRight>
    borderRadiusBottomLeftManager: BaseComputedPropertyManager<BorderRadiusBottomLeft>
    borderRadiusBottomRightManager: BaseComputedPropertyManager<BorderRadiusBottomRight>

    minWidthManager: BaseComputedPropertyManager<MinWidth>
    widthManager: BaseComputedPropertyManager<Width>
    maxWidthManager: BaseComputedPropertyManager<MaxWidth>

    minHeightManager: BaseComputedPropertyManager<MinHeight>
    heightManager: BaseComputedPropertyManager<Height>
    maxHeightManager: BaseComputedPropertyManager<MaxHeight>

    boxSizingManager: BaseComputedPropertyManager<BoxSizing>


    constructor()
    {
        super()
        this.paddingManager = new PaddingComputedPropertyManager()
        this.marginManager = new MarginComputedPropertyManager()
        this.borderManager = new BorderComputedPropertyManager()

        this.borderRadiusGlobalManager = new  BorderRadiusGlobalProperty()
        this.borderRadiusTopLeftManager = new  BorderRadiusTopLeftProperty()
        this.borderRadiusTopRightManager = new BorderRadiusTopRightProperty()
        this.borderRadiusBottomLeftManager = new BorderRadiusBottomLeftProperty()
        this.borderRadiusBottomRightManager = new  BorderRadiusBottomRightProperty()

        this.minWidthManager = new MinWidthProperty()
        this.widthManager = new WidthProperty()
        this.maxWidthManager = new MaxWidthProperty()

        this.minHeightManager = new MinHeightProperty()
        this.heightManager = new HeightProperty()
        this.maxHeightManager = new MaxHeightProperty()

        this.boxSizingManager = new BoxSizingProperty()

    }

    show(val: HtmlTag){
        super.show(val)
        this.paddingRealFetcher = this.value.paddingRealFetcher
        this.marginRealFetcher = this.value.marginRealFetcher
        this.borderRealFetcher = this.value.borderRealFetcher

        this.borderRadiusGlobalManager.setHtmlEl(val)
        this.borderRadiusTopLeftManager.setHtmlEl(val)
        this.borderRadiusTopRightManager.setHtmlEl(val)
        this.borderRadiusBottomLeftManager.setHtmlEl(val)
        this.borderRadiusBottomRightManager.setHtmlEl(val)

        this.paddingManager.setHtmlEl(val)
        this.marginManager.setHtmlEl(val)
        this.borderManager.setHtmlEl(val)

        this.widthManager.setHtmlEl(val)
        this.minWidthManager.setHtmlEl(val)
        this.maxWidthManager.setHtmlEl(val)
        this.heightManager.setHtmlEl(val)
        this.minHeightManager.setHtmlEl(val)
        this.maxHeightManager.setHtmlEl(val)

        this.boxSizingManager.setHtmlEl(val)

        this.paddingManager.setFetcher(this.paddingRealFetcher)
        this.marginManager.setFetcher(this.marginRealFetcher)
        this.borderManager.setFetcher(this.borderRealFetcher)


        this.managers = []

        this.managers.push(this.borderRadiusGlobalManager)
        this.managers.push(this.borderRadiusTopLeftManager)
        this.managers.push(this.borderRadiusTopRightManager)
        this.managers.push(this.borderRadiusBottomLeftManager)
        this.managers.push(this.borderRadiusBottomRightManager)

        this.managers.push(this.borderManager)
        this.managers.push(this.marginManager)
        
        this.managers.push(this.widthManager)
        this.managers.push(this.minWidthManager)
        this.managers.push(this.maxWidthManager)
        this.managers.push(this.heightManager)
        this.managers.push(this.minHeightManager)
        this.managers.push(this.maxHeightManager)

        this.managers.push(this.boxSizingManager)
        

        this.initPaddings()
        this.initMargins()
        this.initBorders()

        this.borderRadiusGlobalManager.init()
        this.borderRadiusTopLeftManager.init()
        this.borderRadiusTopRightManager.init()
        this.borderRadiusBottomLeftManager.init()
        this.borderRadiusBottomRightManager.init()

        this.minWidthManager.init()
        this.widthManager.init()
        this.maxWidthManager.init()

        this.minHeightManager.init()
        this.heightManager.init()
        this.maxHeightManager.init()

        this.boxSizingManager.init()
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