import HtmlAttr from '../Attribute/HtmlAttr';
import NearTagWithPositionalFinder from './NearTagWithPositionalFinder';
import HtmlTag from '../Layout/HtmlTag';
import Vue from 'vue';
import TopCss from '../Css/Display/Direction/TopCss';
import UnitSize from '../Unit/UnitSize';
import Pixel from '../Unit/Size/Pixel';
import { LeftCss, BorderTopCss, MarginLeftCss, MarginTopCss, BorderRightCss, MarginRightCss, RightCss } from '../Css';
import BorderLeft from '../Layout/Border/BorderLeft';
import BorderLeftCss from '../Css/Border/Left/BorderLeftCss';
export default class RealPositionCalculator
{
    protected tag: HtmlTag
    protected _unit: UnitSize
    protected _left: number
    protected _realLeft: number
    protected _right: number
    protected _realRight: number
    protected _top: number
    protected _realTop: number
    protected _bottom: number
    protected nearPositionalTag: HtmlTag
    protected bodyTag: HTMLElement

    protected relativeLeft: number
    protected relativeRight: number
    protected relativeTop: number

    protected nearPositionalTagFinder: NearTagWithPositionalFinder

    constructor(tag: HtmlTag){
        this.tag = tag
        this._unit = new Pixel()
        this.nearPositionalTagFinder = new NearTagWithPositionalFinder(this.tag)
        this.bodyTag = document.body.querySelector('#layout-object body')

        Vue.set(this, '_left', 0)
        Vue.set(this, '_realLeft', 0)
        Vue.set(this, '_right', 0)
        Vue.set(this, '_top', 0)
        Vue.set(this, '_realTop', 0)
        Vue.set(this, '_bottom', 0)
        Vue.set(this, 'relativeLeft', 0)
        Vue.set(this, 'relativeRight', 0)
        Vue.set(this, 'relativeTop', 0)
    }

    public getNearPositionalTag()
    {
        return this.nearPositionalTag
    }

