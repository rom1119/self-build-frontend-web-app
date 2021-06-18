import HtmlTag from '../Layout/HtmlTag';
import BasePropertyCss from './BasePropertyCss';
import CssPropNotFound from '../Errors/CssPropNotFound';
import CssComposite from './CssComposite';
import Unit from '../Unit/Unit';
import LayoutEl from '../LayoutEl';
import Vue from 'vue';
import { PositionCss } from '.';
import PseudoSelector from '../PseudoSelector/PseudoSelector';
import PseudoSelectorNotFound from '../Errors/PseudoSelectorNotFound';
import BaseSelector from '../BaseSelector';
import PseudoSelectorAccessor from './PseudoSelectorAccessor';
import SelectorOwner from '../SelectorOwner';
export default abstract class SelectorAccessor<T extends BaseSelector>
{
    protected tag: SelectorOwner
    protected selectors: T[]
    selectedSelector: PseudoSelector


    constructor(val: SelectorOwner) {
        this.tag = val
        Vue.set(this, 'selectors', [])
        this.selectedSelector = null
    }

    get ownerId() {
        return this.tag.uuid
    }

    public removeByName(name: string) {
        let propsIndex = null

        for (let i = 0; i < this.selectors.length; i++) {
            var selector = this.selectors[i]
            if (selector.getName() === name) {
                propsIndex = i
                break
            }
        }

        this.selectors.splice(propsIndex, 1);
    }

    public removeById(id: number) {
        let propsIndex = null

        for (let i = 0; i < this.selectors.length; i++) {
            var selector = this.selectors[i]
            if (selector.id === id) {
                propsIndex = i
                break
            }
        }

        this.selectors.splice(propsIndex, 1);
    }

    public isPropertyLikeThis(prop: T, propNameToCompare: string): boolean
    {
        var lowerPropName = prop.getName().toLowerCase()
        var lowerPropNameToCompare = propNameToCompare.toLowerCase()

        var regex = new RegExp(lowerPropNameToCompare,"g")
        // var re = new RegExp(replace,"g");

        // console.log(str);
        // console.log(regex);
        // console.log(catName.match(regex));

        if (lowerPropName.match(regex)) {
            return true
        }
        return false
    }

    public getAll(): T[]
    {
        return this.selectors
    }

    get all(): T[]
    {
        return this.selectors
    }

    public setCssPropertyGoSelector(css: BasePropertyCss, newVal: T): SelectorAccessor<T>{
        let prop = this.getSelectorById(newVal.id)
        // console.log('lol');
        // console.log(propName);
        // console.log(newVal);
        // console.log('lol2');
        // console.log(this.cssProps);
        if (!prop) {
            throw new CssPropNotFound(`Property with ID ${newVal.id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }
        if (!prop.cssAccessor.hasCssProperty(css.getName())) {
            prop.cssAccessor.addNewProperty(css)
        } else {

            prop.cssAccessor.setNewPropertyValue(css.getName(), css)
        }

        return this
    }

    public addCssToSelector(css: BasePropertyCss, val: T): SelectorAccessor<T>{
        let prop = this.getSelectorById(val.id)
        if (!prop) {
            throw new PseudoSelectorNotFound(`Property with name ${val.id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }

        // if (!prop.cssPropertyAccessor.hasCssProperty(css.getName())) {
            prop.cssAccessor.addNewProperty(css)
        // } else {
        //     let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
        //     if (currentBackground.getValue() === val.getValue()) {
        //         // return
        //     }
        //     this.tmpCssAccessor.setNewPropertyValue(propName, val)
        // }

        return this
    }

    public addNewSelector(newProp: T): SelectorAccessor<T>{

        newProp.setApi(this.tag.api)
        Vue.set(this.selectors, this.selectors.length, newProp)
        // console.log(this.cssProps);

        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }

    public clearPropertyCss(id: number): SelectorAccessor<T>{
        let prop = this.getSelectorById(id)
        if (!prop) {
            throw new PseudoSelectorNotFound(`Property with ID ${id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }

        prop.cssAccessor.replaceAll([])

        return this
    }

    public getSelectorByName(name: string): T
    {

        let res = []
        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.getName() === name) {
                return el
            }
        }

        return null
    }

    public getSelectorById(id: number): T
    {

        // console.log(this.getAll());

        for (const el of this.getAll()) {
            if (el.id === id) {
                return el
            }
        }

        return null
    }

    public hasCssProperty(name: string): boolean
    {
        return this.getSelectorByName(name) != null;
    }

    public replaceAll(newCssList: T[])
    {
        this.selectors = newCssList
    }
}
