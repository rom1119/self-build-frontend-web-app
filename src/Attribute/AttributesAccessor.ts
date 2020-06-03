import HtmlTag from '../Layout/HtmlTag';
import CssPropNotFound from '../Errors/CssPropNotFound';
import Unit from '../Unit/Unit';
import LayoutEl from '../LayoutEl';
import Vue from 'vue';
import HtmlAttribute from './HtmlAttr';
import HtmlAttr from './HtmlAttr';
export default abstract class AttributesAccessor
{
    
    protected value: LayoutEl
    protected attrs: HtmlAttr[]

    constructor(val: LayoutEl) {
        this.value = val
        Vue.set(this, 'attrs', [])

    }

    public removeByName(name: string) {
        let prop = this.getAttribute(name)

        let index = this.attrs.indexOf(prop)
        if (index !== -1) {
            this.attrs.splice(index, 1);
        }
    }

    public getAll(): HtmlAttr[]
    {
        return this.attrs
    }
    
    get all(): HtmlAttr[]
    {
        return this.attrs
    }

    public setNewWithValue(propName: string, newVal: string): AttributesAccessor{
        let attr = this.getAttribute(propName)
        // console.log('lol');
        // console.log(propName);
        // console.log(newVal);
        // console.log('lol2');
        // console.log(this.cssProps);
        if (!attr) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.value.toString()}`)
        }
        // prop.clearValue()
        // this.cssProps.splice
        let index = this.attrs.indexOf(attr)
        if (index !== -1) {
            if (this.attrs[index].key != newVal) {
                this.attrs[index].setValue(newVal)

            }
        }
        // let oldVal = this.cssProps.splice(index, 1)
        // prop.setValue(val)
        // this.cssProps.push(prop)

        return this
    }
    
    public addValue(attrName: string, val: HtmlAttr): AttributesAccessor{
        let prop = this.getAttribute(attrName)
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${attrName} not exist in this HTML ELEMENT ${this.toString()}`)
        }



        return this
    }
    
    public addNewAttribute(newProp: HtmlAttr): AttributesAccessor{
        let prop = this.getAttribute(newProp.key)
        
        if (prop) {
            return
        }
        Vue.set(this.attrs, this.attrs.length, newProp)
        // console.log(this.cssProps);
        
        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }
    
    public clearPropertyValues(propName: string): AttributesAccessor{
        let prop = this.getAttribute(name)
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.toString()}`)
        }
        prop.clearValue()

        return this
    }

    public getAttribute(name: string): HtmlAttr
    {
        
        let prop = null
        for (const el of this.getAll()) {
            if (el.key === name) {
                return el
            } 
        }

        return null
    }

    public hasCssProperty(name: string): boolean
    {
        return this.getAttribute(name) != null;
    }

    public replaceAll(newCssList: HtmlAttr[])
    {
        this.attrs = newCssList
    }

    public toBasicObject(): {}
    {
        var res

        if (this.all.length) {
            for (const attr of this.all) {
                res[attr.key] = {
                    key: attr.key,
                    value: attr.value
                }
                // domain..push(subModel)
            }
        }
        return res
    }
}