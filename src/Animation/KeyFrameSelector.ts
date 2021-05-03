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
import KeyFrameCssTmpAccessor from '../Css/PropertyAccessor/KeyFrameCssTmpAccessor';

export default abstract class KeyFrameSelector extends BaseSelector
{

    protected _cssPropertyAccesor: KeyFrameCssAccessor = null
    protected _tmpCssPropertyAccesor: KeyFrameCssTmpAccessor = null

    keyFrame: KeyFrame = null
    
    constructor()
    {
        super(null)
        
    }

    public abstract getValue()

    protected initCss(owner: KeyFrame) {
        this._cssPropertyAccesor = new KeyFrameCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new KeyFrameCssTmpAccessor(owner, this)
    }

    public initTag(tag: HtmlTag) {
        this._cssPropertyAccesor.initTag(tag)
        this._tmpCssPropertyAccesor.initTag(tag)
        this._owner = <SelectorOwner><unknown>tag
    }

    public init(owner: KeyFrame)
    {
        this.setApi(owner.api)
        this.keyFrame = owner
        this.initCss(owner)

    }

    getOwnerId(): string {
        return this.keyFrame.uuid
    }

    public setOwner(tag: SelectorOwner) {
        this.keyFrame = <KeyFrame><unknown>tag

        this.init(<KeyFrame><unknown>tag)
    }

    public setApi(api: SelectorApiService)
    {
        this.api = api
        this.synchronizer = new KeyFrameSelectorSynchronizer(this, api)
    }
}