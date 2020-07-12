import HtmlTag from '../Layout/HtmlTag';
import PseudoSelectorCssAccessor from '../Css/PropertyAccessor/PseudoSelectorCssAccessor';
import CssPropertyAccessor from '~/src/Css/CssPropertyAccessor';
import BasePropertyCss from '../Css/BasePropertyCss';
export default abstract class PseudoSelector
{
    id
    protected _active
    protected _version
    protected _value
    protected _owner: HtmlTag
    protected _cssPropertyAccesor: PseudoSelectorCssAccessor

    constructor(owner: HtmlTag) {
        this._owner = owner
        this._cssPropertyAccesor = new PseudoSelectorCssAccessor(owner)
    }

    public abstract getName(): string
    public getValue(): string
    {
        return this._value
    }

    get owner(): HtmlTag
    {
        return this._owner
    }

    get cssPropertyAccessor(): PseudoSelectorCssAccessor
    {
        return this._cssPropertyAccesor
    }

    public setCss(css: BasePropertyCss)
    {
        if (!this.cssPropertyAccessor.hasCssProperty(css.getName())) {
            this.cssPropertyAccessor.addNewProperty(css)
        } else {            
            // let currentBackground = this.cssPropertyAccessor.getProperty(val.getName())
            // if (currentBackground.getValue() === val.getValue()) {
            //     // return
            // }
            this.cssPropertyAccessor.setNewPropertyValue(css.getName(), css)
        }
    }

    public setOwner(tag: HtmlTag)
    {
        this._owner = tag

    }
    
    public setValue(val: string)
    {
        this._value = val

    }
    
    public setVersion(val: number)
    {
        this._version = val

    }
    
    public getVersion()
    {
        return this._version

    }
}