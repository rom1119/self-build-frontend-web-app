import CssPropertyAccessor from "./Css/CssPropertyAccessor"
import PseudoSelectorSynchronizer from "./Synchronizer/Impl/PseudoSelectorSynchronizer"
import ApiService from "./Api/ApiService"
import BasePropertyCss from "./Css/BasePropertyCss"
import HtmlTag from "./Layout/HtmlTag"
import PseudoSelector from "./PseudoSelector/PseudoSelector"
import UnitSize from "./Unit/UnitSize"
import { Pixel } from "./Unit"
import { PositionCss, Width, Height, PaddingBottomCss, PaddingLeftCss, PaddingRightCss, PaddingTopCss } from "./Css"
import BasePaddingCss from "./Css/BoxModel/BasePaddingCss"
import BaseBorderCss from "./Css/Border/BaseBorderCss"
import ContentSizeCss from "./Css/Size/ContentSizeCss"
import BaseMarginCss from "./Css/BoxModel/BaseMarginCss"
import SelectorOwner from "./SelectorOwner"
import HtmlTagSynchronizer from "./Synchronizer/Impl/HtmlTagSynchronizer"
import MediaQueryListOwner from "~/src/Css/PropertyAccessor/mediaQuery/MediaQueryListOwner";
import MediaQueryAccessor from "~/src/MediaQuery/MediaQueryAccessor";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import TransitionCss from "~/src/Css/Animation/TransitionCss";
import CssOwner from './CssOwner';
import SelectorApiService from './Api/SelectorApiService';
import KeyFrameSelector from './Animation/KeyFrameSelector';
import FetcherRealCssProp from './FetcherRealCssProp';
import PaddingRealCssFetcher from './Css/RealCssProp/PadingRealCssFetcher';
import PaddingRealCssFetcherForSelector from './Css/RealCssProp/PadingRealCssFetcherForSelector';

export default abstract class BaseSelector implements CssOwner
{
    id
    projectId
    mediaQueryId = null
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


    protected _cssPropertyAccesor: CssPropertyAccessor = null
    protected _tmpCssPropertyAccesor: CssPropertyAccessor = null

    protected synchronizer: PseudoSelectorSynchronizer
    api: SelectorApiService

    cssListMediaOwner: MediaQueryListOwner<BaseSelector>

    paddingRealFetcher: FetcherRealCssProp = new PaddingRealCssFetcherForSelector(this)
    // marginRealFetcher: FetcherRealCssProp = new MarginRealCssFetcher(this)
    // borderRealFetcher: BorderFetcherRealCssProp = new BorderRealCssFetcher(this)

    constructor(owner: SelectorOwner) {
        this._owner = owner

        this.active = false
    }

