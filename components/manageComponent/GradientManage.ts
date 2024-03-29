import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import { BackgroundImage, LinearGradientCss, RadialGradientCss, RepeatingLinearGradientCss, RepeatingRadialGradientCss } from '~/src/Css';
import AbstractManageComponent from './AbstractManageComponent';
import LinearGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/LinearGradientProperty'
import RadialGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/RadialGradientProperty'
import RepeatingLinearGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/RepeatingLinearGradientProperty'
import RepeatingRadialGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/RepeatingRadialGradientProperty'


export default abstract class GradientManage extends AbstractManageComponent
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

    init(val: HtmlTag){
        super.init(val)
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