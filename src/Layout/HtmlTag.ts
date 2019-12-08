import LayoutEl from "../LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';
import UnitColor from "../Unit/UnitColor";
import Named from "../Unit/Color/Named";
import SizeActivable from "../SizeActivable";
import BorderModel from "./Border/BorderModel";
import CssPropertyAccessor from '../Css/CssPropertyAccessor';
import DefaultCssPropertyAccessor from "../Css/PropertyAccessor/DefaultCssPropertyAccessor";
import Width from '../Css/Size/Width';
import Height from "../Css/Size/Height";
import BackgroundColor from "../Css/Background/BackgroundColor";
import BasePropertyCss from "../Css/BasePropertyCss";
import PaddingModel from './Padding/PaddingModel'; 
import MarginModel from "./Margin/MarginModel";

export default abstract class HtmlTag extends LayoutEl implements CssList, SizeActivable
{
    
    protected _tag = 'h1'
    protected _htmlEl
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected isActive = false
    protected borderActive = false
    protected paddingActive = false
    protected marginActive = false
    protected contentActive = false

    protected _borders: BorderModel[] = []
    borderBottom: BorderModel
    borderTop: BorderModel
    borderLeft: BorderModel
    borderRight: BorderModel
    
    protected _paddings: PaddingModel[] = []
    paddingBottom: PaddingModel
    paddingTop: PaddingModel
    paddingLeft: PaddingModel
    paddingRight: PaddingModel
    
    protected _margins: MarginModel[] = []
    marginBottom: MarginModel
    marginTop: MarginModel
    marginLeft: MarginModel
    marginRight: MarginModel
    
    protected sizeActive = false
    protected _isEdited = false
    protected _width = 100
    protected _height = 100
    protected initialBackgroundColor = 'red'
    private _backgroundColor = this.initialBackgroundColor;
    private _initialColorUnit: UnitColor = new Named();
    private _colorUnit: UnitColor = this._initialColorUnit
    protected sizeUnitCurrent: UnitSize = new Pixel()
    protected _cssPropertyAccesor: CssPropertyAccessor
    protected _updateComponent = 0
    
    constructor() {
        super()
        this.initCssAccessor()
        
    }

    private initCssAccessor()
    {
        this._cssPropertyAccesor = new DefaultCssPropertyAccessor(this)

        let width = new Width(this._width, this.sizeUnitCurrent)
        let height = new Height(this._height, this.sizeUnitCurrent)
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(backgroundColor)
    }

    public updateCssProperty(propName: string, val: BasePropertyCss)
    {
        let currentBackground = this.cssAccessor.getProperty(val.getName())
        // console.log('bef');
        // console.log(currentBackground.getValue());
        // console.log(val.getValue());
        // console.log('af');
        if (currentBackground.getValue() == val.getValue()) {
            // console.log('AAAAAA');
            
            return
        }
        this._cssPropertyAccesor.setNewPropertyValue(propName, val)
        this.updateModelComponent()
    }
    
    private updateModelComponent()
    {
        this._updateComponent++

    }

    get updateComponentKey()
    {
        return this._updateComponent
    }

    get cssAccessor(): CssPropertyAccessor
    {
        return this._cssPropertyAccesor
    }

    get width()
    {
        return this._width
    }

    // set width(value) {
    //     this._htmlEl = value;
    //  }

    get height()
    {
        return this._height
    }

    // set height(value) {
    //     this._height = value;
    //  }

    
    get htmlEl() {
        return this._htmlEl;
    }

    set htmlEl(value) {
       this._htmlEl = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
     set backgroundColor(value) {
        this._backgroundColor = value;
    }

    protected abstract getTagName(): string

    public toString(): string
    {
        return `${this.getTagName()}, UUID=${this.uuid} `
    }

    public changeAsActiveSize()
    {
        
        this._backgroundColor = 'aqua'

    }
    
    public changeAsDeactiveSize()
    {
        this._backgroundColor = this.initialBackgroundColor
    }

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            css[cssProp.getName()] = cssProp.getValue()
        }    

        
        if (css[Width.PROP_NAME]) {
            let width = new Width(this._width, this.sizeUnitCurrent)
            css[Width.PROP_NAME] = width.getValue()
        }
        
        if (css[Height.PROP_NAME]) {
            let height = new Height(this._height, this.sizeUnitCurrent)
            css[Height.PROP_NAME] = height.getValue()
        }

