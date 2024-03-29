import HtmlTag from '../Layout/HtmlTag';

import SelectorOwner from '../SelectorOwner';
import BaseMediaQueryCss from './BaseMediaQueryCss';
import Vue from 'vue';
import DefaultMediaQueryApiService from '../Api/impl/DefaultMediaQueryApiService';
import MediaQueryApiService from '../Api/MediaQueryApiService';
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";
import SubscriberMediaAccessor from "~/src/MediaQuery/SubscriberMediaAccessor";
export default class MediaQueryAccessor<T extends BaseMediaQueryCss>
{
    protected tag: SelectorOwner
    protected mediaQueries: T[]
    protected subscribers: SubscriberMediaAccessor[]
    protected api: MediaQueryApiService
    protected _selectedMediaQuery: BaseMediaQueryCss

    constructor() {
        // this.tag = val
        Vue.set(this, 'mediaQueries', [])
        Vue.set(this, 'subscribers', [])
        var a = new MediaQueryCss()
        a.id = 9999999
        Vue.set(this, 'selectedMediaQuery', null)
        this.api = new DefaultMediaQueryApiService()

    }

    addSubscriber(el: SubscriberMediaAccessor)
    {
        this.subscribers.push(el)
    }

    get selectedMediaQuery() {
        return this._selectedMediaQuery
    }

    set selectedMediaQuery(arg) {
        this._selectedMediaQuery = arg
    }

    public removeById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.mediaQueries.length; i++) {
            var selector = this.mediaQueries[i]
            if (selector.id === id) {
                propsIndex = i
                break
            }
        }

        this.mediaQueries.splice(propsIndex, 1);

        this.notifySubscribers()
    }

    // public isPropertyLikeThis(prop: T, propNameToCompare: string): boolean
    // {
    //     var lowerPropName = prop.getName().toLowerCase()
    //     var lowerPropNameToCompare = propNameToCompare.toLowerCase()

    //     var regex = new RegExp(lowerPropNameToCompare,"g")
    //     // var re = new RegExp(replace,"g");

    //     // console.log(str);
    //     // console.log(regex);
    //     // console.log(catName.match(regex));

    //     if (lowerPropName.match(regex)) {
    //         return true
    //     }
    //     return false
    // }

    public getApi(): MediaQueryApiService
    {
        return this.api
    }

    public getAll(): T[]
    {
        return this.mediaQueries
    }

    get all(): T[]
    {
        return this.mediaQueries
    }


    // public addCssToSelector(css: BasePropertyCss, val: T): SelectorAccessor<T>{
    //     let prop = this.getSelectorById(val.id)
    //     if (!prop) {
    //         throw new PseudoSelectorNotFound(`Property with name ${val.id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
    //     }

    //     // if (!prop.cssPropertyAccessor.hasCssProperty(css.getName())) {
    //         prop.cssAccessor.addNewProperty(css)
    //     // } else {
    //     //     let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
    //     //     if (currentBackground.getValue() === val.getValue()) {
    //     //         // return
    //     //     }
    //     //     this.tmpCssAccessor.setNewPropertyValue(propName, val)
    //     // }

    //     return this
    // }

    notifySubscribers()
    {
        for(var el of this.subscribers) {
            el.notify()
        }
    }

    public addNewMediaQuery(newProp: T): MediaQueryAccessor<T>{

        newProp.setApi(this.api)
        Vue.set(this.mediaQueries, this.mediaQueries.length, newProp)

        this.notifySubscribers()

        // console.log(this.cssProps);

        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }

    // public clearPropertyCss(id: number): SelectorAccessor<T>{
    //     let prop = this.getSelectorById(id)
    //     if (!prop) {
    //         throw new PseudoSelectorNotFound(`Property with ID ${id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
    //     }

    //     prop.cssAccessor.replaceAll([])

    //     return this
    // }


    public getById(id: number): T
    {

        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.id === id) {
                return el
            }
        }

        return null
    }

    // public hasCssProperty(name: string): boolean
    // {
    //     return this.getSelectorByName(name) != null;
    // }

    public replaceAll(newCssList: T[])
    {
        this.mediaQueries = newCssList
    }
}
