import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import Display from '../src/Css/Display/Display';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from './computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import { JustifyContent, AlignItems, FlexDirection, FlexGrow, FlexOrder, FlexShrink, FlexWrap, Float } from '~/src/Css';
import FlexBasis from '../src/Css/Display/FlexBasis';
import Clear from '../src/Css/Display/Clear';
import ClearProperty from './computedPropertyManagers/impl/ComputedProperty/Display/ClearProperty'
import FloatProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FloatProperty'
import FlexWrapProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexWrapProperty'
import FlexShrinkProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexShrinkProperty'
import FlexOrderProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexOrderProperty'
import FlexGrowProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexGrowProperty'
import FlexDirectionProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexDirectionProperty'
import FlexBasisProperty from './computedPropertyManagers/impl/ComputedProperty/Display/FlexBasisProperty'
import AlignItemsProperty from './computedPropertyManagers/impl/ComputedProperty/Display/AlignItemsProperty'
import JustifyContentProperty from './computedPropertyManagers/impl/ComputedProperty/Display/JustifyContentProperty'


export default abstract class DisplayManageModal extends AbstractModal
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

    }

    show(val: HtmlTag){
        super.show(val)
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
     
    }
}