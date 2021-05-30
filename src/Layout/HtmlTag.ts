import Percent from '../Unit/Size/Percent';
import Pixel from "../Unit/Size/Pixel";
import UnitSize from '~/src/Unit/UnitSize';
import UnitColor from "../Unit/UnitColor";
import Named from "../Unit/Named";
import SizeActivable from "../SizeActivable";
import BorderModel from "./Border/BorderModel";
import CssPropertyAccessor from '../Css/CssPropertyAccessor';
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
import MarginFilterCssInjector from "../FilterCssInjector/MarginFilterCssInjector";
import MarginCss from "../Css/BoxModel/Margin/MarginCss";
import BaseMarginCss from "../Css/BoxModel/BaseMarginCss";
import MarginRealCssFetcher from "../Css/RealCssProp/MarginRealCssFetcher";
import _ from 'lodash'
import BorderRealCssFetcher from "../Css/RealCssProp/BorderRealCssFetcher";
import BorderGlobalCss from "../Css/Border/Global/BorderGlobalCss";
import BoxSizing from '../Css/BoxModel/BoxSizing';
import BaseBorderCss from "../Css/Border/BaseBorderCss";
import BorderFilterCssInjector from "../FilterCssInjector/BorderFilterCssInjector";
import Display from '../Css/Display/Display';
import ApiService from "../Api/ApiService";
import ContentFilterCssInjector from "../FilterCssInjector/ContentFilterCssInjector";
import ContentSizeCss from '../Css/Size/ContentSizeCss';
import ActivableTagToManage from "../ActivableTagToManage";
import HtmlTagPropertyAccessor from '../Css/PropertyAccessor/HtmlTagPropertyAccessor';
import HtmlTagSynchronizer from "../Synchronizer/Impl/HtmlTagSynchronizer";
import HtmlNode from "./HtmlNode";
import BorderFetcherRealCssProp from "../BorderFetcherRealCssProp";
import { VueFixStyleListTransform } from "../Vue/VueFixStyleListTransform";
import AttributesAccessor from "../Attribute/AttributesAccessor";
import DefaultAttributesAccessor from '../Attribute/impl/DefaultAttributesAccessor';
import BoxShadowCss from '../Css/Shadow/BoxShadowCss';
import PositionCss from '../Css/Display/PositionCss';
import RealPositionCalculator from "../PositionCss/RealPositionCalculator";
import LeftCss from '../Css/Display/Direction/LeftCss';
import ActivableTagToPosition from "../ActivableTagToPosition";
import { RightCss, TopCss, BottomCss, PaddingRightCss, MarginLeftCss, MarginRightCss, BorderLeftWidth, MarginBottomCss, MarginTopCss, PaddingBottomCss, BorderBottomWidth, BorderTopWidth, PaddingTopCss } from "../Css";
import Vue from "vue";
import BorderRightWidth from '../Css/Border/Right/BorderRightWidth';
import PseudoClassPropertyAccessor from "../Css/PropertyAccessor/pseudoSelector/PseudoClassPropertyAccessor";
import PseudoElementPropertyAccessor from "../Css/PropertyAccessor/pseudoSelector/PseudoElementPropertyAccessor";
import Hover from '../PseudoSelector/PseudoClass/Hover';
import CssListAndOveride from "./CssListAndOverride";
import SelectorOwner from "../SelectorOwner";
import DecisionsCssFacade from "../DecisionManager/DecisionsCssFacade";
import MediaQueryAccessor from "~/src/MediaQuery/MediaQueryAccessor";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import MediaQueryListOwner from "~/src/Css/PropertyAccessor/mediaQuery/MediaQueryListOwner";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryTag from "~/src/MediaQuery/headSection/MediaQueryTag";
import LayoutCreatorModeComponent from "~/components/LayoutCreatorModeComponent.vue";
import BaseMediaQueryComponent from "~/components/BaseMediaQueryComponent";
import HtmlAttrOwner from "../HtmlAttrOwner";
import CssOwner from '../CssOwner';
import ActivableTagToAnimation from '../ActivableTagToAnimation';
import KeyFrameSelector from '../Animation/KeyFrameSelector';
import BaseSelector from '../BaseSelector';
import TransformCss from '../Css/ThreeDimensional/TransformCss';
import { html } from 'js-beautify';

