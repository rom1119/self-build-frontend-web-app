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
import DefaultCssPropertyAccessor from "../Css/PropertyAccessor/ContentElCssPropertyAccessor";
import Width from '../Css/Size/Width';
import Height from "../Css/Size/Height";
import BackgroundColor from "../Css/Background/BackgroundColor";
import BasePropertyCss from "../Css/BasePropertyCss";
import PaddingModel from './Padding/PaddingModel'; 
import MarginModel from "./Margin/MarginModel";
import BorderModelFactory from "./Border/BorderModelFactory";
import PaddingModelFactory from "./Padding/PaddingModelFactory";
import MarginModelFactory from "./Margin/MarginModelFactory";
import FilterCssInjector from "../FilterCssInjector";
import PaddingFilterCssInjector from "../FilterCssInjector/PaddingFilterCssInjector";
import BasePaddingCss from '../Css/BoxModel/BasePadding';
import PaddingCss from "../Css/BoxModel/Padding/PaddingCss";

export default abstract class HtmlTag extends LayoutEl implements CssList, SizeActivable
{
    protected _tag = 'h1'
    protected _innerText: string = 'Example text from abstract HtmlTag class'

    borderFactory: BorderModelFactory = new BorderModelFactory()
    paddingFactory: PaddingModelFactory = new PaddingModelFactory()
    marginFactory: MarginModelFactory = new MarginModelFactory()

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
    
    protected _isEdited = false
    protected _width = 100
    protected _height = 100
    protected initialBackgroundColor = 'red'
    private _backgroundColor = this.initialBackgroundColor;
    private _initialColorUnit: UnitColor = new Named();
    protected sizeUnitCurrent: UnitSize = new Pixel()

    paddingFilter: FilterCssInjector
    
    constructor()
    {
        super()
        this.initPaddings()
        this.initBorders()
        this.initMargins()
        this.initCssAccessor()
    }

    initBorders()
    {
        let left = this.borderFactory.createLeft()
        let right = this.borderFactory.createRight()
        let top = this.borderFactory.createTop()
        let bottom = this.borderFactory.createBottom()

        this.borders.push(left)
        this.borders.push(right)
        this.borders.push(top)
        this.borders.push(bottom)
        
        this.borderBottom = bottom
        this.borderTop = top
        this.borderLeft = left
        this.borderRight = right
    }
    
    initPaddings()
    {
        let left = this.paddingFactory.createLeft(this)
        let right = this.paddingFactory.createRight(this)
        let top = this.paddingFactory.createTop(this)
        let bottom = this.paddingFactory.createBottom(this)

        this.paddings.push(left)
        this.paddings.push(right)
        this.paddings.push(top)
        this.paddings.push(bottom)

        this.paddingBottom = bottom
        this.paddingTop = top
        this.paddingLeft = left
        this.paddingRight = right
    }
    
    initMargins()
    {
        let left = this.marginFactory.createLeft(this)
        let right = this.marginFactory.createRight(this)
        let top = this.marginFactory.createTop(this)
        let bottom = this.marginFactory.createBottom(this)

        this.margins.push(left)
        this.margins.push(right)
        this.margins.push(top)
        this.margins.push(bottom)

        this.marginBottom = bottom
        this.marginTop = top
        this.marginLeft = left
        this.marginRight = right
    }

    protected initCssAccessor()
    {
        super.initCssAccessor()
        this.paddingFilter = new PaddingFilterCssInjector(this)
        // console.log(`%c${this._width}`, 'font-size: 20px;')
        
        let padding = new PaddingCss('11', new Pixel())
        let width = new Width(this._width, this.sizeUnitCurrent)
        let height = new Height(this._height, this.sizeUnitCurrent)
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        this._cssPropertyAccesor.addNewProperty(padding)
        this._cssPropertyAccesor.addNewProperty(width)
        this._cssPropertyAccesor.addNewProperty(height)
        this._cssPropertyAccesor.addNewProperty(backgroundColor)
    }

    get width()
    {
        return this._width
    }

    get height()
    {
        return this._height
    }

    // set height(value) {
    //     this._height = value;
    //  }

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
    
    private isLikeBackgroundCss(cssProp: BasePropertyCss): boolean
    {
        return this.cssAccessor.isPropertyLikeThis(cssProp, 'background')
    }

    // get paddingRightWidth(): number
    // {
        
        //     return this.paddingRight.width
        // }
        
    // set paddingRightUnit(newVal: UnitSize)
    // {        
    //      this.paddingRight.widthUnit = newVal
    // }

    private filterCss(css: BasePropertyCss): boolean
    {
        if (css instanceof BasePaddingCss) {
            return false
        }

        return true

    }

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            if (!this.filterCss(cssProp)) {
                continue
            }
            if (!this.isLikeBackgroundCss(cssProp)) {
                css[cssProp.getName()] = cssProp.getValue()
            }
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
        // console.log(`%c${width.getValue()}`, 'font-size: 20px;')

        let height = new Height(boxHeight, this.sizeUnitCurrent)
        
        allCssList.setNewPropertyValue(Width.PROP_NAME, width)
        allCssList.setNewPropertyValue(Height.PROP_NAME, height)
        // allCssList.setNewPropertyValue(BackgroundColor.PROP_NAME, backgroundColor)
        // console.log('AAAAA');

        // console.log(height.getValue());
        
        
        let css = {}
        
        for (const cssProp of this.cssAccessor.all) {
            if (cssProp instanceof BasePaddingCss) {
                
            }
            if (!this.filterCss(cssProp)) {
                continue
            }
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
            if (!this.filterCss(cssProp)) {
                continue
            }
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