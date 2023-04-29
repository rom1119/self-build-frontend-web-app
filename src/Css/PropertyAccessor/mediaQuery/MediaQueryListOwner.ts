import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import CssListAndMediaQueryAccessor from "~/src/Css/PropertyAccessor/mediaQuery/CssListAndMediaQueryAccessor";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import MediaQueryAccessor from "~/src/MediaQuery/MediaQueryAccessor";
import Vue from 'vue';
import SubscriberMediaAccessor from "~/src/MediaQuery/SubscriberMediaAccessor";
import PseudoSelectorAccessor from '../../PseudoSelectorAccessor';
import PseudoClass from '../../../PseudoSelector/PseudoClass';
import PseudoElement from '../../../PseudoSelector/PseudoElement';
import HtmlTag from '../../../Layout/HtmlTag';
import SelectorOwner from '../../../SelectorOwner';
import MediaQueryPseudoSelectorAccessor from '../../MediaQueryPseudoSelectorAccessor';

interface MediaCssList {
    property: string;
}

export default class MediaQueryListOwner<T> implements SubscriberMediaAccessor{

    protected owner: T
    private _mediaQueryAccessor: MediaQueryAccessor<MediaQueryCss>

    protected mediaQueryListPseudoClass: { [key: string]: MediaQueryPseudoSelectorAccessor<PseudoClass> } = {}
    protected mediaQueryListPseudoElement: { [key: string]: MediaQueryPseudoSelectorAccessor<PseudoElement> } = {}
    
    protected mediaQueryListCss: { [key: string]: CssListAndMediaQueryAccessor<T>} = {}
    protected mediaQueryListCssTmp: { [key: string]: CssListAndMediaQueryAccessor<T>} = {}


    constructor( owner: T, mediaQueryAccessor: MediaQueryAccessor<MediaQueryCss>) {
        this.owner = owner;
        this._mediaQueryAccessor = mediaQueryAccessor;
        Vue.set(this, 'mediaQueryList', {})
        Vue.set(this, 'mediaQueryListTmp', {})
        
        Vue.set(this, 'mediaQueryListPseudoClass', {})
        Vue.set(this, 'mediaQueryListPseudoElement', {})
        // this.mediaQueryList = {};
        // this.mediaQueryListTmp = {};
        this.init()

        this._mediaQueryAccessor.addSubscriber(this)

    }

    public init() {
            // console.trace('init')
        Vue.set(this, 'mediaQueryList', {})
        Vue.set(this, 'mediaQueryListTmp', {})

        if (this.owner instanceof HtmlTag) {
            Vue.set(this, 'mediaQueryListPseudoClass', {})
            Vue.set(this, 'mediaQueryListPseudoElement', {})

        }
        for(var el of this._mediaQueryAccessor.all) {
            // console.log(el)
            Vue.set(this.mediaQueryListCss, el.id, new CssListAndMediaQueryAccessor<T>(this.owner, el))
            Vue.set(this.mediaQueryListCssTmp, el.id, new CssListAndMediaQueryAccessor<T>(this.owner, el))
            if (this.owner instanceof HtmlTag) {

                Vue.set(this.mediaQueryListPseudoClass, el.id, new MediaQueryPseudoSelectorAccessor<PseudoClass>(<SelectorOwner><unknown>this.owner, el))
                Vue.set(this.mediaQueryListPseudoElement, el.id, new MediaQueryPseudoSelectorAccessor<PseudoElement>(<SelectorOwner><unknown>this.owner, el))
            }
            // this.mediaQueryList[el.id] =
            // this.mediaQueryListTmp[el.id] = new CssListAndMediaQueryAccessor<T>(this.owner, el)

        }
        // console.log(this.mediaQueryList)
    }

    getMediaQueryCssList()
    {
        return this.mediaQueryListCss
    }
    
    getMediaQueryPseudoClassList()
    {
        return this.mediaQueryListPseudoClass
    }

    get mediaQueryCssList()
    {
        return this.mediaQueryListCss
    }

    get selectedMedia(): BaseMediaQueryCss{
        if (!this._mediaQueryAccessor) {
            return null
        }

        return this._mediaQueryAccessor.selectedMediaQuery
    }

    get selectedSelector() {
        
        if (!this.selectedMedia) {
            return null
        }
        if (this.mediaQueryListPseudoClass[this.selectedMedia.id]) {
            return this.mediaQueryListPseudoClass[this.selectedMedia.id].selectedSelector
        }
        
        if (this.mediaQueryListPseudoElement[this.selectedMedia.id]) {
            return this.mediaQueryListPseudoElement[this.selectedMedia.id].selectedSelector
        }

        return null

    }
    
    get currentCssList() {
        var list = this.getCurrentList()

        // console.log('currentCssList')
        // console.log(this.selectedMedia)
        // console.log(this.mediaQueryList)
        if (list) {
            return list
        }

        return null
    }
    
