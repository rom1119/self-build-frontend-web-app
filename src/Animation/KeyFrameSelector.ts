import KeyFrameCssAccessor from "../Css/PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../BaseSelector';
import PseudoSelectorCssAccessor from "../Css/PropertyAccessor/PseudoSelectorCssAccessor";
import SelectorOwner from '../SelectorOwner';
import HtmlTag from '../Layout/HtmlTag';

export default abstract class KeyFrameSelector extends BaseSelector
{
    constructor()
    {
        super(null)
        
    }

    public init(owner: HtmlTag)
    {
        this._cssPropertyAccesor = new KeyFrameCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new KeyFrameCssAccessor(owner, this)
    }

    public setOwner(tag: SelectorOwner) {
        this._owner = tag

        this.init(<HtmlTag><unknown>tag)
    }
}