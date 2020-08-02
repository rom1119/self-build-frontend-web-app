import HtmlAttr from '../Attribute/HtmlAttr';
import NearTagWithPositionalFinder from './NearTagWithPositionalFinder';
import HtmlTag from '../Layout/HtmlTag';
import Vue from 'vue';
import TopCss from '../Css/Display/Direction/TopCss';
import UnitSize from '../Unit/UnitSize';
import Pixel from '../Unit/Size/Pixel';
import { LeftCss, BorderTopCss, MarginLeftCss, MarginTopCss, BorderRightCss, MarginRightCss, RightCss, Width, PaddingRightCss, PaddingLeftCss, MarginBottomCss, BottomCss, BorderBottomCss, PaddingBottomCss, PaddingTopCss } from '../Css';
import BorderLeft from '../Layout/Border/BorderLeft';
import BorderLeftCss from '../Css/Border/Left/BorderLeftCss';
import PositionCss from '../Css/Display/PositionCss';
export default class RealPositionCalculator
{
    protected tag: HtmlTag
    protected _leftUnit: UnitSize
    protected _rightUnit: UnitSize
    protected _topUnit: UnitSize
    protected _bottomUnit: UnitSize
    protected _left: number
    protected _realLeftCalc: string
    protected _right: number
    protected _realRightCalc: string
    protected _top: number
    protected _realTopCalc: string
    protected _bottom: number
    protected _realBottomCalc: string
    protected nearPositionalTag: HtmlTag
    protected bodyTag: HTMLElement

    protected relativeLeft: number
    protected relativeRight: number
    protected relativeTop: number
    protected relativeBottom: number

    protected marginLeftCalc: string
    protected marginTopCalc: string
    protected marginBottomCalc: string
    protected marginRightCalc: string

    protected nearPositionalTagFinder: NearTagWithPositionalFinder

    constructor(tag: HtmlTag){
        this.tag = tag
        this._leftUnit = new Pixel()
        this._rightUnit = new Pixel()
        this._topUnit = new Pixel()
        this._bottomUnit = new Pixel()
        this.nearPositionalTagFinder = new NearTagWithPositionalFinder(this.tag)
        this.bodyTag = document.body.querySelector('#layout-object body')

        Vue.set(this, '_realLeftCalc', '0px')
        Vue.set(this, '_realRightCalc', '0px')
        Vue.set(this, '_realTopCalc', '0px')
        Vue.set(this, '_realBottomCalc', '0px')
        Vue.set(this, '_left', 0)
        Vue.set(this, '_right', 0)
        Vue.set(this, '_top', 0)
        Vue.set(this, '_bottom', 0)
        Vue.set(this, 'relativeLeft', 0)
        Vue.set(this, 'relativeRight', 0)
        Vue.set(this, 'relativeTop', 0)
        Vue.set(this, 'relativeBottom', 0)
    }

    public getNearPositionalTag()
    {
        return this.nearPositionalTag
    }

    public reInitDefaultPosition()
    {
        // var left = this.tag.getHtmlEl().getBoundingClientRect().left
        // Vue.set(this, 'relativeLeft', this.tag.getHtmlEl().getBoundingClientRect().left)
        Vue.set(this, 'relativeRight', this.tag.boundingClientRectRightPixel)
        Vue.set(this, 'relativeLeft', this.tag.boundingClientRectLeftPixel)
        Vue.set(this, 'relativeTop', this.tag.boundingClientRectTopPixel)
        Vue.set(this, 'relativeBottom', this.tag.boundingClientRectBottomPixel)

        var marginLeft = this.tag.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME)
        var marginLeftUnit = this.tag.marginRealFetcher.fetchUnit(MarginLeftCss.PROP_NAME)
        this.marginLeftCalc = '0px'
        if (marginLeft) {
            this.marginLeftCalc = marginLeftUnit.getValue(marginLeft)
        }
        
