import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import Display from '../../src/Css/Display/Display';
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import { JustifyContent, AlignItems, FlexDirection, FlexGrow, FlexOrder, FlexShrink, FlexWrap, Float, BorderCollapse, BorderSpacing, BottomCss, LeftCss, PositionCss, RightCss, TopCss } from '~/src/Css';
import FlexBasis from '../../src/Css/Display/FlexBasis';
import Clear from '../../src/Css/Display/Clear';
import ClearProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/ClearProperty'
import FloatProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FloatProperty'
import FlexWrapProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexWrapProperty'
import FlexShrinkProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexShrinkProperty'
import FlexOrderProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexOrderProperty'
import FlexGrowProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexGrowProperty'
import FlexDirectionProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexDirectionProperty'
import FlexBasisProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/FlexBasisProperty'
import AlignItemsProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/AlignItemsProperty'
import JustifyContentProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/JustifyContentProperty'
import AbstractManageComponent from './AbstractManageComponent';
import BottomProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/BottomProperty'
import LeftProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/LeftProperty'
import PositionProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/PositionProperty'
import RightProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/RightProperty'
import TopProperty from '../computedPropertyManagers/impl/ComputedProperty/Display/TopProperty'
import BorderCollapseProperty from '../computedPropertyManagers/impl/ComputedProperty/Table/BorderCollapseProperty'
import BorderSpacingProperty from '../computedPropertyManagers/impl/ComputedProperty/Table/BorderSpacingProperty'


export default abstract class DisplayManage extends AbstractManageComponent
{
    displayManager: BaseComputedPropertyManager<Display>
    justifyContentManager: BaseComputedPropertyManager<JustifyContent>
    alignItemsManager: BaseComputedPropertyManager<AlignItems>
    flexBasisManager: BaseComputedPropertyManager<FlexBasis>
    flexDirectionManager: BaseComputedPropertyManager<FlexDirection>
    flexGrowManager: BaseComputedPropertyManager<FlexGrow>
    flexOrderManager: BaseComputedPropertyManager<FlexOrder>
    flexShrinkManager: BaseComputedPropertyManager<FlexShrink>
    flexWrapManager: BaseComputedPropertyManager<FlexWrap>
    floatManager: BaseComputedPropertyManager<Float>
    clearManager: BaseComputedPropertyManager<Clear>

    positionManager: BaseComputedPropertyManager<PositionCss>
    leftManager: BaseComputedPropertyManager<LeftCss>
    rightManager: BaseComputedPropertyManager<RightCss>
    topManager: BaseComputedPropertyManager<TopCss>
    bottomManager: BaseComputedPropertyManager<BottomCss>

    borderSpacingManager: BaseComputedPropertyManager<BorderSpacing>
    borderCollapseManager: BaseComputedPropertyManager<BorderCollapse>

    constructor()
    {
        super()
        this.displayManager = new DisplayProperty()
        this.justifyContentManager = new JustifyContentProperty()
        this.alignItemsManager = new AlignItemsProperty()
        this.flexBasisManager = new FlexBasisProperty()
        this.flexDirectionManager = new FlexDirectionProperty()
        this.flexGrowManager = new FlexGrowProperty()
        this.flexOrderManager = new FlexOrderProperty()
        this.flexShrinkManager = new FlexShrinkProperty()
        this.flexWrapManager = new FlexWrapProperty()
        this.floatManager = new FloatProperty()
        this.clearManager = new ClearProperty()

        this.positionManager = new PositionProperty()
        this.leftManager = new LeftProperty()
        this.rightManager = new RightProperty()
        this.topManager = new TopProperty()
        this.bottomManager = new BottomProperty()

        this.borderSpacingManager = new BorderSpacingProperty()
        this.borderCollapseManager = new BorderCollapseProperty()
 

    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.displayManager.setHtmlEl(val)
        this.justifyContentManager.setHtmlEl(val)
        this.alignItemsManager.setHtmlEl(val)
        this.flexBasisManager.setHtmlEl(val)
        this.flexDirectionManager.setHtmlEl(val)
        this.flexGrowManager.setHtmlEl(val)
        this.flexOrderManager.setHtmlEl(val)
        this.flexShrinkManager.setHtmlEl(val)
        this.flexWrapManager.setHtmlEl(val)
        this.floatManager.setHtmlEl(val)
        this.clearManager.setHtmlEl(val)

        this.positionManager.setHtmlEl(val)
        this.leftManager.setHtmlEl(val)
        this.rightManager.setHtmlEl(val)
        this.topManager.setHtmlEl(val)
        this.bottomManager.setHtmlEl(val)

        this.borderSpacingManager.setHtmlEl(val)
        this.borderCollapseManager.setHtmlEl(val)

        this.managers = []

        this.managers.push(this.displayManager)
        this.managers.push(this.justifyContentManager)
        this.managers.push(this.alignItemsManager)
        this.managers.push(this.flexBasisManager)
        this.managers.push(this.flexDirectionManager)
        this.managers.push(this.flexGrowManager)
        this.managers.push(this.flexOrderManager)
        this.managers.push(this.flexShrinkManager)
        this.managers.push(this.flexWrapManager)
        this.managers.push(this.floatManager)
        this.managers.push(this.clearManager)

        this.managers.push(this.positionManager)
        this.managers.push(this.leftManager)
        this.managers.push(this.rightManager)
        this.managers.push(this.topManager)
        this.managers.push(this.bottomManager)

        this.managers.push(this.borderSpacingManager)
        this.managers.push(this.borderCollapseManager)

        // this.paddingManager.setFetcher(this.paddingRealFetcher)
        // this.marginManager.setFetcher(this.marginRealFetcher)
        // this.borderManager.setFetcher(this.borderRealFetcher)

        this.displayManager.init()
        this.justifyContentManager.init()
        this.alignItemsManager.init()
        this.flexBasisManager.init()
        this.flexDirectionManager.init()
        this.flexGrowManager.init()
        this.flexOrderManager.init()
        this.flexShrinkManager.init()
        this.flexWrapManager.init()
        this.floatManager.init()
        this.clearManager.init()

        this.positionManager.init()
        this.leftManager.init()
        this.rightManager.init()
        this.topManager.init()
        this.bottomManager.init()

        this.borderSpacingManager.init()
        this.borderCollapseManager.init()
     
    }
}