import HtmlTag from '../Layout/HtmlTag';
import BasePropertyCss from './BasePropertyCss';
import CssPropNotFound from '../Errors/CssPropNotFound';
import CssComposite from './CssComposite';
import Unit from '../Unit/Unit';
import LayoutEl from '../LayoutEl';
import Vue from 'vue';
import { PositionCss } from '.';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import PseudoSelectorNotFound from '../Errors/PseudoSelectorNotFound';
import SelectorAccessor from './SelectorAccessor';
import PseudoSelectorAccessor from './PseudoSelectorAccessor';
import BaseMediaQueryCss from '../MediaQuery/BaseMediaQueryCss';
import SelectorOwner from '../SelectorOwner';
export default class MediaQueryPseudoSelectorAccessor<T extends PseudoSelector> extends PseudoSelectorAccessor<T>
{
    mediaQuery: BaseMediaQueryCss = null

    constructor(val: SelectorOwner, mediaQuery: BaseMediaQueryCss) {
        super(val)
        this.mediaQuery = mediaQuery
    }


}