        var marginTop = this.tag.marginRealFetcher.fetchPropValue(MarginTopCss.PROP_NAME)
        var marginTopUnit = this.tag.marginRealFetcher.fetchUnit(MarginTopCss.PROP_NAME)
        this.marginTopCalc = '0px'
        if (marginTop) {
            this.marginTopCalc = marginTopUnit.getValue(marginTop)
        }
        
        var marginRight = this.tag.marginRealFetcher.fetchPropValue(MarginRightCss.PROP_NAME)
        var marginRightUnit = this.tag.marginRealFetcher.fetchUnit(MarginRightCss.PROP_NAME)
        this.marginRightCalc = '0px'
        if (marginRight) {
            this.marginRightCalc = marginRightUnit.getValue(marginRight)
        }
        
        var marginBottom = this.tag.marginRealFetcher.fetchPropValue(MarginBottomCss.PROP_NAME)
        var marginBottomUnit = this.tag.marginRealFetcher.fetchUnit(MarginBottomCss.PROP_NAME)
        this.marginBottomCalc = '0px'
        if (marginBottom) {
            this.marginBottomCalc = marginBottomUnit.getValue(marginBottom)
        }
        // Vue.set(this, 'relativeTop', this.tag.getHtmlEl().getBoundingClientRect().top)
        
        // console.log(this.tag.getHtmlEl().getBoundingClientRect().x);
        // console.log(this.tag.getHtmlEl().getBoundingClientRect().y);
        // console.log(this.tag.getHtmlEl().getBoundingClientRect());

