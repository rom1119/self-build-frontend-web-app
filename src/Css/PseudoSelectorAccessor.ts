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
export default abstract class PseudoSelectorAccessor<T extends PseudoSelector> extends SelectorAccessor<T>
{
    
}