import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import AbstractModal from '../AbstractModal'
import BaseComputedPropertyManager from '../computedPropertyManagers/BaseComputedPropertyManager'
import { FontWeight } from '~/src/Css';
import TextAlign from '../../src/Css/Text/TextAlign';
import FontSize from '../../src/Css/Text/FontSize';
import FontColor from '../../src/Css/Text/FontColor';
import FontStyle from '../../src/Css/Text/FontStyle';
import TextAlignProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/TextAlignProperty'
import FontSizeProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontSizeProperty'
import FontColorProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontColorProperty'
import FontWeightProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontWeightProperty'
import FontStyleProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontStyleProperty'
import FontStretch from '../../src/Css/Text/FontStretch';
import LineHeight from '../../src/Css/Text/LineHeight';
import LineHeightProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/LineHeightProperty'
import FontStretchProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontStretchProperty'
import FontFamilyProperty from '../computedPropertyManagers/impl/ComputedProperty/Text/FontFamilyProperty'
import AbstractManageComponent from './AbstractManageComponent';
import TransformStyle from '../../src/Css/ThreeDimensional/TransformStyle';


export default abstract class ThreeDimensionalManage extends AbstractManageComponent
{
    textAlignManager: BaseComputedPropertyManager<TransformStyle>



    constructor()
    {
        super()
        this.textAlignManager = new TextAlignProperty()


    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.textAlignManager.setHtmlEl(val)


        // this.paddingManager.setFetcher(this.paddingRealFetcher)
        // this.marginManager.setFetcher(this.marginRealFetcher)
        // this.borderManager.setFetcher(this.borderRealFetcher)

        this.textAlignManager.init()


     
    }
}