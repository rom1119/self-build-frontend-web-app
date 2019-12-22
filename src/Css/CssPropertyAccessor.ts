import HtmlTag from '../Layout/HtmlTag';
import BasePropertyCss from './BasePropertyCss';
import CssPropNotFound from '../Errors/CssPropNotFound';
import CssComposite from './CssComposite';
import Unit from '../Unit/Unit';
import LayoutEl from '../LayoutEl';
export default abstract class CssPropertyAccessor
{
    protected value: LayoutEl
    protected cssProps: BasePropertyCss[]
    constructor(val: LayoutEl) {
        this.value = val
        this.cssProps = []
    }

    public isPropertyLikeThis(prop: BasePropertyCss, propNameToCompare: string): boolean
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

    public getAll(): BasePropertyCss[]
    {
        return this.cssProps
    }
    
    get all(): BasePropertyCss[]
    {
        return this.cssProps
    }

    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssPropertyAccessor{
        let prop = this.getProperty(propName)
        // console.log('lol');
        // console.log(propName);
        // console.log(prop);
        // console.log('lol2');
        // console.log(this.cssProps);
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.value.toString()}`)
        }
        // prop.clearValue()
        // this.cssProps.splice
        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            if (this.cssProps[index].getValue() != newVal.getValue()) {
                this.cssProps[index] = newVal;

            }
        }
        // let oldVal = this.cssProps.splice(index, 1)
        // prop.setValue(val)
        // this.cssProps.push(prop)

        return this
    }
    
    public addPropertyValue(propName: string, val: BasePropertyCss): CssPropertyAccessor{
        let prop = this.getProperty(propName)
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.toString()}`)
        }
        // prop.clearValue()
        if (prop instanceof CssComposite) {
            prop.addPropVal(val.getValue())

        }

        return this
    }
    
    public addNewProperty(newProp: BasePropertyCss): CssPropertyAccessor{
        let prop = this.getProperty(newProp.getName())
        
        if (prop) {
            throw new CssPropNotFound(`Property with name ${newProp.getName()} has exist in this HTML ELEMENT ${this.toString()} you can not add two the same css property`)
        }
        // prop.clearValue()
        this.cssProps.push(newProp)

        return this
    }
    
    public clearPropertyValues(propName: string): CssPropertyAccessor{
        let prop = this.getProperty(name)
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.toString()}`)
        }
        prop.clearValue()

        return this
    }

    public getProperty(name: string): BasePropertyCss
    {
        
        let prop = null
        for (const el of this.getAll()) {
            if (el.getName() === name) {
                return el
            } 
        }

        return null
    }

    public hasCssProperty(name: string): boolean
    {
        return this.getProperty(name) != null;
    }

    public replaceAll(newCssList: BasePropertyCss[])
    {
        this.cssProps = newCssList
    }
}