    get currentPseudoClasses() {
        if (!this.selectedMedia) {
            return null
        }
        // console.log('currentCssList')
        // console.log(this.selectedMedia)
        // console.log(this.mediaQueryList)
        if (this.mediaQueryListPseudoClass[this.selectedMedia.id]) {
            return this.mediaQueryListPseudoClass[this.selectedMedia.id]
        }

        return null
    }
    
    get currentPseudoElements() {
        if (!this.selectedMedia) {
            return null
        }
        // console.log('currentCssList')
        // console.log(this.selectedMedia)
        // console.log(this.mediaQueryList)
        if (this.mediaQueryListPseudoElement[this.selectedMedia.id]) {
            return this.mediaQueryListPseudoElement[this.selectedMedia.id]
        }

        return null
    }

    hasMedia(media: BaseMediaQueryCss): boolean
    {
        return this.mediaQueryListCss[media.id] != null
    }

    cssAccessor()
    {
        if (!this.selectedMedia) {
            return null
        }

        return this.mediaQueryListCss[this.selectedMedia.id]
    }

    addCssForMedia(css: BasePropertyCss, mediaId: number)
    {
        // var list = this.getCurrentList()

        if (this.mediaQueryListCss[mediaId]) {
            this.mediaQueryListCss[mediaId].addNewProperty(css)
            this.mediaQueryListCssTmp[mediaId].addNewProperty(css)
        } else {
            throw Error('NOt exist Media Query with ID  ' + mediaId)
        }

    }
    
    addPseudoClassForMedia(css: PseudoClass, mediaId: number)
    {
        if (this.mediaQueryListPseudoClass[mediaId]) {
            this.mediaQueryListPseudoClass[mediaId].addNewSelector(css)
        } else {
            throw Error('NOt exist Media Query with ID  ' + mediaId)
        }

    }
    
    addPseudoElementForMedia(css: PseudoElement, mediaId: number)
    {
        if (this.mediaQueryListPseudoElement[mediaId]) {
            this.mediaQueryListPseudoElement[mediaId].addNewSelector(css)
        } else {
            throw Error('NOt exist Media Query with ID  ' + mediaId)
        }

    }

    protected getCurrentList() {
        var media = this.selectedMedia
        if (!media) {
            return null
        }
        if (this.mediaQueryListPseudoClass[this.selectedMedia.id]) {
            if (this.mediaQueryListPseudoClass[this.selectedMedia.id].selectedSelector) {

                return this.mediaQueryListPseudoClass[this.selectedMedia.id].selectedSelector.cssAccessor
            }
        }
        
        if (this.mediaQueryListPseudoElement[this.selectedMedia.id]) {
            if (this.mediaQueryListPseudoElement[this.selectedMedia.id].selectedSelector) {
                return this.mediaQueryListPseudoElement[this.selectedMedia.id].selectedSelector.cssAccessor
            }
        }

        if (!this.hasMedia(media)) {
            this.mediaQueryListCss[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        return this.mediaQueryListCss[media.id]

    }

    setNewValCssForMedia(css: BasePropertyCss)
    {
        var list = this.getCurrentList()

        if (list.hasCssProperty(css.getName())) {
            list.setNewPropertyValue(css.getName(), css)

        } else {
            list.addNewProperty(css)
        }

        this.setNewValCssForMediaTmp(css)
    }

    removeCssFromMedia(css: BasePropertyCss)
    {
        var list = this.getCurrentList()
        if (list) {
            list.removePropWithName(css.getName())
        }
    }

    public removePropWithName(name: string) {
        var list = this.getCurrentList()
        if (list) {
            list.removePropWithName(name)
        }
    }

    addCssForMediaTmp( css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (!this.hasMedia(media)) {
            this.mediaQueryListCssTmp[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        this.mediaQueryListCssTmp[media.id].addNewProperty(css)
    }

    getProperty(name: string){
        var list = this.getCurrentList()
            // console.trace( media)
        if (list) {
            // console.trace( name)

            return list.getProperty(name)
        }

        return null
    }

    getPropertyForMedia(name: string, mediaId: number){
        if (this.mediaQueryListCss[mediaId]) {
            // console.trace( media)
            // console.trace( media)

            return this.mediaQueryListCss[mediaId].getProperty(name)
        }

        return null
    }

    setNewValCssForMediaTmp(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (!this.hasMedia(media)) {
            this.mediaQueryListCssTmp[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        if (this.mediaQueryListCssTmp[media.id].hasCssProperty(css.getName())) {
            this.mediaQueryListCssTmp[media.id].setNewPropertyValue(css.getName(), css)

        } else {
            this.mediaQueryListCssTmp[media.id].addNewProperty(css)

        }
    }

    removeCssFromMediaTmp(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (this.hasMedia(media)) {
            this.mediaQueryListCssTmp[media.id].removePropWithName(css.getName())
        }
    }

    notify() {
        this.init()
    }
}
