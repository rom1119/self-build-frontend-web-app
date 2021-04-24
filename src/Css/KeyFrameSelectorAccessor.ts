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
import KeyFrameSelector from '../Animation/KeyFrameSelector';
import PercentKeyFrameSelector from '../Animation/keyFrameSelectors/PercentKeyFrameSelector';
import FromKeyFrameSelector from '../Animation/keyFrameSelectors/FromKeyFrameSelector';
import ToKeyFrameSelector from '../Animation/keyFrameSelectors/ToKeyFrameSelector';
export default class KeyFrameSelectorAccessor extends SelectorAccessor<KeyFrameSelector>
{
    
    public addNewSelector(newProp: KeyFrameSelector): SelectorAccessor<KeyFrameSelector>{

        newProp.setApi(this.tag.api)
        var hasPercent = false
        for (const sel of this.selectors) {
            if (sel instanceof PercentKeyFrameSelector) {
                hasPercent = true
                break
            }
        }

        if (hasPercent) {

            if (newProp instanceof FromKeyFrameSelector || newProp instanceof ToKeyFrameSelector) {
                throw new Error('Can not add ' + newProp.getName() + ' selector to percentage animation')
            }
        }

        Vue.set(this.selectors, this.selectors.length, newProp)
        // console.log(this.cssProps);
        
        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }
}