import KeyFrameCssAccessor from "../Css/PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../BaseSelector';
import PseudoSelectorCssAccessor from "../Css/PropertyAccessor/PseudoSelectorCssAccessor";
import SelectorOwner from '../SelectorOwner';
import HtmlTag from '../Layout/HtmlTag';
import KeyFrame from './KeyFrame';
import SelectorApiService from '../Api/SelectorApiService';
import PseudoSelectorSynchronizer from '../Synchronizer/Impl/PseudoSelectorSynchronizer';

export default abstract class KeyFrameSelector extends BaseSelector
{
    constructor()
    {
        super(null)
        
    }

    public abstract getValue()

    protected initCss(owner: KeyFrame) {
        this._cssPropertyAccesor = new KeyFrameCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new KeyFrameCssAccessor(owner, this)
    }

    public init(owner: KeyFrame)
    {
        this.setApi(owner.api)
        this._owner = <SelectorOwner><unknown>owner
        this.initCss(<KeyFrame><unknown>owner)

    }

    public setOwner(tag: SelectorOwner) {
        this._owner = tag

        this.init(<KeyFrame><unknown>tag)
    }

    public setApi(api: SelectorApiService)
    {
        this.api = api
        this.synchronizer = new KeyFrameSelectorSynchronizer(this, api)
    }
}