    getOwnerId(): string {
        return this._owner.uuid
    }
    setMediaQueryAccessor(value: MediaQueryAccessor<MediaQueryCss>) {
        this.cssListMediaOwner = new MediaQueryListOwner<BaseSelector>(this, value)
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

    // get currentCssAccessor() {
    //     if (this.mediaQueryId) {
    //         this.cssListMediaOwner.addCssForMedia(subModel, subModel.mediaQueryId)
    //     } else {
    //         domain.setCss(subModel)

    //     }
    // }


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



    public setApi(api: SelectorApiService)
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


    get selectedMedia(): BaseMediaQueryCss
    {
        console.log('selectedMedia SEL', this.cssListMediaOwner)
        
        if (!this.cssListMediaOwner) {
            return null
        }
        // console.trace('selectedMedia SEL 12333', this.cssListMediaOwner.selectedMedia)
        return  this.cssListMediaOwner.selectedMedia
    }

    public removeCssProperty(prop: BasePropertyCss)
    {
        if (this.selectedMedia) {
            this.cssListMediaOwner.removeCssFromMedia(prop)
        } else {
            this.cssAccessor.removePropWithName(prop.getName());
            var prop = this.tmpCssAccessor.getProperty(prop.getName());
            if (prop) {
                prop.id = null
                prop.setActive(false)
            }

        }
        this.synchronizer.synchronize()
    }

    public getPropertyCss(prop: string)
    {
            console.log('getPropertyCss SEL', prop, this.selectedMedia)
        // if (this.selectedMedia) {
        //     return this.cssListMediaOwner.getProperty(prop)
        // }

        return this.cssAccessor.getProperty(prop)
    }
    
    public getTmpPropertyCss(prop: string)
    {
            // console.log('getPropertyCss SEL', prop, this.selectedMedia)
        // if (this.selectedMedia) {
        //     return this.cssListMediaOwner.getProperty(prop)
        // }

        return this.tmpCssAccessor.getProperty(prop)
    }

    public removeCssPropertyByName(propName: string)
    {
        // super.removeCssProperty(prop)
        // if (this.selectedMedia) {
        //     this.cssListMediaOwner.removePropWithName(propName)
        // } else {
            
        // }
        this.cssAccessor.removePropWithName(propName);
        var prop = this.tmpCssAccessor.getProperty(propName);
        if (prop) {
            prop.id = null
            prop.setActive(false)
        }
        this.synchronize()
    }

    public updateTmpCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        // if (this.selectedMedia) {
        //     this.cssListMediaOwner.setNewValCssForMediaTmp(val)
        // } else {
            
        // }
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

    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        // console.log('UUUUUUU');
        // console.log(val.getValue());
        // if (this.selectedMedia) {
        //     this.cssListMediaOwner.setNewValCssForMedia(val)
        // } else {
            
        // }
        if (!this.cssAccessor.hasCssProperty(val.getName())) {
            var tmpProp = this.tmpCssAccessor.getProperty(propName)
            if (!tmpProp) {
                this.cssAccessor.addNewProperty(val)
                this.tmpCssAccessor.addNewProperty(val)
            } else {
                tmpProp.setActive(true)
                this.tmpCssAccessor.setNewPropertyValue(propName, val)
                this.cssAccessor.addNewProperty(tmpProp)

            }
        } else {
            let prop = this.cssAccessor.getProperty(val.getName())
            if (prop.getValue() === val.getValue()) {
                // return
            }
            this.cssAccessor.setNewPropertyValue(propName, val)
        }


        this.synchronizeCssStyle(val)


    }

    getCurrentCssAccessor()
    {

        // if (this.selectedMedia) {
        //     return this.cssListMediaOwner.currentCssList
        // }

        return this.cssAccessor

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
        var cssFormAccessor = this._cssPropertyAccesor.all

            console.log('cssList SELEC', this.getName())
        // if (this.selectedMedia) {
        //     // var css = {}
        //     console.log(this.selectedMedia)
        //     console.log(this.cssListMediaOwner.currentCssList)
        //     console.log(this.cssListMediaOwner.currentCssList.all)
        //     cssFormAccessor = this.cssListMediaOwner.currentCssList.all
        // }
        for (const cssProp of cssFormAccessor) {
            if (!this.owner.canAddToCssList(cssProp)) {
                continue
            }
            if (!cssProp.injectable) {
                continue
            }
            if (this.owner.isLikeBackgroundCss(cssProp)) {
                continue
            }
            css[cssProp.getName()] = cssProp.value


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

        if (this.selectedMedia) {
            console.log('cssBoxListMediaQuery SELEC')
            console.log(this.cssListMediaOwner)
                        console.log(this.cssListMediaOwner.currentCssList.all)
            // this.transformStyleList.setAllImportant(true)
            var a = this.owner.transformStyleList.transform(this.cssListMediaOwner.currentCssList.all)
            // console.log('new css', a)
            try {
                if (a[TransitionCss.PROP_NAME]) {
                    // @ts-ignore
                    this.owner.onApplyTransitionCss(TransitionCss.PROP_NAME)

                }
            } catch (e) {
                delete a[TransitionCss.PROP_NAME]
            }
            return  a
        }
        var cssL =  this.owner.transformStyleList.transform(this.cssAccessor.all)


        try {
            if (cssL[TransitionCss.PROP_NAME]) {
                // @ts-ignore
                this.owner.onApplyTransitionCss(TransitionCss.PROP_NAME)

            }
        } catch (e) {
            delete cssL[TransitionCss.PROP_NAME]
        }


        return cssL
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

    public equals(el: KeyFrameSelector): boolean
    {
        return this.id === el.id
    }

    public abstract setOwner(tag: SelectorOwner)


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
}