        return css
        // return {
        //     width: `${this._width}${this.sizeUnitCurrent.value}`,
        //     height: `${this._height}${this.sizeUnitCurrent.value}`,
        //     'background-color': `${this._backgroundColor}${this._colorUnit.value}`,
        // }
    }

    // get cssContentSizeList() : any
    // {
    //     return {
    //         width: `${this._width}${this.sizeUnitCurrent.value}`,
    //         height: `${this._height}${this.sizeUnitCurrent.value}`,
    //     }
    // }

    get cssBoxList() : any
    {
        if (this.sizeUnitCurrent instanceof Percent) {
            let css = this.cssList
                
            return css
            // return {
            //     width: `${this._width}${this.sizeUnitCurrent.value}`,
            //     height: `${this._height}${this.sizeUnitCurrent.value}`,
            // }
        }    

        let borderLeftWidth = this.borderLeft.borderWidth
        let borderRightWidth = this.borderRight.borderWidth
        let borderTopWidth = this.borderTop.borderWidth
        let borderBottomWidth = this.borderBottom.borderWidth

        let paddingLeftWidth = this.paddingLeft.width
        let paddingRightWidth = this.paddingRight.width
        let paddingTopWidth = this.paddingTop.width
        let paddingBottomWidth = this.paddingBottom.width
        
        let marginLeftWidth = this.marginLeft.width
        let marginRightWidth = this.marginRight.width
        let marginTopWidth = this.marginTop.width
        let marginBottomWidth = this.marginBottom.width
        
        // let paddingLeftWidth = 0
        // let paddingRightWidth = 0
        // let paddingTopWidth = 0
        // let paddingBottomWidth = 0
        let boxWidth = marginLeftWidth + borderLeftWidth + paddingLeftWidth + marginRightWidth + borderRightWidth + paddingRightWidth + this._width
        let boxHeight = marginTopWidth + borderTopWidth + paddingTopWidth + marginBottomWidth + borderBottomWidth + paddingBottomWidth + this._height
        if (this._backgroundColor) {

        }

        // let backgroundColor = new BackgroundColor(this._backgroundColor, this._initialColorUnit)

        let allCssList = this.cssAccessor
        let width = new Width(boxWidth, this.sizeUnitCurrent)
        let height = new Height(boxHeight, this.sizeUnitCurrent)
        
        allCssList.setNewPropertyValue(Width.PROP_NAME, width)
        allCssList.setNewPropertyValue(Height.PROP_NAME, height)
        // allCssList.setNewPropertyValue(BackgroundColor.PROP_NAME, backgroundColor)
        // console.log('AAAAA');

        // console.log(height.getValue());
        
        
        let css = {}
        
        for (const cssProp of this.cssAccessor.all) {
            if (cssProp instanceof Width || cssProp instanceof Height) {
                css[cssProp.getName()] = cssProp.getValue()

            }
        }
        

        
        return css
    }
    
    get cssContentBoxList(): any
    {
        if (this.sizeUnitCurrent instanceof Percent) {
            let css = this.cssList
                
            return css
            // return {
            //     width: `${this._width}${this.sizeUnitCurrent.value}`,
            //     height: `${this._height}${this.sizeUnitCurrent.value}`,
            // }
        }    
    
        if (this._backgroundColor) {

        }

        // let backgroundColor = new BackgroundColor(this._backgroundColor, this._initialColorUnit)

        let allCssList = this.cssAccessor
        // allCssList.setNewPropertyValue(BackgroundColor.PROP_NAME, backgroundColor)
        // console.log('AAAAA');

        // console.log(height.getValue());
        
        
        let css = {}
        
        for (const cssProp of this.cssAccessor.all) {
            if (!(cssProp instanceof Width) && !(cssProp instanceof Height)) {
                css[cssProp.getName()] = cssProp.getValue()
            }
        }
        

        
        return css
    }

    
    
    get innerText() : string
    {
        return this._innerText
    }
    
    set innerText(text: string)
    {
        this._innerText = text
    }

    get isEdited() : boolean
    {
        return this._isEdited
    }

    public setNotEdited()
    {
        this._isEdited = false
    }

    public onMouseMove(w, h) 
    {
        this.sizeUnitCurrent = new Pixel()
        this._width = w
        this._height = h
    }

    public initSize(w, h) 
    {
        this.sizeUnitCurrent = new Pixel()
        this._width = w
        this._height = h
        
    }

    public onDoubleClick(e) 
    {
        this._isEdited = true
    }

    get borders() : BorderModel[]
    {
        return this._borders
    }
    
    set borders(arg: BorderModel[])
    {
        this._borders = arg
    }
    
    get paddings(): PaddingModel[]
    {
        return this._paddings
    }
    
    set paddings(arg: PaddingModel[])
    {
        this._paddings = arg
    }
    
    get margins(): MarginModel[]
    {
        return this._margins
    }
    
    set margins(arg: MarginModel[])
    {
        this._margins = arg
    }

    public blurPaddings() {
        for (const padding of this._paddings) {
            padding.blurColor()
        }
    }
    public focusPaddings() {
        for (const padding of this._paddings) {
            padding.focusColor()
        }
    }
    
    public blurMargins() {
        for (const mar of this._margins) {
            mar.blurColor()
        }
    }

    public focusMargins() {
        for (const mar of this._margins) {
            mar.focusColor()
        }
    }


}