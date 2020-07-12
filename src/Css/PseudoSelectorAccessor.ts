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
export default abstract class PseudoSelectorAccessor<T extends PseudoSelector>
{
    protected tag: HtmlTag
    protected selectors: T[]

    constructor(val: HtmlTag) {
        this.tag = val
        Vue.set(this, 'selectors', [])
    }

    public removeAllByName(name: string) {
        let propsIndex = this.getSelectorsByName(name)

        for (const i of propsIndex) {
            
            this.selectors.splice(i, 1);
            
        }
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

    public setCssPropertyGoSelector(css: BasePropertyCss, newVal: T): PseudoSelectorAccessor<T>{
        let prop = this.getSelectorById(newVal.id)
        // console.log('lol');
        // console.log(propName);
        // console.log(newVal);
        // console.log('lol2');
        // console.log(this.cssProps);
        if (!prop) {
            throw new CssPropNotFound(`Property with ID ${newVal.id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }
        if (!prop.cssPropertyAccessor.hasCssProperty(css.getName())) {
            prop.cssPropertyAccessor.addNewProperty(css)
        } else {            

            prop.cssPropertyAccessor.setNewPropertyValue(css.getName(), css)
        }

        return this
    }
    
    public addCssToSelector(css: BasePropertyCss, val: T): PseudoSelectorAccessor<T>{
        let prop = this.getSelectorById(val.id)
        if (!prop) {
            throw new PseudoSelectorNotFound(`Property with name ${val.id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }

        // if (!prop.cssPropertyAccessor.hasCssProperty(css.getName())) {
            prop.cssPropertyAccessor.addNewProperty(css)
        // } else {            
        //     let currentBackground = this.tmpCssAccessor.getProperty(val.getName())
        //     if (currentBackground.getValue() === val.getValue()) {
        //         // return
        //     }
        //     this.tmpCssAccessor.setNewPropertyValue(propName, val)
        // }

        return this
    }
    
    public addNewSelector(newProp: T): PseudoSelectorAccessor<T>{

        Vue.set(this.selectors, this.selectors.length, newProp)
        // console.log(this.cssProps);
        
        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }
    
    public clearPropertyCss(id: number): PseudoSelectorAccessor<T>{
        let prop = this.getSelectorById(id)
        if (!prop) {
            throw new PseudoSelectorNotFound(`Property with ID ${id} not exist in this HTML ELEMENT ${this.tag.toString()}`)
        }

        prop.cssPropertyAccessor.replaceAll([])

        return this
    }

    public getSelectorsByName(name: string): T[]
    {
        
        let res = []
        // console.log(this.getAll());
        
        for (const el of this.getAll()) {
            if (el.getName() === name) {
                res.push(el)
            } 
        }

        return res
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
        return this.getSelectorsByName(name).length > 0;
    }

    public replaceAll(newCssList: T[])
    {
        this.selectors = newCssList
    }
}