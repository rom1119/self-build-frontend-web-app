import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage } from "~/src/Css";
import ComputedPropertyManager from "./ComputedPropertyManager";
import FetcherRealCssProp from '../../src/FetcherRealCssProp';
import UnitUrl from '../../src/Unit/UnitUrl';
import _ from 'lodash'
import Unit from '../../src/Unit/Unit';
import CssResource from '../../src/Css/CssResource';


export default abstract class BaseComputedPropertyManager<T extends BasePropertyCss> implements ComputedPropertyManager {

    protected value: HtmlTag
    
    protected DEFAULT_VAL: any
    protected DEFAULT_UNIT: Unit
    protected property: T
    protected realFetcher: FetcherRealCssProp

    abstract getDefaultVal(): any;
    abstract getDefaultUnit(): Unit;

    getProperty(): T 
    {
        return this.property
    }

    setProperty(arg: T)
    {
        this.property = arg   
    }

    public getHtmlTag()
    {
        return this.value
    }

    

    public setHtmlEl(val: HtmlTag)
    {
        this.value = val
    }
    
    public setFetcher(fetcher)
    {
        this.realFetcher = fetcher
    }

    protected getPropertyCssFromModel(prop: string): T
    {
        if (!this.value) { 
            return null
        }
        return <T>this.value.cssAccessor.getProperty(prop)
    }

    protected setTmpPropertyToModel(newCssProp: T)
    {
        if (!this.value) {
            return false
        }
        if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.tmpCssAccessor.addNewProperty(newCssProp)
        } else {
            this.value.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)
            
        }
        // this.value.updateModelComponent()

    }

    init() {
        var prop = this.getPropertyCssFromModel(this.getProperty().getName())
        let clearval = this.getProperty().getClearValue()
        let unit = this.getProperty().getUnit()
        
        if (prop) {
            this.setProperty(prop)
            this.getProperty().setActive(true)
        } else {

            this.getProperty().setActive(false)
            let copy = _.cloneDeep(this.getProperty())
            this.setProperty(copy)
            this.setTmpPropertyToModel(copy)
            // if (clearval) {
            //     this.getProperty().setValue(clearval)
            // } else {
            //     this.getProperty().setValue(this.getDefaultVal())
            //     this.getProperty().setUnit(this.getDefaultUnit())   
            // }
        }

        
    }

    deactiveGlobalPropCss(newProp: T) {
        throw new Error("Method not implemented.");
    }
    deactivePropCss(prop: T) {
        this.value.cssAccessor.removePropWithName(prop.getName())
        prop.id = null
        prop.setActive(false)
        console.log('deactivePropCss color');

        this.value.synchronize()
        return null
    }
    activePropCss(prop: T) {
        prop.id = null
        prop.setActive(true)

        if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
            this.value.cssAccessor.addNewProperty(prop)

        }
        console.log('activr color');
        
        this.value.synchronize()

        return prop
    }
    updateCssProp(newProp: T) {
        // console.log('ALA MA');
        // console.log(newProp.getUnit());
        // console.log(newProp);
        if (!this.getProperty().isActive()) {
            return
        }
        // let val = this.value.getComputedCssVal(newProp)
        // let clonedCss = _.cloneDeep(newProp)
        // clonedCss.setValue(val.toString())
        // clonedCss.setUnit(new Pixel())
        // console.log(newProp);
        // console.log(val);
        // console.log(clonedCss);
        // console.log('ALA MA');
        
        this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

        return newProp.getClearValue()
    }

}