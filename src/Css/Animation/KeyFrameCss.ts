import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssTripleValue from "../CssTripleValue";
import Named from '../../Unit/Named';
import Vue from 'vue'
import BasePropertyCss from "../BasePropertyCss";
import CssMultipleValue from "../CssMultipleValue";
import Pixel from '../../Unit/Size/Pixel';
import CssValue from "../CssValue";
import TimingFunction from "./timingFunction/TimingFunction";
import Linear from './timingFunction/impl/Linear';
import { UnitSecond } from "~/src/Unit";
import Width from '../Size/Width';
import KeyFrameSelectorAccessor from "../KeyFrameSelectorAccessor";
import SelectorOwner from '../../SelectorOwner';
import FilterCssInjector from "~/src/FilterCssInjector";
import RealPositionCalculator from "~/src/PositionCss/RealPositionCalculator";
import { VueFixStyleListTransform } from "~/src/Vue/VueFixStyleListTransform";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';

export default class KeyFrameCss implements SelectorOwner
{
    id
    projectId
    protected _version
    name
    
    protected _selectorAccessor: KeyFrameSelectorAccessor
    tag: HtmlTag
    
    constructor()
    {
        this._selectorAccessor = new KeyFrameSelectorAccessor(this)
        
        // this.values.push(shadow)
        // Vue.set(this.values, 0, shadow)
        
    }

    public getValue()
    {
        return '@keyframe ' + this.name
    }

    public init(tag: HtmlTag) {
        this.tag = tag
        for (const selector of this.selectorAccessor.all) {
            selector.init(tag)
        }
    }

    public deinit()
    {
        this.init(null)
    }
    get hasAbsolute(): boolean{
        return this.tag.hasAbsolute
    }
    get hasFixed(): boolean{
        return this.tag.hasAbsolute
    }
    get paddingFilter(): FilterCssInjector{
        return this.tag.paddingFilter
    }
    get marginFilter(): FilterCssInjector{
        return this.tag.marginFilter
    }
    get borderFilter(): FilterCssInjector{
        return this.tag.borderFilter
    }
    get contentFilter(): FilterCssInjector{
        return this.tag.contentFilter
    }
    get realPositionCalculator(): RealPositionCalculator{
        return this.tag.realPositionCalculator
    }
    get transformStyleList(): VueFixStyleListTransform{
        return this.tag.transformStyleList
    }
    get api(): ApiService{
        return this.tag.api
    }

    canAddToCssList(prop: BasePropertyCss): boolean {
        return this.tag.canAddToCssList(prop)
    }
    isLikeBackgroundCss(prop: BasePropertyCss): boolean {
        return this.tag.isLikeBackgroundCss(prop)
    }
    notifyPositionalTag() {
        return this.tag.notifyPositionalTag()
    }

    get selectorAccessor(): KeyFrameSelectorAccessor
    {
        return this.selectorAccessor
    }
    
    
    get pseudoSelectorsList() : any
    {
        let pseudoSelectors = {}
        
        for (const element of this.selectorAccessor.all) {
            
            pseudoSelectors[element.value] = element.cssAccessor.all
            
        }  
        
        // console.log('COMP-SELECTORS');
        // console.log(pseudoSelectors);

        return pseudoSelectors
    }

    
}