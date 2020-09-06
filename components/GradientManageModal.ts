import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import Display from '../src/Css/Display/Display';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from './computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import { JustifyContent, AlignItems, FlexDirection, FlexGrow, FlexOrder, FlexShrink, FlexWrap, Float, BoxShadowCss, BackgroundImage } from '~/src/Css';
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
import LinearGradientCss from '../src/Css/Gradient/impl/LinearGradientCss';
import LinearGradientProperty from './computedPropertyManagers/impl/ComputedProperty/Gradient/LinearGradientProperty'
import RadialGradientCss from '~/src/Css/Gradient/impl/RadialGradientCss'
import RadialGradientProperty from './computedPropertyManagers/impl/ComputedProperty/Gradient/RadialGradientProperty'
import RepeatingLinearGradientCss from '~/src/Css/Gradient/impl/RepeatingLinearGradientCss'
import RepeatingRadialGradientCss from '~/src/Css/Gradient/impl/RepeatingRadialGradientCss'
import RepeatingLinearGradientProperty from './computedPropertyManagers/impl/ComputedProperty/Gradient/RepeatingLinearGradientProperty'
import RepeatingRadialGradientProperty from './computedPropertyManagers/impl/ComputedProperty/Gradient/RepeatingRadialGradientProperty'
import BaseGradientCss from '../src/Css/Gradient/BaseGradientCss';
import BaseGradientPropertyManager from './computedPropertyManagers/impl/ComputedProperty/Gradient/BaseGradientPropertyManager';


export default abstract class GradientManageModal extends AbstractModal
{
    linearGradientManager: BaseComputedPropertyManager<LinearGradientCss>
    radialGradientManager: BaseComputedPropertyManager<RadialGradientCss>

    // linearGradientManagers: BaseComputedPropertyManager<LinearGradientCss>[] = []
    // radialGradientManagers: BaseComputedPropertyManager<RadialGradientCss>[] = []

    hasGradientActive = false
    currentGradientData: any = ''
    isLinear = false        


    constructor()
    {
        super()
        this.linearGradientManager = new LinearGradientProperty()
        this.radialGradientManager = new RadialGradientProperty()


    }

    show(val: HtmlTag){
        super.show(val)
        this.hasGradientActive = false
        this.currentGradientData = ''
        this.isLinear = false   
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher
        this.managers = []
        // this.linearGradientManagers = []
        // this.radialGradientManagers = []
        var background = <BackgroundImage>this.getPropertyCssFromModel(BackgroundImage.PROP_NAME)

        if (!background) {
            this.initDefaultGradients()
            
        } else {
            if (background.getGradients().length > 0) {
                this.currentGradientData = background.getGradients()[0].getName()

                if (background.getGradients()[0] instanceof LinearGradientCss) {
                    this.isLinear = true

                } else {
                    this.isLinear = false

                }
                for (const gradient of background.getGradients()) {
                    var manager = this.createPropertyManagerFromName(gradient.getName())
                    
                    // @ts-ignore
                    manager.property = gradient
                    this.managers.push(manager)
                    manager.setHtmlEl(this.value)
                    // manager.init()
                }
                this.hasGradientActive = true

            } else {
                this.initDefaultGradients()
            }
        }

     
    }

    createPropertyManagerFromName(name)
    {
        switch (name) {
            case LinearGradientCss.PROP_NAME:
                return new LinearGradientProperty()
            case RepeatingLinearGradientCss.PROP_NAME:
                return new RepeatingLinearGradientProperty()
            case RadialGradientCss.PROP_NAME:
                return new RadialGradientProperty()
            case RepeatingRadialGradientCss.PROP_NAME:
                return new RepeatingRadialGradientProperty()
        }
    }

    initDefaultGradients()
    {

        this.linearGradientManager = new LinearGradientProperty()
        this.radialGradientManager = new RadialGradientProperty()

        this.linearGradientManager.setHtmlEl(this.value)
        this.radialGradientManager.setHtmlEl(this.value)

        

        this.managers.push(this.linearGradientManager)
        // this.managers.push(this.radialGradientManager)
        
        
        // this.linearGradientManagers.push(this.linearGradientManager)
        // this.radialGradientManagers.push(this.radialGradientManager)

        this.linearGradientManager.init()
        this.radialGradientManager.init()

        this.currentGradientData = LinearGradientCss.PROP_NAME
        this.isLinear = true

    }
}