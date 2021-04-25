import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import TransitionCss from '~/src/Css/Animation/TransitionCss'
import TransitionProperty from '../computedPropertyManagers/impl/ComputedProperty/Animation/TransitionProperty'
import AbstractManageComponent from './AbstractManageComponent';


export default abstract class GradientManage extends AbstractManageComponent
{
    transitionManager: BaseComputedPropertyManager<TransitionCss>

    constructor()
    {
        super()
        this.transitionManager = new TransitionProperty()


    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.transitionManager.setHtmlEl(val)

        this.transitionManager.init()

     
    }
}