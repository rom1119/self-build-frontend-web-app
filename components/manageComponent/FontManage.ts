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


export default abstract class FontManage extends AbstractManageComponent
{
    textAlignManager: BaseComputedPropertyManager<TextAlign>
    fontSizeManager: BaseComputedPropertyManager<FontSize>
    fontFamilyManager: FontFamilyProperty = null
    fontStretchManager: BaseComputedPropertyManager<FontStretch>
    fontColorManager: BaseComputedPropertyManager<FontColor>
    fontWeightManager: BaseComputedPropertyManager<FontWeight>
    fontStyleManager: BaseComputedPropertyManager<FontStyle>
    lineHeightManager: BaseComputedPropertyManager<LineHeight>


    constructor()
    {
        super()
        this.textAlignManager = new TextAlignProperty()
        this.fontSizeManager = new FontSizeProperty()
        this.fontColorManager = new FontColorProperty()
        this.fontWeightManager = new FontWeightProperty()
        this.fontStyleManager = new FontStyleProperty()
        this.fontFamilyManager = new FontFamilyProperty()
        this.fontStretchManager = new FontStretchProperty()
        this.lineHeightManager = new LineHeightProperty()


    }

    init(val: HtmlTag){
        super.init(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher

        this.textAlignManager.setHtmlEl(val)
        this.fontSizeManager.setHtmlEl(val)
        this.fontColorManager.setHtmlEl(val)
        this.fontWeightManager.setHtmlEl(val)
        this.fontStyleManager.setHtmlEl(val)
        this.fontFamilyManager.setHtmlEl(val)
        this.fontStretchManager.setHtmlEl(val)
        this.lineHeightManager.setHtmlEl(val)


        // this.paddingManager.setFetcher(this.paddingRealFetcher)
        // this.marginManager.setFetcher(this.marginRealFetcher)
        // this.borderManager.setFetcher(this.borderRealFetcher)

        this.textAlignManager.init()
        this.fontSizeManager.init()
        this.fontColorManager.init()
        this.fontWeightManager.init()
        this.fontStyleManager.init()
        this.fontFamilyManager.init()
        this.fontStretchManager.init()
        this.lineHeightManager.init()

        this.managers = []
        this.managers.push(this.textAlignManager)
        this.managers.push(this.fontSizeManager)
        this.managers.push(this.fontColorManager)
        this.managers.push(this.fontWeightManager)
        this.managers.push(this.fontStyleManager)
        this.managers.push(this.fontFamilyManager)
        this.managers.push(this.fontStretchManager)
        this.managers.push(this.lineHeightManager)
     
    }
}