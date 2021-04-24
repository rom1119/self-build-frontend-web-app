import HtmlTag from '../Layout/HtmlTag';
import PseudoSelectorCssAccessor from '../Css/PropertyAccessor/PseudoSelectorCssAccessor';
import CssPropertyAccessor from '~/src/Css/CssPropertyAccessor';
import BasePropertyCss from '../Css/BasePropertyCss';
import BaseBorderCss from '../Css/Border/BaseBorderCss';
import BaseMarginCss from '../Css/BoxModel/BaseMarginCss';
import BasePaddingCss from '../Css/BoxModel/BasePaddingCss';
import ContentSizeCss from '../Css/Size/ContentSizeCss';
import ApiService from '../Api/ApiService';
import HtmlTagSynchronizer from '../Synchronizer/Impl/HtmlTagSynchronizer';
import PseudoSelectorSynchronizer from '../Synchronizer/Impl/PseudoSelectorSynchronizer';
import { FontSize, Width, Height, PositionCss } from '../Css';
import { Pixel } from '../Unit';
import UnitSize from '../Unit/UnitSize';
import RealPositionCalculator from '../PositionCss/RealPositionCalculator';
import BaseSelector from '../BaseSelector';
import SelectorOwner from '../SelectorOwner';
import SelectorApiService from '../Api/SelectorApiService';
export default abstract class PseudoSelector extends BaseSelector
{

    selectedByOwner = false
    protected _name
    protected _delimiter = ''

    constructor(owner: HtmlTag) {
        super(<SelectorOwner><unknown>owner)
        this._cssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        if (owner) {
            this._value = '#' + owner.shortUUID + ':' + this.getName()
            
        } else {
            this._value = this._name

        }   
    }

    public abstract getName(): string

    get delimiter(): string
    {
        return this._delimiter
    }
    
    set delimiter(arg: string)
    {
        this._delimiter = arg
    }
    
    public getValue()
    {
        return this._value
    }

    
    public setApi(api: SelectorApiService)
    {
        this.api = api
        this.synchronizer = new PseudoSelectorSynchronizer(this, api)
    }

    public setOwner(tag: SelectorOwner)
    {
        this._owner = tag
        this._value = '#' + tag.shortUUID + ':' + this.getName()

    }

    

    

    
    
}