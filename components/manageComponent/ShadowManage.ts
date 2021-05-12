import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import { BoxShadowCss } from '~/src/Css';
import TextShadowCss from '../../src/Css/Shadow/TextShadowCss';
import TextShadowProperty from '../computedPropertyManagers/impl/ComputedProperty/Shadow/TextShadowProperty';
import BoxShadowProperty from '../computedPropertyManagers/impl/ComputedProperty/Shadow/BoxShadowProperty'
import AbstractManageComponent from './AbstractManageComponent';


export default abstract class ShadowManage extends AbstractManageComponent
{
    textShadowManager: BaseComputedPropertyManager<TextShadowCss>
    boxShadowManager: BaseComputedPropertyManager<BoxShadowCss>

    constructor()
    {
        super()
        this.textShadowManager = new TextShadowProperty()
        this.boxShadowManager = new BoxShadowProperty()


    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.textShadowManager.setHtmlEl(val)
        this.boxShadowManager.setHtmlEl(val)

        this.textShadowManager.init()
        this.boxShadowManager.init()

        this.managers = []
        this.managers.push(this.textShadowManager)
        this.managers.push(this.boxShadowManager)

     
    }
}