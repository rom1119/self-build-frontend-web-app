import CssSimple from "../Css/CssSimple";
import CssPropertyLimitable from "../Css/CssPropertyLimitable";
import UnitSize from '../Unit/UnitSize';
import UnitColor from '../Unit/UnitColor';
import CssComposite from '../Css/CssComposite';
import CssDirectionComposite from "../Css/CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssTripleValue from "../Css/CssTripleValue";
import Named from '../Unit/Named';
import Vue from 'vue'
import BasePropertyCss from "../Css/BasePropertyCss";
import CssMultipleValue from "../Css/CssMultipleValue";
import Pixel from '../Unit/Size/Pixel';
import CssValue from "../Css/CssValue";
import TimingFunction from "./timingFunction/TimingFunction";
import Linear from './timingFunction/impl/Linear';
import { UnitSecond } from "~/src/Unit";
import Width from '../Css/Size/Width';
import KeyFrameSelectorAccessor from "../Css/KeyFrameSelectorAccessor";
import SelectorOwner from '../SelectorOwner';
import FilterCssInjector from "~/src/FilterCssInjector";
import RealPositionCalculator from "~/src/PositionCss/RealPositionCalculator";
import { VueFixStyleListTransform } from "~/src/Vue/VueFixStyleListTransform";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../Layout/HtmlTag';
import Synchronizer from "~/src/Synchronizer/Synchronizer";
import DefaultKeyFrameApiService from '../Api/impl/DefaultKeyFrameApiService';
import KeyFrameSynchronizer from '../Synchronizer/Impl/KeyFrameSynchronizer';
import KeyFrameSelector from './KeyFrameSelector';
import AnimationCss from '../Css/Animation/AnimationCss';

export default class KeyFrame implements SelectorOwner
{
    uuid: string
    version
    shortUuid
    projectId
    protected _version
    name

    selectorsShow = true

    isPercentSelector = false

    
    protected _selectorAccessor: KeyFrameSelectorAccessor
    tag: HtmlTag

    owners:  { [key: number]: number[]}

    protected _countOwners: number = 0
    
    shortUUID: string;
    synchronizer: KeyFrameSynchronizer
    api: DefaultKeyFrameApiService
    addSelectorError: string = ''
    constructor()
    {
        this._selectorAccessor = new KeyFrameSelectorAccessor(this)
        
        // this.values.push(shadow)
        // Vue.set(this.values, 0, shadow)
        
    }

    toggleSelectors() {
        this.selectorsShow = !this.selectorsShow
    }

    isUsedInAnimationCss() {
        return this.countOwners > 0
    }

    protected updateCountOwners() {
        var size = 0,
        key;
        for (key in this.owners) {
            if (this.owners.hasOwnProperty(key)) size++;
        }
        this._countOwners = size
    }
    get countOwners(): number {
        
        return this._countOwners;
    
    }

    public addAnimationOwnerToKeyFrame( animation: AnimationCss) {
        // console.log('addFontOwnerToFontFace');
        
        if (!this.owners[animation.id]) {
            this.owners[animation.id] = []
        }
        this.updateCountOwners()
        // console.log(font.owners);
        // console.log(font);
        // console.log('addFontOwnerToFontFace END');
    }
    
    public deleteAnimationOwnerFromKeyFrame(animation: AnimationCss) {
        // console.log('deleteFontOwnerFromFontFace');

        if (this.owners[animation.id].length < 1) {
            delete this.owners[animation.id]

        }
        this.updateCountOwners()

        // console.log(font);
        // console.log('deleteFontOwnerFromFontFace END');
    }

    public getValue()
    {
        return '@keyframes ' + this.name
    }


    public setApi(api: DefaultKeyFrameApiService)
    {
        this.api = api
        this.synchronizer = new KeyFrameSynchronizer(this, api)
        // for (const el of this.selectorAccessor.all) {
        //     el.setApi(api)
        // }
    }

    public synchronize()
    {
        if (this.synchronizer) {
            this.synchronizer.synchronize()
        }
    }

    public initTagToSelectors(tag: HtmlTag) {
        for (const selector of this.selectorAccessor.all) {
            selector.initTag(tag)
        }
    }
    public init(tag: HtmlTag) {
        this.tag = tag
        for (const selector of this.selectorAccessor.all) {
            selector.init(this)
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
        return this._selectorAccessor
    }

    public initSelector(src: KeyFrameSelector) {
        src.init(this)
        src.projectId = this.projectId

    }
    public addSelector(src: KeyFrameSelector) {
        this.initSelector(src)
        this.selectorAccessor.addNewSelector(src)

    }

    public addSelectorAndSave(src: KeyFrameSelector)
    {
        console.log('addSelectorAndSave');
        
        this.initSelector(src)
        this.api.appendSelector(src).then(
            (res) => {
                this.addSelector(src)
                src.id = res.data.id                
            },
            (err) => {
                
            }
        )
    }
    
    
    public updateSelector(src: KeyFrameSelector)
    {

        this.api.putSelector(src)
    }
    
    public removeSelector(src: KeyFrameSelector)
    {

        this.api.deleteSelector(src).then(
            (res) => {
                this.selectorAccessor.removeById(src.id)
                this.addSelectorError = ''

            },
            (err) => {
                
            }
        )
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

    public equals(el: KeyFrame): boolean
    {
        return this.uuid === el.uuid
    }

    
}