        // this.updateRightAndBottomProps()
        // console.log('relativeRight');
        // console.log(this.relativeRight);
        
    }

    public updateNearPositionalTag()
    {
        var nearTag = this.nearPositionalTagFinder.find()
        // console.log(this.tag);
        this.nearPositionalTag = nearTag        
        // if (this.nearPositionalTag) {
        //     if (this.nearPositionalTag.getHtmlEl()) {
                
        //     }
        // }
        this.updateProps()
    }

    public updateProps()
    {
        
        Vue.nextTick(() => {
            var accessor = this.tag.getSelectedSelector()

            if (!this.tag.hasAbsolute && !this.tag.hasFixed ) {
                return
            }

            if (this.tag.getCurrentCssAccessor().hasCssProperty(TopCss.PROP_NAME)) {
                this.topUnit = this.tag.getCurrentCssAccessor().getProperty(TopCss.PROP_NAME).getUnit()
                this.top = this.tag.getCurrentCssAccessor().getProperty(TopCss.PROP_NAME).getClearValue()
            }
            if (this.tag.getCurrentCssAccessor().hasCssProperty(LeftCss.PROP_NAME)) {
                this.leftUnit = this.tag.getCurrentCssAccessor().getProperty(LeftCss.PROP_NAME).getUnit()
                this.left = this.tag.getCurrentCssAccessor().getProperty(LeftCss.PROP_NAME).getClearValue()
            }
            
            // console.log(this.tag.getHtmlEl());
            // console.log('relativeRight');
            // console.log(this.relativeRight);
            this.updateRightProps()
            this.updateBottomProps()

        })
        // this.tag.updateModelComponent()
        
        // if (this.tag.getHtmlEl()) {
        //     setTimeout(() => {
        //         this.relativeLeft = this.tag.getHtmlEl().getBoundingClientRect().left
        //         this.relativeRight = this.tag.getHtmlEl().getBoundingClientRect().right
        //         this.relativeTop = this.tag.getHtmlEl().getBoundingClientRect().top

        //     }, 10)
        // }
    }

    public updateRightProps()
    {
        if (this.tag.getCurrentCssAccessor().hasCssProperty(RightCss.PROP_NAME)) {
            this.rightUnit = this.tag.getCurrentCssAccessor().getProperty(RightCss.PROP_NAME).getUnit()
            this.right = this.tag.getCurrentCssAccessor().getProperty(RightCss.PROP_NAME).getClearValue()
        }  
    }
    
    public updateBottomProps()
    {
        if (this.tag.getCurrentCssAccessor().hasCssProperty(BottomCss.PROP_NAME)) {
            this.bottomUnit = this.tag.getCurrentCssAccessor().getProperty(BottomCss.PROP_NAME).getUnit()
            this.bottom = this.tag.getCurrentCssAccessor().getProperty(BottomCss.PROP_NAME).getClearValue()
        }  
    }
    
    public setNearPositionalTag(tag: HtmlTag)
    {
        this.nearPositionalTag = tag
    }

    get left() {
        return this._left
    }
    
    set left(arg) {
        if (this.tag.hasAbsolute) {
            this._left = arg
            let left = new LeftCss(arg, this._leftUnit)
            this.tag.updateCssPropertyWithoutModel(left.getName(), left)
            this._realLeftCalc = this.recalculateRealValLeft(this.leftUnit.getValue(arg))
        } else {
            this._left = arg
            let left = new LeftCss(arg, this._leftUnit)
            this.tag.updateCssPropertyWithoutModel(left.getName(), left)
            this._realLeftCalc = this.leftUnit.getValue(arg)
        }



    }
    
    get right() {
        return this._right
    }
    
    set right(arg) {
        this._right = arg
        // console.log('RIGHT');
        // console.log(arg);
        var newVal = this.recalculateRealValRight(this.rightUnit.getValue(arg))
        let prop = new RightCss(arg, this.rightUnit)
        this.tag.updateCssPropertyWithoutModel(prop.getName(), prop)
        
        this._realRightCalc = newVal
        // console.log('_realRightCalc');
        // console.log(this._realRightCalc);

    }
    
    get top() {
        return this._top
    }
    
    set top(arg) {
        this._top = arg
        this._realTopCalc = this.recalculateRealValTop(this.topUnit.getValue(arg))
        let top = new TopCss(arg, this._leftUnit)
        this.tag.updateCssPropertyWithoutModel(top.getName(), top)
    }
    
    get bottom() {
        return this._bottom
    }
    
    set bottom(arg) {
        this._top = arg
        this._realBottomCalc = this.recalculateRealValBottom(this.bottomUnit.getValue(arg))
        // console.log('top');
        // console.log(arg);
        // console.log('_realTop');
        // console.log(this._realTop);
        let top = new BottomCss(arg, this._bottomUnit)
        this.tag.updateCssPropertyWithoutModel(top.getName(), top)
    }
    
    get realLeftCalc() {
        return this._realLeftCalc
    }
    
    set realLeftCalc(arg) {
        if (this.tag.hasAbsolute) {
            this._realLeftCalc = this._leftUnit.getValue(arg)
            this._left = this.recalculateValLeft(arg)
            let left = new LeftCss(this._left, this._leftUnit)
            this.tag.updateCssPropertyWithoutModel(left.getName(), left)

        } else {
            this._realLeftCalc = this._leftUnit.getValue(arg)
            this._left = parseInt(arg)
            let left = new LeftCss(this._left, this._leftUnit)
            this.tag.updateCssPropertyWithoutModel(left.getName(), left)
        }
    }
    
    get realRightCalc() {
        return this._realRightCalc
    }
    
    set realRightCalc(arg) {
        this._realRightCalc = this._rightUnit.getValue(arg)
        this._right = this.recalculateValRight(arg)
        // console.log('REALRight');
        // console.log(arg);
        // console.log('right');
        // console.log(this._right);
        let prop = new RightCss(this._right, this._leftUnit)
        this.tag.updateCssPropertyWithoutModel(prop.getName(), prop)

    }
    
    get realBottomCalc() {
        return this._realBottomCalc
    }
    
    set realBottomCalc(arg) {
        this._realBottomCalc = this._bottomUnit.getValue(arg)
        this._bottom = this.recalculateValBottom(arg)
        // console.log('REALRight');
        // console.log(arg);
        // console.log('right');
        // console.log(this._right);
        let prop = new BottomCss(this._bottom, this._bottomUnit)
        this.tag.updateCssPropertyWithoutModel(prop.getName(), prop)

    }
    
    get realTopCalc() {
        return this._realTopCalc
    }
    
    set realTopCalc(arg) {
        if (this.tag.hasAbsolute) {
            this._realTopCalc = this._topUnit.getValue(arg)
            this._top = this.recalculateValTop(arg)

            let top = new TopCss(this._top, this._topUnit)
            this.tag.updateCssPropertyWithoutModel(top.getName(), top)
        } else {
            this._realTopCalc = this._topUnit.getValue(arg)
            this._top = parseInt(arg)

            let top = new TopCss(this._top, this._topUnit)
            this.tag.updateCssPropertyWithoutModel(top.getName(), top)
        }

    }

    recalculateRealValLeft(val) : string {
        var borderLeft = this.tag.borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var marginLeft = this.tag.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME)
        // console.log('this.x');
        // console.log(this.x);

        if (this.nearPositionalTag) {
            var widthNearPaddingLeft: string  = this.nearPositionalTag.paddingRealFetcher.fetchPropValue(PaddingLeftCss.PROP_NAME)
            var widthNearBorderUnit  = this.nearPositionalTag.paddingRealFetcher.fetchUnit(PaddingLeftCss.PROP_NAME)
            var leftPaddingNearTag 
            if (widthNearPaddingLeft) {    
                leftPaddingNearTag = '' + widthNearBorderUnit.getValue(widthNearPaddingLeft)
            } else {
                leftPaddingNearTag = ' 0px'

            }
        
            if (this.nearPositionalTag.getHtmlEl()) {
                return `0px - ${leftPaddingNearTag} + ${val}`
            }
        }
    
        if (this.tag.parent) {
            console.log(this.tag.parent.getHtmlEl().getBoundingClientRect().right);
            var marginRightParent = this.tag.parent.getComputedMarginRight()
            var marginLeftParent = this.tag.parent.getComputedMarginLeft()
            var paddingLeftParent = this.tag.parent.getComputedPaddingLeft()
            var borderLeftParent = this.tag.parent.getComputedBorderLeftWidth()
            var widthParent = this.tag.parent.getComputedWidth()
            var paddingLeftParent = this.tag.parent.getComputedPaddingLeft()
            var borderLeftParent = this.tag.parent.getComputedBorderLeftWidth()
            var marginLeftParent = this.tag.parent.getComputedMarginLeft()
            // @ts-ignore
            var leftParent = this.tag.parent.getHtmlEl().getBoundingClientRect().left
            // console.trace(`0px - ${leftParent}px + ${this.bodyTag.getBoundingClientRect().left}px - ${borderLeftParent}px - ${paddingLeftParent}px  +  ${val}`)
            // return `0px - ${this.bodyTag.getBoundingClientRect().right}px + ${borderRightParent}px  + ${paddingRightParent}px + ${marginRightParent}px  + ${borderLeftParent}px  + ${paddingLeftParent}px + ${marginLeftParent}px + ${widthParent}px +  ${val}`
            // @ts-ignore
            return `0px - ${leftParent}px + ${this.bodyTag.getBoundingClientRect().left}px - ${borderLeftParent}px - ${paddingLeftParent}px  +  ${val}`
            // return `0px - ${this.bodyTag.getBoundingClientRect().right}px - ${this.marginLeftCalc} + ${marginLeft}px + ${this.tag.boundingClientRectLeftPixel}px + ${borderRight}px + ${borderLeft}px + ${paddingRight}px + ${paddingLeft}px + ${marginRight}px + ${width}px + ${val}`
        } 
        
        return `${val}`
    }
    
    recalculateValLeft(val) {
        var borderLeft = this.tag.borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var marginLeft = this.tag.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME)
        // throw Error('b')
        if (!this.nearPositionalTag) {
            // var left = this.tag.getHtmlEl().getBoundingClientRect().left
            // @ts-ignore
            return this.relativeLeft - this.bodyTag.getBoundingClientRect().x + val - Number(marginLeft)

        }
        // @ts-ignore
        return this.tag.boundingClientRectLeftPixel - this.nearPositionalTag.boundingClientRectLeftPixel + val - Number(marginLeft) - Number(borderLeft)
    }
    
    recalculateRealValTop(val) {
        
        if (this.nearPositionalTag) {

            var widthNearPaddingTop: string  = this.nearPositionalTag.paddingRealFetcher.fetchPropValue(PaddingTopCss.PROP_NAME)
            var widthNearBorderUnit  = this.nearPositionalTag.paddingRealFetcher.fetchUnit(PaddingTopCss.PROP_NAME)
            var topPaddingNearTag 
            if (widthNearPaddingTop) {    
                topPaddingNearTag = '' + widthNearBorderUnit.getValue(widthNearPaddingTop)
            } else {
                topPaddingNearTag = ' 0px'
            }
        
            if (this.nearPositionalTag.getHtmlEl()) {
                return `0px - ${topPaddingNearTag} + ${val}`
            }
        }

        if (this.tag.parent) {

            var paddingTopParent = this.tag.parent.getComputedPaddingTop()
            var borderTopParent = this.tag.parent.getComputedBorderTopWidth()
            var marginTopParent = this.tag.parent.getComputedMarginTop()
            // @ts-ignore
            var topParent = this.tag.parent.getHtmlEl().getBoundingClientRect().top
            // return `0px - ${this.bodyTag.getBoundingClientRect().right}px + ${borderRightParent}px  + ${paddingRightParent}px + ${marginRightParent}px  + ${borderLeftParent}px  + ${paddingLeftParent}px + ${marginLeftParent}px + ${widthParent}px +  ${val}`
            // @ts-ignore
            return `0px - ${topParent}px + ${this.bodyTag.getBoundingClientRect().top}px  - ${borderTopParent}px - ${paddingTopParent}px - ${marginTopParent}px +  ${val}`
        } 
        
        return `${val}`


    }
    
    recalculateValRight(val) {
        var borderRight = this.tag.borderRealFetcher.fetchPropWidth(BorderRightCss.PROP_NAME)
        var marginRight = this.tag.marginRealFetcher.fetchPropValue(MarginRightCss.PROP_NAME)
        // throw Error('b')
        if (!this.nearPositionalTag) {
            // @ts-ignore
            return this.relativeRight - this.bodyTag.getBoundingClientRect().x + val - Number(marginRight)
        }
        // @ts-ignore
        return this.relativeRight - this.nearPositionalTag.getHtmlEl().getBoundingClientRect().x + val - Number(marginRight) - Number(borderRight)
    }
    
    recalculateValBottom(val) {
        var borderBottom = this.tag.getComputedBorderBottomWidth()
        var marginBottom = this.tag.getComputedMarginBottom()
        // throw Error('b')
        if (!this.nearPositionalTag) {
            // @ts-ignore
            return this.relativeBottom - this.bodyTag.getBoundingClientRect().y + val - Number(marginBottom)
        }
        // @ts-ignore
        return this.relativeBottom - this.nearPositionalTag.getHtmlEl().getBoundingClientRect().y + val - Number(marginBottom) - Number(borderBottom)
    }
    
    recalculateRealValRight(val) {
        if (this.nearPositionalTag) {
            if (this.nearPositionalTag.getHtmlEl()) {

                var widthNearPaddingRight: string  = this.nearPositionalTag.paddingRealFetcher.fetchPropValue(PaddingRightCss.PROP_NAME)
                var widthNearBorderUnit  = this.nearPositionalTag.paddingRealFetcher.fetchUnit(PaddingRightCss.PROP_NAME)
                var bottomPaddingNearTag 
                if (widthNearPaddingRight) {
                    bottomPaddingNearTag = '' + widthNearBorderUnit.getValue(widthNearPaddingRight)
                } else {
                    bottomPaddingNearTag = ' 0px'
                }

                return `0px - ${bottomPaddingNearTag} + ${val}`            }
        }

        this.tag.updateBoundingRight()
        this.tag.updateBoundingBottom()
        this.tag.updateBoundingLeft()
        this.reInitDefaultPosition()
        
        if (this.tag.parent) {

            var paddingRightParent = this.tag.parent.getComputedPaddingRight()
            var borderRightParent = this.tag.parent.getComputedBorderRightWidth()
            // @ts-ignore
            var rightParent = this.tag.parent.getHtmlEl().getBoundingClientRect().right
            // return `0px - ${this.bodyTag.getBoundingClientRect().right}px + ${borderRightParent}px  + ${paddingRightParent}px + ${marginRightParent}px  + ${borderLeftParent}px  + ${paddingLeftParent}px + ${marginLeftParent}px + ${widthParent}px +  ${val}`
            // @ts-ignore
            return `0px - ${this.bodyTag.getBoundingClientRect().right}px + ${rightParent}px - ${borderRightParent}px - ${paddingRightParent}px +  ${val}`
        } 
        
        return `${val}`
    }
    
    recalculateRealValBottom(val) {

        if (this.nearPositionalTag) {
            if (this.nearPositionalTag.getHtmlEl()) {
                var widthNearPaddingBottom: string  = this.nearPositionalTag.paddingRealFetcher.fetchPropValue(PaddingBottomCss.PROP_NAME)
                var widthNearBorderUnit  = this.nearPositionalTag.paddingRealFetcher.fetchUnit(PaddingBottomCss.PROP_NAME)
                var bottomPaddingNearTag 
                if (widthNearPaddingBottom) {
                    bottomPaddingNearTag = '' + widthNearBorderUnit.getValue(widthNearPaddingBottom)
                } else {
                    bottomPaddingNearTag = ' 0px'
                }

                return `0px - ${bottomPaddingNearTag} + ${val}`
            }
        }
        if (this.tag.parent) {
            var paddingBottomParent = this.tag.parent.getComputedPaddingBottom()
            var borderBottomParent = this.tag.parent.getComputedBorderBottomWidth()
            // @ts-ignore
            var bottomParent = this.tag.parent.getHtmlEl().getBoundingClientRect().bottom
            // return `0px - ${this.bodyTag.getBoundingClientRect().right}px + ${borderBottomParent}px  + ${paddingBottomParent}px + ${marginBottomParent}px  + ${borderLeftParent}px  + ${paddingLeftParent}px + ${marginLeftParent}px + ${widthParent}px +  ${val}`
            // @ts-ignore
            return `0px - ${this.bodyTag.getBoundingClientRect().bottom}px + ${bottomParent}px - ${borderBottomParent}px - ${paddingBottomParent}px +  ${val}`
        } 
        
        return `${val}`
    }
    
    recalculateValTop(val) {
        var borderTop = this.tag.borderRealFetcher.fetchPropWidth(BorderTopCss.PROP_NAME)
        var marginTop = this.tag.marginRealFetcher.fetchPropValue(MarginTopCss.PROP_NAME)
        // throw Error('b')
        if (!this.nearPositionalTag) {
            // @ts-ignore
            return this.relativeTop - this.bodyTag.getBoundingClientRect().y + val - Number(marginTop)
        }

        
        // @ts-ignore
        return this.relativeTop - this.nearPositionalTag.getHtmlEl().getBoundingClientRect().y + val - Number(marginTop) - Number(borderTop)
    }

    get leftUnit() {
        return this._leftUnit
    }
    
    set leftUnit(arg) {
        this._leftUnit = arg
    }
    
    get topUnit() {
        return this._topUnit
    }
    
    set topUnit(arg) {
        this._topUnit = arg
    }
    
    get bottomUnit() {
        return this._topUnit
    }
    
    set bottomUnit(arg) {
        this._topUnit = arg
    }
    
    get rightUnit() {
        return this._rightUnit
    }
    set rightUnit(arg) {
        this._rightUnit = arg
    }

}