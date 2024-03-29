import CssPropertyAccessor from "~/src/Css/CssPropertyAccessor";
import BaseMediaQueryCss from "~/src/MediaQuery/BaseMediaQueryCss";
import LayoutEl from "~/src/LayoutEl";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import Vue from 'vue';
import CssPropNotFound from "~/src/Errors/CssPropNotFound";
import CssComposite from "~/src/Css/CssComposite";
import CssOwner from '../../../CssOwner';

export default class CssListAndMediaQueryAccessor<T>{

    value: T
    mediaQuery: BaseMediaQueryCss

    protected cssProps: BasePropertyCss[]

    constructor(val: T, mediaQuery: BaseMediaQueryCss) {
        this.value = val
        this.mediaQuery = mediaQuery
        Vue.set(this, 'cssProps', [])
        // Vue.set(this, 'cssProps', [])
    }

    public removePropWithName(name: string) {
        let prop = this.getProperty(name)

        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            prop.setActive(false)
            this.cssProps.splice(index, 1);
        }
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

    public removeAll()
    {
        Vue.set(this, 'cssProps', [])
    }

    get all(): BasePropertyCss[]
    {
        return this.cssProps
    }

    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssListAndMediaQueryAccessor<T>{
        let prop = this.getProperty(propName)
        // console.log('lol');
        // console.log(propName);
        // console.log(newVal);
        // console.log('lol2');
        // console.log(this.cssProps);
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.value.toString()}`)
        }
        // prop.clearValue()
        // this.cssProps.splice
        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            this.cssProps[index].setActive(true)
            if (this.cssProps[index].getValue() != newVal.getValue()) {
                this.cssProps[index].setValue(newVal.getClearValue())
                this.cssProps[index].setUnit(newVal.getUnit())

            }
        }
        // let oldVal = this.cssProps.splice(index, 1)
        // prop.setValue(val)
        // this.cssProps.push(prop)

        return this
    }

    public addPropertyValue(propName: string, val: BasePropertyCss): CssListAndMediaQueryAccessor<T>{
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

    public addNewProperty(newProp: BasePropertyCss): CssListAndMediaQueryAccessor<T>{
        let prop = this.getProperty(newProp.getName())

        if (prop) {
            throw new CssPropNotFound(`Property with name ${newProp.getName()} has exist in this HTML ELEMENT ${this.toString()} you can not add two the same css property`)
        }
        newProp.initOwner(<CssOwner><unknown>this.value)

        Vue.set(this.cssProps, this.cssProps.length, newProp)
        // console.log(this.cssProps);

        // prop.clearValue()
        // this.cssProps.push(newProp)

        return this
    }

    public clearPropertyValues(propName: string): CssListAndMediaQueryAccessor<T>{
        let prop = this.getProperty(propName)
        if (!prop) {
            throw new CssPropNotFound(`Property with name ${propName} not exist in this HTML ELEMENT ${this.toString()}`)
        }
        prop.clearValue()

        return this
    }

    public getProperty(name: string): BasePropertyCss
    {

        let prop = null
        // console.log(this.getAll());

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
