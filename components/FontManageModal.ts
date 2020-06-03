import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import Display from '../src/Css/Display/Display';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from './computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import { JustifyContent, AlignItems, FlexDirection, FlexGrow, FlexOrder, FlexShrink, FlexWrap, Float, FontWeight } from '~/src/Css';
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
import TextAlign from '../src/Css/Text/TextAlign';
import FontSize from '../src/Css/Text/FontSize';
import FontColor from '../src/Css/Text/FontColor';
import FontStyle from '../src/Css/Text/FontStyle';
import TextAlignProperty from './computedPropertyManagers/impl/ComputedProperty/Text/TextAlignProperty'
import FontSizeProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontSizeProperty'
import FontColorProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontColorProperty'
import FontWeightProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontWeightProperty'
import FontStyleProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontStyleProperty'
import FontFamily from '~/src/Css/Text/FontFamily'
import FontStretch from '../src/Css/Text/FontStretch';
import LineHeight from '../src/Css/Text/LineHeight';
import LineHeightProperty from './computedPropertyManagers/impl/ComputedProperty/Text/LineHeightProperty'
import FontStretchProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontStretchProperty'
import FontFamilyProperty from './computedPropertyManagers/impl/ComputedProperty/Text/FontFamilyProperty'


export default abstract class FontManageModal extends AbstractModal
{
    textAlignManager: BaseComputedPropertyManager<TextAlign>
    fontSizeManager: BaseComputedPropertyManager<FontSize>
    fontFamilyManager: BaseComputedPropertyManager<FontFamily>
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

    show(val: HtmlTag){
        super.show(val)
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

     
    }
}