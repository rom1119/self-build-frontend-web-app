import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import CssListAndMediaQueryAccessor from "~/src/Css/PropertyAccessor/mediaQuery/CssListAndMediaQueryAccessor";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import MediaQueryAccessor from "~/src/MediaQuery/MediaQueryAccessor";
import Vue from 'vue';
import SubscriberMediaAccessor from "~/src/MediaQuery/SubscriberMediaAccessor";

interface MediaCssList {
    property: string;
}

export default class MediaQueryListOwner<T> implements SubscriberMediaAccessor{

    protected owner: T
    private _mediaQueryAccessor: MediaQueryAccessor<MediaQueryCss>

    protected mediaQueryList: { [key: string]: CssListAndMediaQueryAccessor<T>} = {}
    protected mediaQueryListTmp: { [key: string]: CssListAndMediaQueryAccessor<T>} = {}


    constructor( owner: T, mediaQueryAccessor: MediaQueryAccessor<MediaQueryCss>) {
        this.owner = owner;
        this._mediaQueryAccessor = mediaQueryAccessor;
        Vue.set(this, 'mediaQueryList', {})
        Vue.set(this, 'mediaQueryListTmp', {})
        // this.mediaQueryList = {};
        // this.mediaQueryListTmp = {};
        this.init()

        this._mediaQueryAccessor.addSubscriber(this)

    }

    public init() {
            // console.trace('init')
        Vue.set(this, 'mediaQueryList', {})
        Vue.set(this, 'mediaQueryListTmp', {})
        for(var el of this._mediaQueryAccessor.all) {
            // console.log(el)
            Vue.set(this.mediaQueryList, el.id, new CssListAndMediaQueryAccessor<T>(this.owner, el))
            Vue.set(this.mediaQueryListTmp, el.id, new CssListAndMediaQueryAccessor<T>(this.owner, el))

            // this.mediaQueryList[el.id] =
            // this.mediaQueryListTmp[el.id] = new CssListAndMediaQueryAccessor<T>(this.owner, el)

        }
        // console.log(this.mediaQueryList)
    }

    getMediaQueryCssList()
    {
        return this.mediaQueryList
    }

    get mediaQueryCssList()
    {
        return this.mediaQueryList
    }

    get selectedMedia(): BaseMediaQueryCss{
        if (!this._mediaQueryAccessor) {
            return null
        }

        return this._mediaQueryAccessor.selectedMediaQuery
    }

    get currentCssList(){
        // console.log('currentCssList')
        // console.log(this.selectedMedia)
        // console.log(this.mediaQueryList)
        if (this.mediaQueryList[this.selectedMedia.id]) {
            return this.mediaQueryList[this.selectedMedia.id]
        }



        return null
    }

    hasMedia(media: BaseMediaQueryCss): boolean
    {
        return this.mediaQueryList[media.id] != null
    }

    addCssForMedia(css: BasePropertyCss, mediaId: number)
    {
        if (this.mediaQueryList[mediaId]) {
            this.mediaQueryList[mediaId].addNewProperty(css)
            this.mediaQueryListTmp[mediaId].addNewProperty(css)
        } else {
            throw Error('NOt exist Media Query with ID  ' + mediaId)
        }

    }

    setNewValCssForMedia(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (!this.hasMedia(media)) {
            this.mediaQueryList[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        if (this.mediaQueryList[media.id].hasCssProperty(css.getName())) {
            this.mediaQueryList[media.id].setNewPropertyValue(css.getName(), css)

        } else {
            this.mediaQueryList[media.id].addNewProperty(css)

        }

        this.setNewValCssForMediaTmp(css)
    }

    removeCssFromMedia(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (this.hasMedia(media)) {
            this.mediaQueryList[media.id].removePropWithName(css.getName())
        }
    }

    public removePropWithName(name: string) {
        var media = this.selectedMedia
        if (this.hasMedia(media)) {
            this.mediaQueryList[media.id].removePropWithName(name)
        }
    }

    addCssForMediaTmp( css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (!this.hasMedia(media)) {
            this.mediaQueryListTmp[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        this.mediaQueryListTmp[media.id].addNewProperty(css)
    }

    getProperty(name: string){
        var media = this.selectedMedia
            console.trace( media)
        if (media) {
            console.trace( name)

            return this.mediaQueryList[media.id].getProperty(name)
        }

        return null
    }

    getPropertyForMedia(name: string, mediaId: number){
        if (this.mediaQueryList[mediaId]) {
            // console.trace( media)
            // console.trace( media)

            return this.mediaQueryList[mediaId].getProperty(name)
        }

        return null
    }

    setNewValCssForMediaTmp(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (!this.hasMedia(media)) {
            this.mediaQueryListTmp[media.id] = new CssListAndMediaQueryAccessor<T>(this.owner, media)
        }

        if (this.mediaQueryListTmp[media.id].hasCssProperty(css.getName())) {
            this.mediaQueryListTmp[media.id].setNewPropertyValue(css.getName(), css)

        } else {
            this.mediaQueryListTmp[media.id].addNewProperty(css)

        }
    }

    removeCssFromMediaTmp(css: BasePropertyCss)
    {
        var media = this.selectedMedia
        if (this.hasMedia(media)) {
            this.mediaQueryListTmp[media.id].removePropWithName(css.getName())
        }
    }

    notify() {
        this.init()
    }
}
