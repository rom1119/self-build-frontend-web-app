import LayoutEl from "../LayoutEl";
import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import CssList from './CssList';
import UnitColor from "../Unit/UnitColor";
import Named from "../Unit/Named";
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
import ContentFilterCssInjector from "../FilterCssInjector/ContentFilterCssInjector";
import ContentSizeCss from '../Css/Size/ContentSizeCss';
import ActivableTagToManage from "../ActivableTagToManage";
import HtmlTagPropertyAccessor from '../Css/PropertyAccessor/HtmlTagPropertyAccessor';
import HtmlTagSynchronizer from "../Synchronizer/Impl/HtmlTagSynchronizer";
import HtmlNode from "./HtmlNode";
import BorderFetcherRealCssProp from "../BorderFetcherRealCssProp";
import { VueFixStyleListTransform } from "../Vue/VueFixStyleListTransform";

export default abstract class HtmlTag extends HtmlNode implements CssList, SizeActivable, ActivableTagToManage
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
    protected _toManage = false
    
    protected _width = HtmlTag.INITIAL_WIDTH
    protected _height = HtmlTag.INITIAL_HEIGHT
    public static INITIAL_WIDTH = 100
    public static INITIAL_HEIGHT = 100
    public static INITIAL_SIZE_UNIT: UnitSize = new Pixel()
    protected initialBackgroundColor = 'red'
    private _backgroundColor = this.initialBackgroundColor;
    private _initialColorUnit: UnitColor = new Named();
    protected widthUnitCurrent: UnitSize = new Pixel()
    protected heightUnitCurrent: UnitSize = new Pixel()

    protected _tmpCssPropertyAccesor: CssPropertyAccessor
    protected _cssPropertyAccesor: HtmlTagPropertyAccessor

    paddingFilter: FilterCssInjector
    marginFilter: FilterCssInjector
    borderFilter: FilterCssInjector
    contentFilter: FilterCssInjector

    paddingRealFetcher: FetcherRealCssProp = new PaddingRealCssFetcher(this)
    marginRealFetcher: FetcherRealCssProp = new MarginRealCssFetcher(this)
    borderRealFetcher: BorderFetcherRealCssProp = new BorderRealCssFetcher(this)

    protected synchronizer: HtmlTagSynchronizer
    api: ApiService
    transformStyleList: VueFixStyleListTransform
    
    constructor()
    {
        super()
        this.initPaddings()
        this.initBorders()
        this.initMargins()
        this._tmpCssPropertyAccesor = new ContentElPropertyAccessor(this)
        this.initCssAccessor()
        this.transformStyleList = new VueFixStyleListTransform(this)

        // console.log(this.paddingRealFetcher);

    }
    
    public setApi(api: ApiService)
    {
        this.api = api
        this.synchronizer = new HtmlTagSynchronizer(this, api)
    }

    public setWithUnit(unit: UnitSize)
    {
        this.widthUnitCurrent = unit
    }
    
    public setHeightUnit(unit: UnitSize)
    {
        this.heightUnitCurrent = unit
    }
    
    public getWithUnit(): UnitSize
    {
        return this.widthUnitCurrent
    }
    
    public getHeightUnit() : UnitSize
    {
        return this.heightUnitCurrent
    }

    public getWidthValue()
    {
        return this.widthUnitCurrent.getValue(this.width)
    }
    
    public getHeightValue()
    {
        return this.heightUnitCurrent.getValue(this.height)
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
        this._cssPropertyAccesor = new HtmlTagPropertyAccessor(this)

        this.paddingFilter = new PaddingFilterCssInjector(this)
        this.marginFilter = new MarginFilterCssInjector(this)
        this.borderFilter = new BorderFilterCssInjector(this)
        this.contentFilter = new ContentFilterCssInjector(this)
        // console.log(`%c${this._width}`, 'font-size: 20px;')
        

    }

    public injectInitialCssStyles()
    {
        let border = new BorderGlobalCss('15', new Pixel())
        border.setType('dotted')
        border.setColor('blue', new Named())
        // console.log('PPPP', border.getValue());
        
        let padding = new PaddingCss('41', new Pixel())
        let margin = new MarginCss('11', new Pixel())
        let width = new Width(this._width, this.widthUnitCurrent)
        let height = new Height(this._height, this.heightUnitCurrent)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let display = new Display(Display.BLOCK, new Named())
        let cssList = [border, padding, margin, width, height, boxSizing, backgroundColor, display]

        this.addPropsToAccessor(cssList)
    }

    public addNewPropertyCss(css: BasePropertyCss)
    {
        this.cssAccessor.addNewProperty(css)
        this.tmpCssAccessor.addNewProperty(css)
    }

    public abstract getTagName(): string

    public addPropsToAccessor(cssList: BasePropertyCss[] )
    {
        for (const cssProp of cssList) {
            this.updateCssPropertyWithoutModel(cssProp.getName(), cssProp)
        }
    }

    public removeCssProperty(prop: BasePropertyCss)
    {
        super.removeCssProperty(prop)
        this.synchronizer.synchronize()
    }

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        super.updateCssPropertyWithoutModel(propName, val)
        if (!this.tmpCssAccessor.hasCssProperty(val.getName())) {
            this.tmpCssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
            if (currentBackground.getValue() === val.getValue()) {
                // return
            }
            this.tmpCssAccessor.setNewPropertyValue(propName, val)
        }
        // console.log('UPDATE');
        
        // if (!this.getHtmlEl()) {
        //     return
        // }
        if (val instanceof BasePaddingCss) {
            this.paddingFilter.injectCssProperty(val)
        } 
        
        if (val instanceof BaseMarginCss) {
            this.marginFilter.injectCssProperty(val)
        }
        
        if (val instanceof BaseBorderCss) {
            this.borderFilter.injectCssProperty(val)
        }
        
        if (val instanceof ContentSizeCss) {
            this.contentFilter.injectCssProperty(val)
        }

        this.synchronizer.synchronize()
        
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

    public setWidth(arg: number)
    {
        this._width = arg
    }
    
    public setHeight(arg: number)
    {
        this._height = arg
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
        // this._backgroundColor = this.initialBackgroundColor
    }
    
    private isLikeBackgroundCss(cssProp: BasePropertyCss): boolean
    {
        return this.cssAccessor.isPropertyLikeThis(cssProp, 'background')
    }

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

    canAddToCssList(css: BasePropertyCss): boolean
    {
        if (css instanceof Display) {
            return true
        }
        
        // if (css instanceof ContentSizeCss) {
        //     return true
        // }
        
        return false
    }

    get cssList() : any
    {
        let css = {}
        for (const cssProp of this._cssPropertyAccesor.all) {
            if (!this.canAddToCssList(cssProp)) {
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
            let width = new Width(this._width, this.widthUnitCurrent)
            css[Width.PROP_NAME] = width.getValue()
        }
        
        if (css[Height.PROP_NAME]) {
            let height = new Height(this._height, this.heightUnitCurrent)
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
            // if (prop instanceof ContentSizeCss) {

            //     let val = this.getComputedCssVal(prop)
            //     console.log('+=======+++');
            //     console.log(val);
                
            //     let clonedCss = _.cloneDeep(prop)
            //     clonedCss.setValue(parseInt(val).toString())
            //     clonedCss.setUnit(new Pixel())
            //     // console.log(newProp);
            //     // console.log(val);
            //     // // console.log(clonedCss);
            //     // console.log('ALA MA');
            //     this.contentFilter.injectCssProperty(clonedCss)
            //     continue
            // }

            if (prop instanceof Width || prop instanceof Height ) {
                // console.log("CONTR_FILTR");
                // console.log(prop);
                
                // let val = this.getComputedCssVal(prop)
                // let clonedCss = _.cloneDeep(prop)
                // console.log(val);
                // clonedCss.setValue(parseInt(val))
                // clonedCss.setUnit(new Pixel())
                // console.log(prop);
                // console.log(val);
                // console.log(clonedCss);
                // console.log('ALA MA');
                this.contentFilter.injectCssProperty(prop)
                continue
            }
            
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
                continue
            }
            
            if (prop instanceof BaseMarginCss) {

                // let val = this.getComputedCssVal(prop)
                // let clonedCss = _.cloneDeep(prop)
                // clonedCss.setValue(parseInt(val).toString())
                // clonedCss.setUnit(new Pixel())
                // // console.log(newProp);
                // // console.log(val);
                // // // console.log(clonedCss);
                // // console.log('ALA MA');
                this.marginFilter.injectCssProperty(prop)
                continue
            }
            
            if (prop instanceof BaseBorderCss) {
                // return
                let val = this.getComputedCssVal(prop)
                let clonedCss = _.cloneDeep(prop)
                // clonedCss.setValue(parseInt(val).toString())
                console.log(val);
                clonedCss.setWidth(parseInt(val).toString(), new Pixel())

                if (prop instanceof BaseBorderCss) {

                    
                    if (prop.getColorUnit()) {
                        clonedCss.setUnit(new Pixel())
                        clonedCss.setWidth(parseInt(val).toString(), new Pixel())
                        clonedCss.setType(prop.getType())
                        clonedCss.setColor(prop.getColor(), prop.getColorUnit())

                    } else {
                        clonedCss.setWidth(parseInt(val).toString(), new Pixel())

                        clonedCss.setValue(val)
                    }
                } else {
                    clonedCss.setValue(val)
                }
                // console.log(newProp);
                // console.log(val);
                // console.log(clonedCss);
                // console.log('ALA MA');
                this.borderFilter.injectCssProperty(clonedCss)
                continue
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
                // this.getHtmlEl().style['margin-left'] = 'auto'
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
        
        // console.log(prop);
        // console.log(prop.getValue());
        // console.log(this.getHtmlEl().style);
        // console.log(this.getHtmlEl());
        // console.log(a);
        // console.log(val);
        // console.log('COMPUTED-END');

        // document.body.removeChild(this.getHtmlEl())
        return val
    }



    get cssBoxList() : any
    {
        if (this.widthUnitCurrent instanceof Percent) {
            // let css = this.cssList
                
            // return css
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
        
        let boxHeight = this._height
        // if (this._backgroundColor) {
            
        // }
        
        // // let backgroundColor = new BackgroundColor(this._backgroundColor, this._initialColorUnit)
        
        // let allCssList = this.cssAccessor
        
        // let height = new Height(boxHeight, this.heightUnitCurrent)
        // try {
        //     if (this.cssAccessor.hasCssProperty(Height.PROP_NAME)) {
        //         // allCssList.setNewPropertyValue(Height.PROP_NAME, height)
                
        //     }
            
        // } catch (e) {
        // }
        // let boxWidth = this._width
        // let width = new Width(boxWidth, this.widthUnitCurrent)
        // try {
        //     if (this.cssAccessor.hasCssProperty(Width.PROP_NAME)) {

        //         // allCssList.setNewPropertyValue(Width.PROP_NAME, width)
        //     }

        // } catch (e) {
        // }
        // allCssList.setNewPropertyValue(BackgroundColor.PROP_NAME, backgroundColor)
        // console.log('AAAAA');

        // console.log(height.getValue());
        
        
        let css = this.cssAccessor.all

        // for (const cssProp of ) {
        //     // if (cssProp instanceof BasePaddingCss) {
        //     //     this.paddingFilter.injectCssProperty(cssProp)
        //     // }
        //     // if (!this.filterCss(cssProp)) {
        //     //     continue
        //     // }
        //     var propCss = cssProp
        //     if (cssProp instanceof Width ||
        //         cssProp instanceof Height
        //         // cssProp instanceof BaseMarginCss ||
        //         // cssProp instanceof BasePaddingCss || 
        //         // cssProp instanceof BaseBorderCss || 
        //         // cssProp instanceof BoxSizing 
        //     ) 
        //     {
                
        //     }
        //     if (cssProp instanceof Width) {
        //         css[cssProp.getName()] = this.widthUnitCurrent.getValue(this._width)
        //     } else if (cssProp instanceof Height) {
        //         css[cssProp.getName()] = this.heightUnitCurrent.getValue(this._height)
        //     } else {
        //         css[cssProp.getName()] = cssProp.getValue()

        //     }
        // }

        return this.transformStyleList.transform(this.cssAccessor.all)
        
        // return css
    }
    
    get cssContentBoxList(): any
    {
        if (this.widthUnitCurrent instanceof Percent) {
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

    public changeAsActiveToManage() {
        this._toManage = true
    }

    public changeAsNotActiveToManage() {
        this._toManage = false
    }

    public isActiveTagToManage(): boolean {
        return this._toManage === true
    }

    private toInitSizeUnits()
    {
        this.widthUnitCurrent = new Pixel()
        this.heightUnitCurrent = new Pixel()
    }

    public onMouseMove(w, h) 
    {
        this.toInitSizeUnits()  
        this._width = w
        this._height = h
    }

    public initSize(w, h) 
    {
        this.toInitSizeUnits()  
        // console.log(w);
        // console.log(h);
        
        this._width = w
        this._height = h

        let width = new Width(this._width, this.widthUnitCurrent)
        let height = new Height(this._height, this.heightUnitCurrent)
        this.updateCssPropertyWithoutModel(width.getName(), width)
        this.updateCssPropertyWithoutModel(height.getName(), height)

        // this.synchronizer.synchronize()

        
    }

    public initWidth(w)
    {
        this.widthUnitCurrent = new Pixel()
        this._width = w
        this.synchronizer.synchronize()

    }
    
    public initHeight(w)
    {
        this.heightUnitCurrent = new Pixel()
        this._height = w
        this.synchronizer.synchronize()

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

    getComputedHeight(): number {
        let val = this.getComputedCssVal(new Height(this._height, this.heightUnitCurrent))
        // let clonedCss = _.cloneDeep(newProp)
        // clonedCss.setValue(val.toString())
        return parseInt(val)
    }
    getComputedWidth(): number {
        let val = this.getComputedCssVal(new Width(this._width, this.widthUnitCurrent))
        // let clonedCss = _.cloneDeep(newProp)
        return parseInt(val)
    }


}