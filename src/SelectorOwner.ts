import CssPropertyAccessor from "./Css/CssPropertyAccessor"
import PseudoSelectorSynchronizer from "./Synchronizer/Impl/PseudoSelectorSynchronizer"
import ApiService from "./Api/ApiService"
import BasePropertyCss from './Css/BasePropertyCss';
import HtmlTag from "./Layout/HtmlTag"
import PseudoSelector from "./PseudoSelector/PseudoSelector"
import UnitSize from "./Unit/UnitSize"
import { Pixel } from "./Unit"
import { PositionCss, Width, Height } from "./Css"
import BasePaddingCss from "./Css/BoxModel/BasePaddingCss"
import BaseBorderCss from "./Css/Border/BaseBorderCss"
import ContentSizeCss from "./Css/Size/ContentSizeCss"
import BaseMarginCss from "./Css/BoxModel/BaseMarginCss"
import PaddingFilterCssInjector from './FilterCssInjector/PaddingFilterCssInjector';
import MarginFilterCssInjector from "./FilterCssInjector/MarginFilterCssInjector"
import BorderFilterCssInjector from "./FilterCssInjector/BorderFilterCssInjector"
import FilterCssInjector from "./FilterCssInjector"
import RealPositionCalculator from "./PositionCss/RealPositionCalculator";
import { VueFixStyleListTransform } from "./Vue/VueFixStyleListTransform";
import Synchronizer from './Synchronizer/Synchronizer';

export default interface SelectorOwner
{
    uuid: string

    hasAbsolute: boolean
    hasFixed: boolean
    
    paddingFilter: FilterCssInjector
    marginFilter: FilterCssInjector
    borderFilter: FilterCssInjector
    contentFilter: FilterCssInjector

    realPositionCalculator: RealPositionCalculator
    transformStyleList: VueFixStyleListTransform
    api: ApiService
    synchronizer: Synchronizer

    canAddToCssList(prop: BasePropertyCss): boolean
    isLikeBackgroundCss(prop: BasePropertyCss): boolean
    notifyPositionalTag()
}