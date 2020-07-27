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
export default abstract class PseudoSelector
{
    id
    projectId
    selectedByOwner = false
    protected _active
    protected _version
    protected _name
    protected _value
    protected _owner: HtmlTag

    protected _cssPropertyAccesor: PseudoSelectorCssAccessor
    protected _tmpCssPropertyAccesor: PseudoSelectorCssAccessor

    protected synchronizer: PseudoSelectorSynchronizer
    api: ApiService

    constructor(owner: HtmlTag) {
        this._owner = owner
        this._cssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        if (owner) {
            this._value = '#' + owner.shortUUID + ':' + this._name
            
        } else {
            this._value = this._name

        }
        
        this.active = false
    }

    public abstract getName(): string

    get owner(): HtmlTag
    {
        return this._owner
    }
    
    get active(): boolean
    {
        return this._active
    }
    
    set active(arg: boolean)
    {
        this._active = arg
    }
    
    get value(): string
    {
        return this._value
    }
    
    set value(arg: string) 
    {
        this._value = arg
    }

    get cssAccessor(): PseudoSelectorCssAccessor
    {
        return this._cssPropertyAccesor
    }
    
    get tmpCssAccessor(): PseudoSelectorCssAccessor
    {
        return this._tmpCssPropertyAccesor
    }

    public setCss(css: BasePropertyCss)
    {
        if (!this.cssAccessor.hasCssProperty(css.getName())) {
            this.cssAccessor.addNewProperty(css)
        } else {            
            // let currentBackground = this.cssPropertyAccessor.getProperty(val.getName())
            // if (currentBackground.getValue() === val.getValue()) {
            //     // return
            // }
            this.cssAccessor.setNewPropertyValue(css.getName(), css)
        }
    }

    public setOwner(tag: HtmlTag)
    {
        this._owner = tag
        this._value = '#' + tag.shortUUID + ':' + this._name

    }

    public setActive(val: boolean)
    {
        this._active = val

    }
    isActive() : boolean {
        return this._active === true
    }
    
    public setVersion(val: number)
    {
        this._version = val

    }
    
    public getVersion()
    {
        return this._version

    }

    public setApi(api: ApiService)
    {
        this.api = api
        this.synchronizer = new PseudoSelectorSynchronizer(this, api)
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        if (!this.cssAccessor.hasCssProperty(val.getName())) {
            this.cssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.cssAccessor.getProperty(val.getName())
            if (currentBackground.getValue() === val.getValue()) {
                return
            }
            this._cssPropertyAccesor.setNewPropertyValue(propName, val)
        }
        
        if (!this.tmpCssAccessor.hasCssProperty(val.getName())) {
            this.tmpCssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
            if (currentBackground.getValue() === val.getValue()) {
                // return
            }
            this.tmpCssAccessor.setNewPropertyValue(propName, val)
        }

        if (val instanceof BasePaddingCss || val instanceof BasePaddingCss || val instanceof BaseBorderCss || val instanceof ContentSizeCss) {
            // this.updateBoundingRight()
            // this.realPositionCalculator.reInitDefaultPosition()
        }
        // console.log('UPDATE');
        
        // if (!this.getHtmlEl()) {
        //     return
        // }
        if (val instanceof BasePaddingCss) {
            this.owner.paddingFilter.injectCssProperty(val)
        } 
        
        if (val instanceof BaseMarginCss) {
            this.owner.marginFilter.injectCssProperty(val)
        }
        
        if (val instanceof BaseBorderCss) {
            this.owner.borderFilter.injectCssProperty(val)
        }
        
        if (val instanceof ContentSizeCss) {
            this.owner.contentFilter.injectCssProperty(val)
        }
  

        this.synchronizer.synchronize()
        
    }
}