export default abstract class HtmlTag extends HtmlNode implements
    CssListAndOveride, SizeActivable, ActivableTagToManage, ActivableTagToPosition, ActivableTagToAnimation, SelectorOwner, HtmlAttrOwner, CssOwner
{
    public isElementOfTable() {
        return false
    }
    cssListMediaOwner: MediaQueryListOwner<HtmlTag>

    protected _tag = 'h1'
    protected _innerText: string = 'Example text from abstract HtmlTag class'
    protected _parent : HtmlTag
    hasMiddleTag : boolean = false
    isTableTag : boolean = false
    isTableCellTag : boolean = false

    borderFactory: BorderModelFactory = new BorderModelFactory()
    paddingFactory: PaddingModelFactory = new PaddingModelFactory()
    marginFactory: MarginModelFactory = new MarginModelFactory()

    layoutCreatorMode: LayoutCreatorModeComponent
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

    protected _updateFlag = false

    protected _toManage = false
    protected _toPosition = false
    protected _readyToAnimationCheck = false
    protected _checkedToAnimation = false

    protected _startedAnimation = false

    protected _widthToRealInject: any = null
    protected _heightToRealInject: any = null

    protected _width = null
    protected _height = null
    public static INITIAL_WIDTH = 100
    public static INITIAL_HEIGHT = 100
    public static INITIAL_SIZE_UNIT: UnitSize = new Pixel()
    protected initialBackgroundColor = 'green'
    protected _backgroundColor = this.initialBackgroundColor;
    protected _initialColorUnit: UnitColor = new Named();
    protected widthUnitCurrent: UnitSize = new Pixel()
    protected heightUnitCurrent: UnitSize = new Pixel()

    protected _tmpCssPropertyAccesor: CssPropertyAccessor
    protected _cssPropertyAccesor: CssPropertyAccessor

    protected _pseudoClassAccessor: PseudoClassPropertyAccessor
    protected _pseudoElementAccessor: PseudoElementPropertyAccessor


    protected _attributeAccesor: AttributesAccessor
    protected _animationSelector: KeyFrameSelector = null

    paddingFilter: FilterCssInjector
    marginFilter: FilterCssInjector
    borderFilter: FilterCssInjector
    contentFilter: FilterCssInjector

    lastSetWidthPx: number = null
    lastSetHeightPx: number = null
    paddingRealFetcher: FetcherRealCssProp = new PaddingRealCssFetcher(this)
    marginRealFetcher: FetcherRealCssProp = new MarginRealCssFetcher(this)
    borderRealFetcher: BorderFetcherRealCssProp = new BorderRealCssFetcher(this)

    synchronizer: HtmlTagSynchronizer
    api: ApiService
    transformStyleList: VueFixStyleListTransform

    protected _realPositionCalculator: RealPositionCalculator

    protected _isClosingTag = true
    protected _isInput = false
    protected _hasPosition = false
    protected _hasAbsolute = false
    protected _hasFixed = false
    protected _displayNone = false
    protected _visibilityHidden = false
    protected _positionPropName = ''

    protected _widthCalc: string = 'calc(100%)'
    protected _widthBoxCalc: string = null
    protected _heightCalc: string = 'calc(100%)'

    decisionCssFacade: DecisionsCssFacade = new DecisionsCssFacade(this)

    protected _boundingClientRectLeftPixel: number
    protected _boundingClientRectTopPixel: number
    protected _boundingClientRectRightPixel: number
    protected _boundingClientRectBottomPixel: number

    protected defaultBoxSizing: BoxSizing

    constructor()
    {
        super()
        this.defaultBoxSizing = BoxSizing.NEW_BORDER_BOX()
        this.initPaddings()
        this.initBorders()
        this.initMargins()
        // this.decisionCssFacade = new DecisionsCssFacade(this)
        this._tmpCssPropertyAccesor = new HtmlTagPropertyAccessor(this)
        this.initCssAccessor()
        this.initPseudoSelectors()
        this.transformStyleList = new VueFixStyleListTransform(this)
        this._attributeAccesor = new DefaultAttributesAccessor(this)
        this._realPositionCalculator = new RealPositionCalculator(this)

        // console.log(this.paddingRealFetcher);

    }

    get widthToRealInject() {
        return this._widthToRealInject
    }
    
    set widthToRealInject(arg) {
        this._widthToRealInject = arg
    }
    
    get heightToRealInject() {
        return this._heightToRealInject
    }
    
    set heightToRealInject(arg) {
        this._heightToRealInject = arg
    }

    public hideElement() {
        this.displayNone = true
    }
    
    public showElement() {
        this.displayNone = false
    }

    get displayNone() {
        return this._displayNone
    }
    
    set displayNone(arg) {
        this._displayNone = arg
    }
    
    get visibilityHidden() {
        return this._visibilityHidden
    }
    
    set visibilityHidden(arg) {
        this._visibilityHidden = arg
    }
    
    
    get animationSelector() {
        return this._animationSelector
    }
    
    set animationSelector(arg) {
        this._animationSelector = arg
    }
    

    getUUID(): string {
        return this.uuid
    }

    setMediaQueryAccessor(value: MediaQueryAccessor<MediaQueryCss>) {
        this.cssListMediaOwner = new MediaQueryListOwner<HtmlTag>(this, value)
    }

    public calcRealContentHeight(){
        var realHeightPx = 0
        var boxSizing = this.cssAccessor.getProperty(BoxSizing.PROP_NAME)
        if (!boxSizing) {
            boxSizing = this.defaultBoxSizing
        }

        var compHeight = this.getComputedHeight()

        switch(boxSizing.getValue()) {
            case BoxSizing.BORDER_BOX:
                var topBorder = this.getComputedBorderTopWidth()
                var bottomBorder = this.getComputedBorderTopWidth()
                var topPadding = this.getComputedPaddingTop()
                var bottomPadding = this.getComputedPaddingTop()
                return  compHeight - topPadding - bottomPadding - topBorder - bottomBorder
            case BoxSizing.PADDING_BOX:
                var topPadding = this.getComputedPaddingTop()
                var bottomPadding = this.getComputedPaddingTop()
                return  compHeight - topPadding - bottomPadding
            case BoxSizing.CONTENT_BOX:
                return  compHeight
            default :
                throw Error('NOt set Box sizing for calcualate calcRealContentHeight')
        }
    }

    get selectorLiteral()
    {
        return '#' + this.shortUUID
    }

    notifyPositionalTag()
    {
        // console.log('asd');
        // console.log(this.children.length);
        for (const child of this.children) {
            // console.log(child);
            if (child instanceof HtmlTag) {
                // if (!child.hasPosition) {
                // console.log('hasPosition');
                Vue.nextTick(() => {
                    // setTimeout(() => {

                    child.notifyPositionalTag()
                    child.changeUpdateFlag()
                    //     child.updateModelComponent()
                    // }, 0)

                })
                // }
            }
        }



        this._realPositionCalculator.updateNearPositionalTag()
    }

    public reInitDefaultPosition()
    {
        var activeSelector = this.selectedSelector
        if (activeSelector) {
            activeSelector.realPositionCalculator.reInitDefaultPosition()
        }
        this.realPositionCalculator.reInitDefaultPosition()
    }

    public updatePositionProps()
    {
        var activeSelector = this.selectedSelector
        if (activeSelector) {
            activeSelector.realPositionCalculator.updateProps()
        }
        this.realPositionCalculator.updateProps()
    }

    get pseudoClassAccessor(): PseudoClassPropertyAccessor
    {
        return this._pseudoClassAccessor
    }

    get pseudoElementAccessor(): PseudoElementPropertyAccessor
    {
        return this._pseudoElementAccessor
    }

    get realPositionCalculator()
    {
        return this._realPositionCalculator
    }

    get updateFlag()
    {
        return this._updateFlag
    }

    set updateFlag(arg: boolean)
    {
        this._updateFlag = arg
    }


    changeUpdateFlag()
    {
        this.updateFlag = !this.updateFlag
    }

    get parent(): HtmlTag
    {
        return this._parent
    }

    set parent(arg: HtmlTag)
    {
        this._parent = arg
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
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            activeSelector.hasPosition = arg
        }
        this._hasPosition = arg
    }

    public updatePositionName(prop?: PositionCss)
    {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            activeSelector.updatePositionName(prop)
        }

        if (prop) {
            this.positionPropName = prop.getClearValue()

        } else {
            this.positionPropName = null
        }

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

    get widthBoxCalc(): string
    {
        return this._widthBoxCalc
    }

    set widthBoxCalc(arg)
    {
        this._widthBoxCalc = arg
    }

    get heightCalc(): string
    {
        return this._heightCalc
    }

    set heightCalc(arg)
    {
        this._heightCalc = arg
    }

    get isInput(): boolean
    {
        return this._isInput
    }

    set isInput(arg)
    {
        this._isInput = arg
    }

    get isClosingTag(): boolean
    {
        return this._isClosingTag
    }

    set isClosingTag(arg)
    {
        this._isClosingTag = arg
    }

    public setApi(api: ApiService)
    {
        this.api = api
        this.synchronizer = new HtmlTagSynchronizer(this, api)
    }

    public setWidthUnit(unit: UnitSize)
    {
        this.widthUnitCurrent = unit
        this.lastSetWidthPx = this.getComputedWidth()

    }

    public setHeightUnit(unit: UnitSize)
    {
        this.heightUnitCurrent = unit
        this.lastSetHeightPx = this.getComputedHeight()

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
    
    get widthValue()
    {
        return this.widthUnitCurrent.getValue(this.width)
    }

    public getHeightValue()
    {
        return this.heightUnitCurrent.getValue(this.height)
    }

    public updateHasPosition(prop: BasePropertyCss)
    {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            activeSelector.updateHasPosition(prop)
        }
        if (!(prop instanceof PositionCss)) {
            return
        }
        this.notifyPositionalTag();
        
        this.updatePositionName(prop)

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

    protected initPseudoSelectors()
    {
        this._pseudoElementAccessor = new PseudoElementPropertyAccessor(this)
        this._pseudoClassAccessor = new PseudoClassPropertyAccessor(this)
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

    public injectInitialSelectors()
    {
        let hover = new Hover(this)
        hover.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)

        // console.log('PPPP', border.getValue());

        let backgroundColor = new BackgroundColor('blue', new Named())
        hover.setCss(backgroundColor)

        this.pseudoClassAccessor.addNewSelector(hover)
    }

    public injectInitialCssStyles()
    {
        let border = new BorderGlobalCss('15', new Pixel())
        border.setType('dotted')
        border.setColor('blue', new Named())
        // console.log('PPPP', border.getValue());

        let padding = new PaddingCss('41', new Pixel())
        let margin = new MarginCss('11', new Pixel())
        let width = new Width(HtmlTag.INITIAL_WIDTH, HtmlTag.INITIAL_SIZE_UNIT)
        let height = new Height(HtmlTag.INITIAL_HEIGHT, HtmlTag.INITIAL_SIZE_UNIT)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let display = new Display(Display.BLOCK, new Named())
        let cssList = [ padding, width, height, boxSizing, backgroundColor, display]

        this.addPropsToAccessor(cssList)
    }

    public addNewPropertyCss(css: BasePropertyCss)
    {
        this.cssAccessor.addNewProperty(css)
        if (!this.tmpCssAccessor.hasCssProperty(css.getName())) {
            this.tmpCssAccessor.addNewProperty(css)

        }
    }

    public abstract getTagName(): string
    public abstract getDomainTagName(): string

    public addPropsToAccessor(cssList: BasePropertyCss[] )
    {
        for (const cssProp of cssList) {
            this.updateCssPropertyWithoutModel(cssProp.getName(), cssProp)
        }
    }

    get selectedMedia(): BaseMediaQueryCss
    {
        if (!this.cssListMediaOwner) {
            return null
        }
        return  this.cssListMediaOwner.selectedMedia
    }

    public removeCssProperty(prop: BasePropertyCss)
    {
        if (this.selectedMedia) {
            this.cssListMediaOwner.removeCssFromMedia(prop)
        } else {
            super.removeCssProperty(prop)

        }
        this.synchronizer.synchronize()
    }

    public getPropertyCss(prop: string)
    {
        if (this.selectedMedia) {
            // console.log('getPropertyCss', prop)
            return this.cssListMediaOwner.getProperty(prop)
        }

        return this.cssAccessor.getProperty(prop)
    }

    public removeCssPropertyByName(propName: string)
    {
        // super.removeCssProperty(prop)
        if (this.selectedMedia) {
            this.cssListMediaOwner.removePropWithName(propName)
        } else {
            this.cssAccessor.removePropWithName(propName);
            var prop = this.tmpCssAccessor.getProperty(propName);
            if (prop) {
                prop.id = null
                prop.setActive(false)
            }

        }
        this.synchronize()
    }

    get cssAccessor(): CssPropertyAccessor
    {
        return this._cssPropertyAccesor
    }

    public updateTmpCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            activeSelector.updateTmpCssPropertyWithoutModel(propName, val)
            return
        }

        if (this.selectedMedia) {
            this.cssListMediaOwner.setNewValCssForMediaTmp(val)
        } else {
            if (!this.tmpCssAccessor.hasCssProperty(val.getName())) {
                this.tmpCssAccessor.addNewProperty(val)
            } else {
                let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
                if (currentBackground.getValue() === val.getValue()) {
                    // return
                }
                this.tmpCssAccessor.setNewPropertyValue(propName, val)
            }

        }
    }

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        var activeSelector = this.selectedSelector
        // console.log(activeSelector);
        
        if (activeSelector) {
            activeSelector.updateCssPropertyWithoutModel(propName, val)
            return
        }

        if (this.selectedMedia) {
            this.cssListMediaOwner.setNewValCssForMedia(val)
        } else {
            super.updateCssPropertyWithoutModel(propName, val)
            this.updateTmpCssPropertyWithoutModel(propName, val)

            // if (!this.cssAccessor.hasCssProperty(val.getName())) {
            //     this.cssAccessor.addNewProperty(val)
            // } else {
            //     let currentBackground = this.cssAccessor.getProperty(val.getName())
            //     if (currentBackground.getValue() === val.getValue()) {
            //         // return
            //     }
            //     this.cssAccessor.setNewPropertyValue(propName, val)
            // }

        }


        this.synchronizeCssStyle(val)


    }

    public synchronizeAllCssStyles()
    {
        var accesor = this.getCurrentCssAccessor()

        for(var el of accesor.all) {
            this.synchronizeCssStyle(el)
        }
    }

    public synchronizeCssStyle(val: BasePropertyCss)
    {
        if (val instanceof BasePaddingCss || val instanceof BasePaddingCss || val instanceof BaseBorderCss || val instanceof ContentSizeCss) {
            // this.updateBoundingRight()
            // this.realPositionCalculator.reInitDefaultPosition()
        }

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


        this.synchronize()
    }

    get tmpCssAccessor(): CssPropertyAccessor
    {
        return this._tmpCssPropertyAccesor
    }

    get attributeAccessor(): AttributesAccessor
    {
        return this._attributeAccesor
    }

    get width()
    {
        return this._width
    }
    
    get widthUnit()
    {
        return this.widthUnitCurrent
    }

    get height()
    {
        return this._height
    }

    get heightUnit()
    {
        return this.heightUnitCurrent
    }

    public clearHeight() {

        this._height = null
        this.lastSetWidthPx = this.getComputedWidth()
    }
    
    public clearWidth() {

        this._width = null
        this.lastSetWidthPx = this.getComputedWidth()
    }
    public setWidth(arg: number)
    {
        this._width = arg
        this.lastSetWidthPx = this.getComputedWidth()

    }

    public setHeight(arg: number)
    {
        this._height = arg
        this.lastSetHeightPx = this.getComputedHeight()

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
        return `( ${this.getDomainTagName()} )`
    }

    public changeAsActiveSize()
    {

        this._backgroundColor = 'aqua'

    }

    public changeAsDeactiveSize()
    {
        // this._backgroundColor = this.initialBackgroundColor
    }

    public isLikeBackgroundCss(cssProp: BasePropertyCss): boolean
    {
        return this.cssAccessor.isPropertyLikeThis(cssProp, 'background')
    }

    canAddToCssList(css: BasePropertyCss): boolean
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

        if (css instanceof ContentSizeCss) {
            return false
        }

        if (css instanceof BoxShadowCss) {
            return false
        }

        if (css instanceof PositionCss) {
            return false
        }
        
        if (css instanceof TransformCss) {
            return false
        }


        if (css instanceof LeftCss || css instanceof RightCss || css instanceof TopCss || css instanceof BottomCss) {
            return false
        }

        return this.canApplyCss(css.getName())
    }

    get layoutMode() {
        if (!this.layoutCreatorMode) {
            return null
        }

        // @ts-ignore
        return this.layoutCreatorMode.mode
    }

    public canApplyCss(cssName: string) {
        // @ts-ignore
        if (this.layoutMode) {
            // @ts-ignore
            if (!this.decisionCssFacade.canManageCssInMode(cssName, this.layoutMode)) {
                return false

            }
        }

        return true
    }

    public onApplyCss(cssNameList: {}){
        
        for (const key in cssNameList) {
            if (Object.prototype.hasOwnProperty.call(cssNameList, key)) {
                const element = cssNameList[key];
                if (!this.canApplyCss(key)) {
                    delete cssNameList[key]
                }
            }
        }
        
    }

    public on

    get pseudoSelectorsList() : any
    {
        let pseudoSelectors = {}
        for (const selectorClass of this.pseudoClassAccessor.all) {

            pseudoSelectors[selectorClass.value] = selectorClass.cssAccessor.all

        }

        for (const element of this.pseudoElementAccessor.all) {

            pseudoSelectors[element.value] = element.cssAccessor.all

        }

        // console.log('COMP-SELECTORS');
        // console.log(pseudoSelectors);

        return pseudoSelectors
    }

    get mediaQueryWithElements() : MediaQueryTag[]
    {
        let pseudoSelectors = []
        for (const k in this.cssListMediaOwner.mediaQueryCssList) {
            var el = this.cssListMediaOwner.mediaQueryCssList[k]
            if (!el.all.length) {
                continue
            }
            var m = new MediaQueryTag(el.mediaQuery, this.selectorLiteral, el.all)
            pseudoSelectors.push(m)

        }

        for (const selectorClass of this.pseudoClassAccessor.all) {

            // pseudoSelectors[selectorClass.value] = selectorClass.cssAccessor.all

            for (const kPK in selectorClass.cssListMediaOwner.mediaQueryCssList) {
                var elPseudoClass = selectorClass.cssListMediaOwner.mediaQueryCssList[kPK]
                if (!elPseudoClass.all.length) {
                    continue
                }
                var m = new MediaQueryTag(elPseudoClass.mediaQuery, selectorClass.value, elPseudoClass.all)
                pseudoSelectors.push(m)

            }

        }

        //
        // for (const element of this.pseudoElementAccessor.all) {
        //
        //     pseudoSelectors[element.value] = element.cssAccessor.all
        //
        // }

        // console.log('COMP-SELECTORS');
        // console.log(pseudoSelectors);

        return pseudoSelectors
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

    public updateRealView() {
        
    }

    // get cssContentSizeList() : any
    // {
    //     return {
    //         width: `${this._width}${this.sizeUnitCurrent.value}`,
    //         height: `${this._height}${this.sizeUnitCurrent.value}`,
    //     }
    // }

    resetFilterTagElements()
    {
        // this.contentFilter.resetAll()
        this.paddingFilter.resetAll()
        this.borderFilter.resetAll()
        this.marginFilter.resetAll()

    }

    recalculateRealComputedHtmlAttrs() {
        // var list = this.attributeAccessor.all

        // for (const prop of list) {

        // }

    }

    setLayoutMode(arg) {
        this.layoutCreatorMode = arg
    }

    recalculateRealComputedProperties()
    {
        var cssAll = this.cssAccessor.all
        if (this.getCurrentCssAccessor()) {
            cssAll = this.getCurrentCssAccessor().all
            // console.log('recalculateRealComputedProperties', this.getCurrentCssAccessor())
            // console.log('med', this.selectedMedia)
        }
        for (const prop of cssAll) {

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
                let clonedCss = prop.deepCopy(prop)
                clonedCss.setValue(parseInt(val).toString())
                clonedCss.setUnit(new Pixel())
                // console.log('ALA MA START');
                // console.log(prop);
                // console.log(clonedCss);
                // console.log(val);
                // console.log(clonedCss);
                // console.log('ALA MA END');
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
                let clonedCss: BaseBorderCss = <BaseBorderCss>prop.deepCopy(prop)
                // clonedCss.setValue(parseInt(val).toString())
                // console.log(val);
                clonedCss.setWidth(parseInt(val), new Pixel())

                if (prop instanceof BaseBorderCss) {


                    if (prop.getColorUnit()) {
                        clonedCss.setUnit(new Pixel())
                        clonedCss.setWidth(parseInt(val), new Pixel())
                        clonedCss.setType(prop.getType())
                        clonedCss.setColor(prop.getColor(), prop.getColorUnit())

                    } else {
                        clonedCss.setWidth(parseInt(val), new Pixel())

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

    public getComputedCssValFromHiddenOutsite(prop: BasePropertyCss): string{
        // @ts-ignore
        if (typeof prop.isAuto === 'function') {
            // @ts-ignore
            if (prop.isAuto()) {
                this.getHtmlElOutsiteHidden().style[prop.getName()] = 'auto'
                // this.getHtmlEl().style['margin-left'] = 'auto'
                // throw Error('AJAJAJA')
            } else {
                this.getHtmlElOutsiteHidden().style[prop.getName()] = prop.getValue()

            }

        } else {
            this.getHtmlElOutsiteHidden().style[prop.getName()] = prop.getValue()

        }
        var a = window.getComputedStyle(this.getHtmlElOutsiteHidden())
        var val = a.getPropertyValue(prop.getName())
        // this.getHtmlEl().removeAttribute('style')

        return val
    }

    public getComputedCssValFromHidden(prop: BasePropertyCss): string{
        // @ts-ignore
        if (typeof prop.isAuto === 'function') {
            // @ts-ignore
            if (prop.isAuto()) {
                this.getHtmlElHidden().style[prop.getName()] = 'auto'
                // this.getHtmlEl().style['margin-left'] = 'auto'
                // throw Error('AJAJAJA')
            } else {
                this.getHtmlElHidden().style[prop.getName()] = prop.getValue()

            }

        } else {
            this.getHtmlElHidden().style[prop.getName()] = prop.getValue()

        }
        var a = window.getComputedStyle(this.getHtmlElHidden())
        var val = a.getPropertyValue(prop.getName())
        // this.getHtmlEl().removeAttribute('style')

        return val
    }
    public getComputedCssVal(prop: BasePropertyCss): string
    {
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


    get cssList() : any
    {
        let css = {}
        var cssFormAccessor = cssFormAccessor = this._cssPropertyAccesor.all


        for (const cssProp of cssFormAccessor) {
            if (!this.canAddToCssList(cssProp)) {
                continue
            }

            if (!cssProp.injectable) {
                continue
            }
            if (this.isLikeBackgroundCss(cssProp)) {
                continue
            }
            css[cssProp.getName()] = cssProp.value

            if (cssProp instanceof FontSize) {
                this._innerText = 'Font-size: ' + cssProp.getValue()
            }
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

        // console.log('APPPPPPPPPPPPP');
        // console.log(css);


        return css

    }

    get cssListMediaQuery() : any
    {
        let css = {}
        var cssFormAccessor = []

        if (this.selectedMedia) {
            // var css = {}
            console.log(this.selectedMedia)
            console.log(this.pseudoClassAccessor.selectedSelector)
            console.log(this.cssListMediaOwner.currentCssList)
            console.log(this.cssListMediaOwner.currentCssList.all)
            cssFormAccessor = this.cssListMediaOwner.currentCssList.all
        }
        for (const cssProp of cssFormAccessor) {
            if (!this.canAddToCssList(cssProp)) {
                continue
            }

            if (!cssProp.injectable) {
                continue
            }
            if (this.isLikeBackgroundCss(cssProp)) {
                continue
            }
            css[cssProp.getName()] = cssProp.value

            if (cssProp instanceof FontSize) {
                this._innerText = 'Font-size: ' + cssProp.getValue()
            }
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

        // console.log('APPPPPPPPPPPPP');
        // console.log(css);


        return css

    }

    get cssListOverride() : any
    {
        var activeSelector = this.selectedSelector

        if (activeSelector) {

            return activeSelector.cssList
        }

        return {}

    }

    get cssBoxList() : any {
        if (this.widthUnitCurrent instanceof Percent) {
            // let css = this.cssList

            // return css
            // return {
            //     width: `${this._width}${this.sizeUnitCurrent.value}`,
            //     height: `${this._height}${this.sizeUnitCurrent.value}`,
            // }
        }
        var cssFormAccessor = cssFormAccessor = this._cssPropertyAccesor.all

        let borderLeftWidth = this.borderLeft.width
        let borderRightWidth = this.borderRight.width
        let borderTopWidth = this.borderTop.width
        let borderBottomWidth = this.borderBottom.width

        var paddingLeftWidth, paddingRightWidth, paddingTopWidth, paddingBottomWidth
        if (this.paddingLeft.isActive() && this.getHtmlEl()) {

        }


        paddingLeftWidth = this.paddingLeft.isActive() ? this.paddingLeft.width : 0
        paddingRightWidth = this.paddingRight.isActive() ? this.paddingRight.width : 0
        paddingTopWidth = this.paddingTop.isActive() ? this.paddingTop.width : 0
        paddingBottomWidth = this.paddingBottom.isActive() ? this.paddingBottom.width : 0

        let marginLeftWidth = this.marginLeft.width
        let marginRightWidth = this.marginRight.width
        let marginTopWidth = this.marginTop.width
        let marginBottomWidth = this.marginBottom.width

        let boxHeight = this._height

        let css = this.cssAccessor.all

        let cssToBox = []

        if (this._hasAbsolute || this.hasFixed) {
            var replacedCss = {}

            replacedCss['left'] = 'calc(' + this.realPositionCalculator.realLeftCalc + ')'
            replacedCss['top'] = 'calc(' + this.realPositionCalculator.realTopCalc + ')'
            replacedCss['right'] = 'calc(' + this.realPositionCalculator.realRightCalc + ')'
            replacedCss['bottom'] = 'calc(' + this.realPositionCalculator.realBottomCalc + ')'

            this.transformStyleList.setReplacedCss(replacedCss)

        }
        var a = this.transformStyleList.transform(this.cssAccessor.all)
        // console.log('cssBoxList', a);
        
        this.onApplyCss(a)

        // a = this.transformStyleList.transform(this.cssAccessor.all)
        // console.log('APPPPPPPPPPPPP');
        // console.log(a);

        // console.log('LIST-box');
        // console.log(a);

        return a

        // return css
    }

    get middleTagCss() {
        return []
    }

    get cssBoxListMediaQuery() : any
    {
        if (this.selectedMedia) {
            // console.log('cssBoxListMediaQuery')
            // console.log(this.cssListMediaOwner)
            //             console.log(this.cssListMediaOwner.currentCssList.all)
            // this.transformStyleList.setAllImportant(true)
            var a = this.transformStyleList.transform(this.cssListMediaOwner.currentCssList.all)
            // console.log('new css', a)
            this.onApplyCss(a)

            return  a
        }

        return {}
    }

    get cssBoxListOverride() : any
    {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            // console.log('LIST-box-Override');
            // console.log(activeSelector.cssBoxList);
            return activeSelector.cssBoxList
        }

        return {}
    }



    get innerText() : string
    {
        return this._innerText
    }

    set innerText(text: string)
    {
        this._innerText = text
    }

    get toManage(){
        return this._toManage
    }

    changeAsNotReadyToAnimationCheck()
    {
        this._readyToAnimationCheck = false
    }
    changeAsReadyToAnimationCheck(): any {
        this._readyToAnimationCheck = true
    }
    public changeAsActiveToManage() {
        this._toManage = true
    }
    
    public changeAsActiveToAnimation() {
        this._checkedToAnimation = true
        this.showElement()
    }
    public changeAsStartAnimation() {
        this._startedAnimation = true
    }

    public changeAsNotActiveToManage() {
        this._toManage = false
    }
    
    public changeAsNotActiveToAnimation() {
        this._checkedToAnimation = false
    }

   
    public changeAsStopAnimation() {
        this._startedAnimation = false
    }
    public isReadyToStartAnimation(): boolean {
        return this._startedAnimation === true
    }

    public isActiveTagToManage(): boolean {
        return this._toManage === true
    }
    
    public isReadyToAnimationCheck(): boolean {
        return this._readyToAnimationCheck === true
    }
    
    public isActiveTagToAnimation(): boolean {
        return this._checkedToAnimation === true
    }

    public changeAsActiveToPosition() {
        this._toPosition = true
    }

    public changeAsNotActiveToPosition() {
        this._toPosition = false
    }

    public isActiveTagToPosition(): boolean {
        return this._toPosition === true
    }

    protected toInitSizeUnits()
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

        this.lastSetWidthPx = this.getComputedWidth()
        this.lastSetHeightPx = this.getComputedHeight()

        this.notifyPositionalTag()

    }

    public initPos(x, y)
    {
        if (this.hasAbsolute || this.hasFixed) {
            this.realPositionCalculator.leftUnit = new Pixel()
            this.realPositionCalculator.topUnit = new Pixel()
            this.realPositionCalculator.realLeftCalc = x
            this.realPositionCalculator.realTopCalc = y

        } else {
            var left = new LeftCss(x, new Pixel())
            var top = new TopCss(y, new Pixel())
            this.updateCssPropertyWithoutModel(left.getName(), left)
            this.updateCssPropertyWithoutModel(top.getName(), top)
        }


    }

    public initWidth(w)
    {
        this.widthUnitCurrent = new Pixel()
        this._width = w
        this.lastSetWidthPx = this.getComputedWidth()
        this.synchronizer.synchronize()

    }

    public initHeight(w)
    {
        this.heightUnitCurrent = new Pixel()
        this._height = w
        this.synchronizer.synchronize()
        this.lastSetHeightPx = this.getComputedHeight()


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
        this.notifyPositionalTag()
        this.recalculateRealComputedProperties()


        this._boundingClientRectLeftPixel = this.getHtmlEl().getBoundingClientRect().left
        this._boundingClientRectRightPixel = this.getHtmlEl().getBoundingClientRect().right
        this._boundingClientRectTopPixel = this.getHtmlEl().getBoundingClientRect().top
        this._boundingClientRectBottomPixel = this.getHtmlEl().getBoundingClientRect().bottom
    }

    getComputedHeight(): number {
        return this.getComputedVal(Height.PROP_NAME)

    }
    getComputedWidth(): number {
        return this.getComputedVal(Width.PROP_NAME)
    }
    
    getComputedHiddenOutsiteWidth(): number {
        return Number(this.getComputedCssValFromHiddenOutsite(new Width(this.width, this.widthUnit)))
    }
    
    getComputedClientWidth(): number {
        // console.log('getComputedClientWidth')
        if (!this.getHtmlElOutsiteHidden()) {
            // console.log('EL NOT')
            return 0
        }
        console.log(this.getHtmlElOutsiteHidden())
        this.getHtmlElOutsiteHidden().style[Width.PROP_NAME] = this.getWidthValue()
        
        // var a = window.getComputedStyle(this.getHtmlEl())
        var val = this.getHtmlElOutsiteHidden().clientWidth
        // this.getHtmlEl().style[Width.PROP_NAME] = 'unset'

        // console.log('EL val', val)
        // console.log('EL val', parseInt(val))
        if (val) {
            return val
        }

        return 0
    }

    getComputedOffsetWidth(): number {
        // console.log('getComputedOffsetWidth', this.getDomainTagName())
        if (!this.getHtmlElOutsiteHidden()) {
            // console.log('EL NOT')
            return 0
        }
        this.getHtmlElOutsiteHidden().style[Width.PROP_NAME] = this.getWidthValue()
        
        // var a = window.getComputedStyle(this.getHtmlEl())
        var val = this.getHtmlElOutsiteHidden().offsetWidth
        // this.getHtmlEl().style[Width.PROP_NAME] = 'unset'
        // console.log('EL val', val)
        // console.log('EL val', parseInt(val))
        if (val) {
            return val
        }

        return 0
    }

    getComputedOffsetHeight(): number {
        // console.log('getComputedOffsetWidth', this.getDomainTagName())
        if (!this.getHtmlElOutsiteHidden()) {
            // console.log('EL NOT')
            return 0
        }
        this.getHtmlElOutsiteHidden().style[Height.PROP_NAME] = this.getHeightValue()
        
        // var a = window.getComputedStyle(this.getHtmlEl())
        var val = this.getHtmlElOutsiteHidden().offsetHeight
        // this.getHtmlEl().style[Width.PROP_NAME] = 'unset'
        // console.log('EL val', val)
        // console.log('EL val', parseInt(val))
        if (val) {
            return val
        }

        return 0
    }

    getComputedMarginRight(): number {
        return this.getComputedVal(MarginRightCss.PROP_NAME)
    }

    getComputedMarginLeft(): number {
        return this.getComputedVal(MarginLeftCss.PROP_NAME)
    }

    getComputedPaddingRight(): number {
        return this.getComputedVal(PaddingRightCss.PROP_NAME)
    }

    getComputedPaddingLeft(): number {
        return this.getComputedVal(PaddingLeftCss.PROP_NAME)
    }

    getComputedBorderRightWidth(): number {
        return this.getComputedVal(BorderRightWidth.PROP_NAME)
    }

    getComputedBorderLeftWidth(): number {
        return this.getComputedVal(BorderLeftWidth.PROP_NAME)
    }

    getComputedMarginBottom(): number {
        return this.getComputedVal(MarginBottomCss.PROP_NAME)
    }

    getComputedMarginTop(): number {
        return this.getComputedVal(MarginTopCss.PROP_NAME)
    }

    getComputedPaddingBottom(): number {
        return this.getComputedVal(PaddingBottomCss.PROP_NAME)
    }

    getComputedPaddingTop(): number {
        return this.getComputedVal(PaddingTopCss.PROP_NAME)
    }

    getComputedBorderBottomWidth(): number {
        return this.getComputedVal(BorderBottomWidth.PROP_NAME)
    }

    getComputedBorderTopWidth(): number {
        return this.getComputedVal(BorderTopWidth.PROP_NAME)
    }

    public getComputedVal(propName: string)
    {
        if (!this.getHtmlEl()) {
            // console.log('EL NOT')
            return 0
        }

        var a = window.getComputedStyle(this.getHtmlEl())
        var val = a.getPropertyValue(propName)
        // console.log('EL val', val)
        // console.log('EL val', parseInt(val))
        if (val) {
            return parseInt(val)
        }

        return 0
    }

    public addChild(child: HtmlNode)
    {
        this.children.push(child)

    }

    public appendChild(child: HtmlNode)
    {
        child.parent = this
        child.setApi(this.api)
        child.setProjectId(this.projectId)
        if (child instanceof HtmlTag) {
            child.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
            child.injectInitialCssStyles()
            child.injectInitialSelectors()
        }
        super.appendChild(child)
        if (child instanceof HtmlTag) {
            // child.realPositionCalculator.updateNearPositionalTag()
            this.notifyPositionalTag()

        }

    }

    async appendChildDeep(child: HtmlNode)
    {
        child.parent = this
        child.setProjectId(this.projectId)
        child.setApi(this.api)
        if (child instanceof HtmlTag) {
            child.setMediaQueryAccessor(BaseMediaQueryComponent.accessorStatic)
            child.injectInitialCssStyles()
            child.injectInitialSelectors()

        }
        this.addChild(child)

        if (child instanceof HtmlTag) {
            // child.realPositionCalculator.updateNearPositionalTag()
            this.notifyPositionalTag()
        }

        await this.api.appendChildDeep(child)
        // this.synchronizer.synchronize()

    }

    get boundingClientRectLeftPixel(): number
    {
        return this._boundingClientRectLeftPixel
    }

    set boundingClientRectLeftPixel(arg: number)
    {
        this._boundingClientRectLeftPixel = arg
    }

    get boundingClientRectTopPixel(): number
    {
        return this._boundingClientRectTopPixel
    }

    set boundingClientRectTopPixel(arg: number)
    {
        this._boundingClientRectTopPixel = arg
    }



    get boundingClientRectRightPixel(): number
    {
        return this._boundingClientRectRightPixel
    }

    set boundingClientRectRightPixel(arg: number)
    {
        this._boundingClientRectRightPixel = arg
    }

    get boundingClientRectBottomPixel(): number
    {
        return this._boundingClientRectBottomPixel
    }

    set boundingClientRectBottomPixel(arg: number)
    {
        this._boundingClientRectBottomPixel = arg
    }

    public updateBoundingRight() {
        if (this.getHtmlEl()) {
            this.boundingClientRectRightPixel = this.getHtmlEl().getBoundingClientRect().right

        }

    }

    public updateBoundingTop() {
        if (this.getHtmlEl()) {
            this.boundingClientRectTopPixel = this.getHtmlEl().getBoundingClientRect().top

        }
    }

    public updateBoundingBottom() {
        if (this.getHtmlEl()) {
            this.boundingClientRectBottomPixel = this.getHtmlEl().getBoundingClientRect().bottom

        }
    }

    public updateBoundingLeft() {
        if (this.getHtmlEl()) {
            this.boundingClientRectLeftPixel = this.getHtmlEl().getBoundingClientRect().left

        }

    }
    // public updateBoundingRight()
    // {
    //     // var borderLeft, paddingLeft, width, paddingRight, BorderRight
    //     var result = ''

    //     if (this.borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)) {
    //         result += this.borderRealFetcher.fetchUnitWidth(BorderLeftCss.PROP_NAME).getValue(this.borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME))
    //     } else {
    //         result += '0px'
    //     }

    //     if (this.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME).length) {
    //         result += ' + ' +  this.paddingRealFetcher.fetchUnit(PaddingLeftCss.PROP_NAME).getValue(this.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME))
    //     } else {
    //         result += ' + 0px'
    //     }

    //     if (this.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME).length) {
    //         result += ' + ' +  this.marginRealFetcher.fetchUnit(MarginLeftCss.PROP_NAME).getValue(this.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME))
    //     } else {
    //         result += ' + 0px'
    //     }

    //     if (this.paddingRealFetcher.fetchPropValue(PaddingRightCss.PROP_NAME).length) {
    //         result += ' +  ' +  this.paddingRealFetcher.fetchUnit(PaddingRightCss.PROP_NAME).getValue(this.paddingRealFetcher.fetchPropValue(PaddingRightCss.PROP_NAME))
    //     } else {
    //         result += ' + 0px'
    //     }

    //     if (this.borderRealFetcher.fetchPropWidth(BorderRightCss.PROP_NAME)) {
    //         result += ' + ' + this.borderRealFetcher.fetchUnitWidth(BorderRightCss.PROP_NAME).getValue(this.borderRealFetcher.fetchPropWidth(BorderRightCss.PROP_NAME))
    //     } else {
    //         result += ' + 0px'
    //     }

    //     if (this.marginRealFetcher.fetchPropValue(MarginRightCss.PROP_NAME).length) {
    //         result += ' + ' +  this.marginRealFetcher.fetchUnit(MarginRightCss.PROP_NAME).getValue(this.marginRealFetcher.fetchPropValue(MarginRightCss.PROP_NAME))
    //     } else {
    //         result += ' + 0px'
    //     }

    //     var width = this.cssAccessor.getProperty(Width.PROP_NAME)

    //     if (width) {
    //         result += ' + ' + width.getValue()

    //     } else {
    //         result += ' + 0px'

    //     }

    //     this.clientBoundingRightCalc = result
    // }

    public afterUpdatePadding() {

        var paddingLeft = this.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME)
        var paddingLeftUnit = this.paddingRealFetcher.fetchUnit(PaddingLeftCss.PROP_NAME)
        var paddingLeftCalc = '0px'
        if (paddingLeft) {
            paddingLeftCalc = paddingLeftUnit.getValue(paddingLeft)
        }

        var paddingRight = this.paddingRealFetcher.fetchPropValue(PaddingRightCss.PROP_NAME)
        var paddingRightUnit = this.paddingRealFetcher.fetchUnit(PaddingRightCss.PROP_NAME)
        var paddingRightCalc = '0px'
        if (paddingRight) {
            paddingRightCalc = paddingRightUnit.getValue(paddingRight)
        }

        this.widthCalc = `calc(100% - ${paddingLeftCalc} - ${paddingRightCalc})`

        var paddingTop = this.paddingRealFetcher.fetchPropValue(PaddingTopCss.PROP_NAME)
        var paddingTopUnit = this.paddingRealFetcher.fetchUnit(PaddingTopCss.PROP_NAME)
        var paddingTopCalc = '0px'
        if (paddingTop) {
            paddingTopCalc = paddingTopUnit.getValue(paddingTop)
        }

        var paddingBottom = this.paddingRealFetcher.fetchPropValue(PaddingBottomCss.PROP_NAME)
        var paddingBottomUnit = this.paddingRealFetcher.fetchUnit(PaddingBottomCss.PROP_NAME)
        var paddingBottomCalc = '0px'
        if (paddingBottom) {
            paddingBottomCalc = paddingBottomUnit.getValue(paddingBottom)
        }

        this.heightCalc = `calc(100% - ${paddingTopCalc} - ${paddingBottomCalc})`
    }

    clearSelectedSelectors() {
        this.pseudoClassAccessor.selectedSelector = null
        this.pseudoElementAccessor.selectedSelector = null

    }
    get selectedSelector() : BaseSelector {
        if (this.animationSelector) {
            return this.animationSelector
        }
        
        if (this.pseudoClassAccessor.selectedSelector) {
            return this.pseudoClassAccessor.selectedSelector
        }

        if (this.pseudoElementAccessor.selectedSelector) {
            return this.pseudoElementAccessor.selectedSelector
        }

        return null
    }

    getCurrentCssAccessor()
    {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            return activeSelector.cssAccessor
        }

        if (this.selectedMedia) {
            return this.cssListMediaOwner.currentCssList
        }

        return this.cssAccessor

    }

    public onChangeMediaQuery()
    {
        // console.log('onChangeMediaQuery');

        this.onChangeSelector()
    }

    public onChangeSelector()
    {
        this.resetFilterTagElements()
        Vue.nextTick(() => {
            this.recalculateRealComputedProperties()
            this.recalculateRealComputedProperties()
            this.reInitDefaultPosition()

            this.updatePositionProps()
            var activeSelector = this.selectedSelector
            var positionCss
            if (activeSelector) {
                positionCss = activeSelector.cssAccessor.getProperty(PositionCss.PROP_NAME)
            } else {
                positionCss = this.cssAccessor.getProperty(PositionCss.PROP_NAME)

            }
            // console.log(positionCss);

            this.updateHasPosition(positionCss)
        })
    }

    public turnOffSynchronizer()
    {
        this.synchronizer.turnOff()
    }
    
    public turnOnSynchronizer()
    {
        this.synchronizer.turnOn()
    }

}