    public reInitDefaultPosition()
    {
        Vue.set(this, 'relativeLeft', this.tag.getHtmlEl().getBoundingClientRect().left)
        Vue.set(this, 'relativeRight', this.tag.getHtmlEl().getBoundingClientRect().right)
        Vue.set(this, 'relativeTop', this.tag.getHtmlEl().getBoundingClientRect().top)
        
        console.log(this.tag.getHtmlEl().getBoundingClientRect().x);
        console.log(this.tag.getHtmlEl().getBoundingClientRect().y);
        console.log(this.tag.getHtmlEl().getBoundingClientRect());
        
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
        if (this.tag.cssAccessor.hasCssProperty(LeftCss.PROP_NAME)) {
            this.left = this.tag.cssAccessor.getProperty(LeftCss.PROP_NAME).getClearValue()
        }
        if (this.tag.cssAccessor.hasCssProperty(RightCss.PROP_NAME)) {
            this.right = this.tag.cssAccessor.getProperty(RightCss.PROP_NAME).getClearValue()
        }
        if (this.tag.cssAccessor.hasCssProperty(TopCss.PROP_NAME)) {
            this.top = this.tag.cssAccessor.getProperty(TopCss.PROP_NAME).getClearValue()
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
        this._left = arg
        console.log('left');
        console.log(arg);
        
        this._realLeft = this.recalculateRealValLeft(Number(arg))
        console.log('_realLeft');
        console.log(this._realLeft);

        let left = new LeftCss(arg, this._unit)
        this.tag.updateCssPropertyWithoutModel(left.getName(), left)
    }
    
    get right() {
        return this._right
    }
    
    set right(arg) {
        this._right = arg
        console.log('right');
        console.log(arg);
        
        this._realRight = this.recalculateRealValRight(Number(arg))
        console.log('_realRight');
        console.log(this._realRight);

        let prop = new RightCss(arg, this._unit)
        this.tag.updateCssPropertyWithoutModel(prop.getName(), prop)
    }
    
    get top() {
        return this._top
    }
    
    set top(arg) {
        this._top = arg
        this._realTop = this.recalculateRealValTop(Number(arg))

        let top = new TopCss(arg, this._unit)
        this.tag.updateCssPropertyWithoutModel(top.getName(), top)
    }
    
    get realLeft() {
        return this._realLeft
    }
    
    set realLeft(arg) {
        this._realLeft = arg
        console.log('realLeft');
        console.log(arg);
        this._left = this.recalculateValLeft(arg)
        console.log('left');
        console.log(this._left);
        let left = new LeftCss(this._left, this._unit)
        this.tag.updateCssPropertyWithoutModel(left.getName(), left)

    }
    
    get realRight() {
        return this._realRight
    }
    
    set realRight(arg) {
        this._realRight = arg
        console.log('realRight');
        console.log(arg);
        this._right = this.recalculateValRight(arg)
        console.log('right');
        console.log(this._right);
        let prop = new RightCss(this._right, this._unit)
        this.tag.updateCssPropertyWithoutModel(prop.getName(), prop)

    }
    
    get realTop() {
        return this._realTop
    }
    
    set realTop(arg) {
        this._realTop = arg
        this._top = this.recalculateValTop(arg)

        let top = new TopCss(this._top, this._unit)
        this.tag.updateCssPropertyWithoutModel(top.getName(), top)

    }

    recalculateRealValLeft(val: number) : number {
        var borderLeft = this.tag.borderRealFetcher.fetchPropWidth(BorderLeftCss.PROP_NAME)
        var marginLeft = this.tag.marginRealFetcher.fetchPropValue(MarginLeftCss.PROP_NAME)
        // console.log('this.x');
        // console.log(this.x);
        // console.log(this.tag.getHtmlEl().getBoundingClientRect());
        // console.log(this.tag.getHtmlEl().offsetLeft);
        // console.log(.getBoundingClientRect());
    
        if (this.nearPositionalTag) {
            
            // console.log(this.bodyTag.getBoundingClientRect().x);
            // console.log(this.x);
            // console.log(val);
            
            if (this.nearPositionalTag.getHtmlEl()) {
                return this.nearPositionalTag.getHtmlEl().getBoundingClientRect().x - this.relativeLeft + val + Number(borderLeft) + Number(marginLeft)
            }
        }
        return this.bodyTag.getBoundingClientRect().x - this.relativeLeft + val + Number(marginLeft)

        // throw Error('a')
    }
    
    recalculateValLeft(val) {
        // throw Error('b')
        if (!this.nearPositionalTag) {
            return val
        }

        return -(this.nearPositionalTag.getHtmlEl().getBoundingClientRect().x) + this.relativeLeft
    }
    
    recalculateRealValTop(val) {
        var borderTop = this.tag.borderRealFetcher.fetchPropWidth(BorderTopCss.PROP_NAME)
        var marginTop = this.tag.marginRealFetcher.fetchPropValue(MarginTopCss.PROP_NAME)

        if (this.nearPositionalTag) {
            if (this.nearPositionalTag.getHtmlEl()) {
                return this.nearPositionalTag.getHtmlEl().getBoundingClientRect().y - this.relativeTop + val + Number(borderTop) + Number(marginTop)

            }
        }
        
        return this.bodyTag.getBoundingClientRect().y - this.relativeTop + val + Number(marginTop)
    }
    
    recalculateValRight(val) {
        // throw Error('b')
        if (!this.nearPositionalTag) {
            return val
        }

        return -(this.nearPositionalTag.getHtmlEl().getBoundingClientRect().right) + this.relativeRight
    }
    
    recalculateRealValRight(val) {
        var borderRight = this.tag.borderRealFetcher.fetchPropWidth(BorderRightCss.PROP_NAME)
        var marginRight = this.tag.marginRealFetcher.fetchPropValue(MarginRightCss.PROP_NAME)

        if (this.nearPositionalTag) {
            if (this.nearPositionalTag.getHtmlEl()) {
                return -(this.nearPositionalTag.getHtmlEl().getBoundingClientRect().right - this.relativeRight + val - Number(borderRight) - Number(marginRight))
            }
        }
        
        return -(this.bodyTag.getBoundingClientRect().right - this.relativeRight + val + Number(marginRight))
    }
    
    recalculateValTop(val) {
        if (!this.nearPositionalTag) {
            return val
        }

        return -(this.nearPositionalTag.getHtmlEl().getBoundingClientRect().y) + this.relativeTop
    }

    get unit() {
        return this._unit
    }
}