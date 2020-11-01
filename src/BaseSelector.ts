import CssPropertyAccessor from "./Css/CssPropertyAccessor"
import PseudoSelectorSynchronizer from "./Synchronizer/Impl/PseudoSelectorSynchronizer"
import ApiService from "./Api/ApiService"
import BasePropertyCss from "./Css/BasePropertyCss"
import HtmlTag from "./Layout/HtmlTag"
import PseudoSelector from "./PseudoSelector/PseudoSelector"
import UnitSize from "./Unit/UnitSize"
import { Pixel } from "./Unit"
import { PositionCss, Width, Height } from "./Css"
import BasePaddingCss from "./Css/BoxModel/BasePaddingCss"
import BaseBorderCss from "./Css/Border/BaseBorderCss"
import ContentSizeCss from "./Css/Size/ContentSizeCss"
import BaseMarginCss from "./Css/BoxModel/BaseMarginCss"
import SelectorOwner from "./SelectorOwner"
import HtmlTagSynchronizer from "./Synchronizer/Impl/HtmlTagSynchronizer"

export default abstract class BaseSelector
{
    id
    projectId
    protected _version
    protected _active
    protected _value
    protected _hasPosition = false
    protected _hasAbsolute = false
    protected _hasFixed = false
    protected _positionPropName

    protected _owner: SelectorOwner

    // protected _realPositionCalculator: RealPositionCalculator

    protected _width = BaseSelector.INITIAL_WIDTH
    protected _height = BaseSelector.INITIAL_HEIGHT
    public static INITIAL_WIDTH = 100
    public static INITIAL_HEIGHT = 100

    protected widthUnitCurrent: UnitSize = new Pixel()
    protected heightUnitCurrent: UnitSize = new Pixel()

    protected _widthCalc: string = 'calc(100%)'
    protected _heightCalc: string = 'calc(100%)'


    protected _cssPropertyAccesor: CssPropertyAccessor
    protected _tmpCssPropertyAccesor: CssPropertyAccessor

    protected synchronizer: PseudoSelectorSynchronizer
    api: ApiService

    constructor(owner: SelectorOwner) {
        this._owner = owner
        
        this.active = false
    }

    public abstract getValue(): string
    public abstract getName(): string

    get owner(): SelectorOwner
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
    get value()
    {
        return this._value
    }
    
    set value(arg)
    {
        this._value = arg
    }

    get cssAccessor(): CssPropertyAccessor
    {
        return this._cssPropertyAccesor
    }
    
    get tmpCssAccessor(): CssPropertyAccessor
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
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        } else {
            this.owner.synchronizer.synchronize()
        }
    }

    public setActive(val: boolean)
    {
        this._active = val

    }
    isActive() : boolean {
        return this._active === true
    }
    
   

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        // console.log('UUUUUUU');
        // console.log(val.getValue());
        if (!this.cssAccessor.hasCssProperty(val.getName())) {
            this.cssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.cssAccessor.getProperty(val.getName())
            // console.log(currentBackground.getValue());
            
            if (currentBackground.getValue() === val.getValue()) {
                // return
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
  

        this.synchronize()
        
    }

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            if (!this.owner.canAddToCssList(cssProp)) {
                continue
            }
            if (!cssProp.injectable) {
                continue
            }
            if (this.owner.isLikeBackgroundCss(cssProp)) {
                continue
            }
            css[cssProp.getName()] = cssProp.getValue()

            
        }    
        
        if (this.hasAbsolute || this.hasFixed) {
            css[Width.PROP_NAME] = this.widthCalc
            css[Height.PROP_NAME] = this.heightCalc

        } else {
            css[Width.PROP_NAME] = '100%'
            css[Height.PROP_NAME] = '100%'

        }
        
        
        if (css[Height.PROP_NAME]) {
            let height = new Height(this._height, this.heightUnitCurrent)
        }

        return css

    }

    get cssBoxList() : any
    {

        let css = this.cssAccessor.all

        let cssToBox = []

        if (this.owner.hasAbsolute || this.owner.hasFixed) {
            var replacedCss = {}
    
            replacedCss['left'] = 'calc(' + this.realPositionCalculator.realLeftCalc + ')'
            replacedCss['top'] = 'calc(' + this.realPositionCalculator.realTopCalc + ')'
            replacedCss['right'] = 'calc(' + this.realPositionCalculator.realRightCalc + ')'
            replacedCss['bottom'] = 'calc(' + this.realPositionCalculator.realBottomCalc + ')'
          
            this.owner.transformStyleList.setReplacedCss(replacedCss)

        }

        return this.owner.transformStyleList.transform(this.cssAccessor.all)
        
        // return css
    }

    get realPositionCalculator()
    {
        return this.owner.realPositionCalculator
    }

    get hasPosition(): boolean
    {
        return this._hasPosition
    }
    
    get hasAbsolute(): boolean
    {
        return this._hasAbsolute
    }
    get hasFixed(): boolean
    {
        return this._hasFixed
    }
    
    set hasPosition(arg)
    {
        this._hasPosition = arg
    }
    
    get positionPropName(): string
    {
        return this._positionPropName
    }
    
    set positionPropName(arg)
    {
        this._positionPropName = arg
    }
    
    get widthCalc(): string
    {
        return this._widthCalc
    }
    
    set widthCalc(arg)
    {
        this._widthCalc = arg
    }
    
    get heightCalc(): string
    {
        return this._heightCalc
    }
    
    set heightCalc(arg)
    {
        this._heightCalc = arg
    }

    public updateHasPosition(prop: BasePropertyCss)
    {

        if (!(prop instanceof PositionCss)) {
            return
        }
        this.owner.notifyPositionalTag();

        if (!prop.isActive()) {
            this._hasAbsolute = false
            this._hasFixed = false
            this.hasPosition = false
            return
        }

        if (prop.getValue() === PositionCss.RELATIVE || prop.getValue() === PositionCss.ABSOLUTE || prop.getValue() === PositionCss.FIXED) {
            this.hasPosition = true
            if (prop.getValue() === PositionCss.ABSOLUTE) {
                this._hasAbsolute = true
                
            } else {
                this._hasAbsolute = false

            }
            
            if (prop.getValue() === PositionCss.FIXED) {
                this._hasFixed = true
                
            } else {
                this._hasFixed = false

            }

        } else {
            this._hasFixed = false
            this._hasAbsolute = false
            this.hasPosition = false
        }


    }

    public updatePositionName(prop?: PositionCss)
    {    
        if (prop) {
            this.positionPropName = prop.getClearValue()

        } else {
            this.positionPropName = null
        }
       
    }
    
    
}