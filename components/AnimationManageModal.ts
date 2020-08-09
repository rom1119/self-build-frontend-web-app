import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import Display from '../src/Css/Display/Display';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from './computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import { JustifyContent, AlignItems, FlexDirection, FlexGrow, FlexOrder, FlexShrink, FlexWrap, Float, BoxShadowCss } from '~/src/Css';
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
import TextShadowCss from '../src/Css/Shadow/TextShadowCss';
import TextShadowProperty from './computedPropertyManagers/impl/ComputedProperty/Shadow/TextShadowProperty';
import BoxShadowProperty from './computedPropertyManagers/impl/ComputedProperty/Shadow/BoxShadowProperty'
import TransitionCss from '~/src/Css/Animation/TransitionCss'
import TransitionProperty from './computedPropertyManagers/impl/ComputedProperty/Animation/TransitionProperty'


export default abstract class AnimationManageModal extends AbstractModal
{
    transitionManager: BaseComputedPropertyManager<TransitionCss>

    constructor()
    {
        super()
        this.transitionManager = new TransitionProperty()


    }

    show(val: HtmlTag){
        super.show(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.transitionManager.setHtmlEl(val)

        this.transitionManager.init()

     
    }
}