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
export default abstract class PseudoSelector
{
    id
    projectId
    selectedByOwner = false
    protected _active
    protected _version
    protected _name
    protected _value
    protected _delimiter = ''
    protected _owner: HtmlTag

    // protected _realPositionCalculator: RealPositionCalculator

    protected _width = PseudoSelector.INITIAL_WIDTH
    protected _height = PseudoSelector.INITIAL_HEIGHT
    public static INITIAL_WIDTH = 100
    public static INITIAL_HEIGHT = 100

    protected widthUnitCurrent: UnitSize = new Pixel()
    protected heightUnitCurrent: UnitSize = new Pixel()

    protected _hasPosition = false
    protected _hasAbsolute = false
    protected _hasFixed = false
    protected _positionPropName

    protected _widthCalc: string = 'calc(100%)'
    protected _heightCalc: string = 'calc(100%)'

    protected _cssPropertyAccesor: PseudoSelectorCssAccessor
    protected _tmpCssPropertyAccesor: PseudoSelectorCssAccessor

    protected synchronizer: PseudoSelectorSynchronizer
    api: ApiService

    constructor(owner: HtmlTag) {
        this._owner = owner
        this._cssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        this._tmpCssPropertyAccesor = new PseudoSelectorCssAccessor(owner, this)
        if (owner) {
            this._value = '#' + owner.shortUUID + ':' + this.getName()
            
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
    
    get delimiter(): string
    {
        return this._delimiter
    }
    
    set delimiter(arg: string)
    {
        this._delimiter = arg
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
        this._value = '#' + tag.shortUUID + ':' + this.getName()

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

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            if (!this.owner.canAddToCssList(cssProp)) {
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

        // var activeSelector = this.getSelectedSelector()
        
        // if (activeSelector) {
        //     return activeSelector.cssBoxList
        // } 
        // if (this.widthUnitCurrent instanceof Percent) {
            // let css = this.cssList
                
            // return css
            // return {
            //     width: `${this._width}${this.sizeUnitCurrent.value}`,
            //     height: `${this._height}${this.sizeUnitCurrent.value}`,
            // }
        // }    

        // let borderLeftWidth = this.borderLeft.width
        // let borderRightWidth = this.borderRight.width
        // let borderTopWidth = this.borderTop.width
        // let borderBottomWidth = this.borderBottom.width

        // var paddingLeftWidth, paddingRightWidth, paddingTopWidth, paddingBottomWidth
        // if (this.paddingLeft.isActive() &&  this.getHtmlEl()) {
            
        // }
    
        
        // paddingLeftWidth = this.paddingLeft.isActive() ? this.paddingLeft.width : 0
        // paddingRightWidth = this.paddingRight.isActive() ? this.paddingRight.width : 0
        // paddingTopWidth = this.paddingTop.isActive() ? this.paddingTop.width : 0
        // paddingBottomWidth = this.paddingBottom.isActive() ? this.paddingBottom.width : 0
        
        // let marginLeftWidth = this.marginLeft.width
        // let marginRightWidth = this.marginRight.width
        // let marginTopWidth = this.marginTop.width
        // let marginBottomWidth = this.marginBottom.width
        
        // let boxHeight = this._height

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