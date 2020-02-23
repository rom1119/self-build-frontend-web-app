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
import BasePaddingCss from '../Css/BoxModel/BasePaddingCss';
import PaddingCss from "../Css/BoxModel/Padding/PaddingCss";
import FontSize from '../Css/Text/FontSize';
import PaddingLeftCss from '../Css/BoxModel/Padding/PaddingLeftCss';
import FetcherRealCssProp from "../FetcherRealCssProp";
import PaddingRealCssFetcher from "../Css/RealCssProp/PadingRealCssFetcher";
import ContentElPropertyAccessor from "../Css/PropertyAccessor/ContentElCssPropertyAccessor";
import MarginFilterCssInjector from "../FilterCssInjector/MarginFilterCssInjector";
import MarginCss from "../Css/BoxModel/Margin/MarginCss";
import BaseMarginCss from "../Css/BoxModel/BaseMarginCss";
import MarginRealCssFetcher from "../Css/RealCssProp/MarginRealCssFetcher";
import _ from 'lodash'
import CssAuto from '~/src/Css/CssAuto';
import BorderRealCssFetcher from "../Css/RealCssProp/BorderRealCssFetcher";
import BorderGlobalCss from "../Css/Border/Global/BorderGlobalCss";
import BoxSizing from '../Css/BoxModel/BoxSizing';
import BaseBorderCss from "../Css/Border/BaseBorderCss";
import BorderFilterCssInjector from "../FilterCssInjector/BorderFilterCssInjector";
import Display from '../Css/Display/Display';
import ApiService from "../Api/ApiService";
import DefaultApiService from "../Api/impl/DefaultApiService";




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

    protected _tmpCssPropertyAccesor: CssPropertyAccessor

    paddingFilter: FilterCssInjector
    marginFilter: FilterCssInjector
    borderFilter: FilterCssInjector

    paddingRealFetcher: FetcherRealCssProp = new PaddingRealCssFetcher(this)
    marginRealFetcher: FetcherRealCssProp = new MarginRealCssFetcher(this)
    borderRealFetcher: FetcherRealCssProp = new BorderRealCssFetcher(this)

    api: ApiService
    
    constructor()
    {
        super()
        this.api = new DefaultApiService();
        this.initPaddings()
        this.initBorders()
        this.initMargins()
        this._tmpCssPropertyAccesor = new ContentElPropertyAccessor(this)
        this.initCssAccessor()
        console.log(this.paddingRealFetcher);

    }

    initBorders()
    {
        let left = this.borderFactory.createLeft(this)
        let right = this.borderFactory.createRight(this)
        let top = this.borderFactory.createTop(this)
        let bottom = this.borderFactory.createBottom(this)

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
        this.marginFilter = new MarginFilterCssInjector(this)
        this.borderFilter = new BorderFilterCssInjector(this)
        // console.log(`%c${this._width}`, 'font-size: 20px;')
        
        let border = new BorderGlobalCss('15', new Pixel())
        border.setType('dotted')
        border.setColor('blue', new Named())
        // console.log('PPPP', border.getValue());
        
        let padding = new PaddingCss('41', new Pixel())
        let margin = new MarginCss('11', new Pixel())
        let width = new Width(this._width, this.sizeUnitCurrent)
        let height = new Height(this._height, this.sizeUnitCurrent)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let display = new Display(Display.INLINE_BLOCK, new Named())
        let cssList = [border, padding, margin, width, height, boxSizing, backgroundColor, display]

        this.addPropsToAccessor(this._cssPropertyAccesor, cssList)
        this.addPropsToAccessor(this._tmpCssPropertyAccesor, cssList)

        this.paddingFilter.injectCssProperty(padding)
        this.marginFilter.injectCssProperty(margin)
        this.borderFilter.injectCssProperty(border)
    }

    public addNewPropertyCss(css: BasePropertyCss)
    {
        this.cssAccessor.addNewProperty(css)
        this.tmpCssAccessor.addNewProperty(css)
    }

    public addPropsToAccessor( accessor: CssPropertyAccessor, cssList: BasePropertyCss[] )
    {
        for (const cssProp of cssList) {
            accessor.addNewProperty(cssProp)
        }
    }

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        super.updateCssPropertyWithoutModel(propName, val)
        if (!this.tmpCssAccessor.hasCssProperty(val.getName())) {
            this.tmpCssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
            if (currentBackground.getValue() === val.getValue()) {
                return
            }
            this.tmpCssAccessor.setNewPropertyValue(propName, val)
        }
        
    }

    get tmpCssAccessor(): CssPropertyAccessor
    {
        return this._tmpCssPropertyAccesor
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
        
        if (css instanceof BaseMarginCss) {
            return false
        }
        
        if (css instanceof BaseBorderCss) {
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
            }
            css[cssProp.getName()] = cssProp.getValue()

            if (cssProp instanceof FontSize) {
                this._innerText = 'Font-size: ' + cssProp.getValue()
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

    public updateAllModelsComponents()
    {
        this.paddingLeft.updateModelComponent()
        this.paddingRight.updateModelComponent()
        this.paddingBottom.updateModelComponent()
        this.paddingTop.updateModelComponent()

        this.borderLeft.updateModelComponent()
        this.borderRight.updateModelComponent()
        this.borderBottom.updateModelComponent()
        this.borderTop.updateModelComponent()
        
        this.marginLeft.updateModelComponent()
        this.marginRight.updateModelComponent()
        this.marginBottom.updateModelComponent()
        this.marginTop.updateModelComponent()
    }

    // get cssContentSizeList() : any
    // {
    //     return {
    //         width: `${this._width}${this.sizeUnitCurrent.value}`,
    //         height: `${this._height}${this.sizeUnitCurrent.value}`,
    //     }
    // }

    recalculateRealComputedProperties()
    {
        for (const prop of this.cssAccessor.getAll()) {
            
            console.log('ALA MA');
            // console.log(newProp.getUnit());
            // console.log(newProp);
            if (prop instanceof BasePaddingCss) {

                let val = this.getComputedCssVal(prop)
                let clonedCss = _.cloneDeep(prop)
                clonedCss.setValue(parseInt(val).toString())
                clonedCss.setUnit(new Pixel())
                // console.log(newProp);
                // console.log(val);
                // // console.log(clonedCss);
                // console.log('ALA MA');
                this.paddingFilter.injectCssProperty(clonedCss)
            }
            
            if (prop instanceof BaseMarginCss) {

                let val = this.getComputedCssVal(prop)
                let clonedCss = _.cloneDeep(prop)
                clonedCss.setValue(parseInt(val).toString())
                clonedCss.setUnit(new Pixel())
                // console.log(newProp);
                // console.log(val);
                // // console.log(clonedCss);
                // console.log('ALA MA');
                this.marginFilter.injectCssProperty(clonedCss)
            }
            
            if (prop instanceof BaseBorderCss) {

                let val = this.getComputedCssVal(prop)
                let clonedCss = _.cloneDeep(prop)
                // clonedCss.setValue(parseInt(val).toString())
                clonedCss.setUnit(new Pixel())
                clonedCss.setWidth(parseInt(val).toString(), new Pixel())
                clonedCss.setType(prop.getType())
                clonedCss.setColor(prop.getColor(), prop.getColorUnit())
                // console.log(newProp);
                console.log(val);
                console.log(clonedCss);
                console.log('ALA MA');
                this.borderFilter.injectCssProperty(clonedCss)
            }
        }
    }

    public getComputedCssVal(prop: BasePropertyCss): string
    {

        // console.log('COMPUTED');
        // console.log(prop.getName());
        // console.log(prop.getValue());
        // console.log(this.getHtmlEl());
        // console.log(this.getHtmlEl());
        // @ts-ignore
        if (typeof prop.isAuto === 'function') {
            // @ts-ignore
            if (prop.isAuto()) {
                this.getHtmlEl().style[prop.getName()] = 'auto'
                this.getHtmlEl().style['margin-left'] = 'auto'
                // throw Error('AJAJAJA')
            } else {
                this.getHtmlEl().style[prop.getName()] = prop.getValue()

            }
            
        } else {
            this.getHtmlEl().style[prop.getName()] = prop.getValue()

        }
        var a = window.getComputedStyle(this.getHtmlEl())
        var val = a.getPropertyValue(prop.getName())
        // this.getHtmlEl().removeAttribute('style')
        
        // console.log(a);
        // console.log(val);
        // console.log('COMPUTED-END');
        return val
    }

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

        let borderLeftWidth = this.borderLeft.width
        let borderRightWidth = this.borderRight.width
        let borderTopWidth = this.borderTop.width
        let borderBottomWidth = this.borderBottom.width

        var paddingLeftWidth, paddingRightWidth, paddingTopWidth, paddingBottomWidth
        if (this.paddingLeft.isActive() &&  this.getHtmlEl()) {
            // let width = this.paddingLeft.width
            // let widthUnit = this.paddingLeft.widthUnit
            // console.log('ALA MA');
            // console.log(width);
            // console.log(widthUnit);
            // console.log('ALA MA');
            
            // this.getHtmlEl().style.paddingLeft = width + widthUnit.name
            // var a = window.getComputedStyle(this.getHtmlEl())
            // console.log(a);
            // var prop = new PaddingLeftCss(parseInt(a.getPropertyValue('padding-left')), new Pixel())
            // this.paddingFilter.injectCssProperty(prop)
            // console.log(prop);

            // console.log(`%c${width}`, 'font-size: 22px;')
            // console.log(`%c${a.getPropertyValue('padding-left')}`, 'font-size: 20px;')

            // paddingLeftWidth =  prop.getClearValue()
        }
        
        
        paddingLeftWidth = this.paddingLeft.isActive() ? this.paddingLeft.width : 0
        paddingRightWidth = this.paddingRight.isActive() ? this.paddingRight.width : 0
        paddingTopWidth = this.paddingTop.isActive() ? this.paddingTop.width : 0
        paddingBottomWidth = this.paddingBottom.isActive() ? this.paddingBottom.width : 0
        
        let marginLeftWidth = this.marginLeft.width
        let marginRightWidth = this.marginRight.width
        let marginTopWidth = this.marginTop.width
        let marginBottomWidth = this.marginBottom.width
        
        // let paddingLeftWidth = 0
        // let paddingRightWidth = 0
        // let paddingTopWidth = 0
        // let paddingBottomWidth = 0
        // let boxWidth = marginLeftWidth + borderLeftWidth + paddingLeftWidth + marginRightWidth + borderRightWidth + paddingRightWidth + this._width
        // let boxHeight = marginTopWidth + borderTopWidth + paddingTopWidth + marginBottomWidth + borderBottomWidth + paddingBottomWidth + this._height
        
        let boxWidth = this._width
        let boxHeight = this._height
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
                // this.paddingFilter.injectCssProperty(cssProp)
            }
            if (!this.filterCss(cssProp)) {
                // continue
            }
            if (cssProp instanceof Width ||
                cssProp instanceof Height ||
                cssProp instanceof BaseMarginCss ||
                cssProp instanceof BasePaddingCss || 
                cssProp instanceof BaseBorderCss || 
                cssProp instanceof BoxSizing 
            )
                
            {
                
            }
            css[cssProp.getName()] = cssProp.getValue()
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
        this.api.postTag(this)

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

    public setHtmlEl(htmlEl)
    {
        super.setHtmlEl(htmlEl)
        this.recalculateRealComputedProperties()
    }


}