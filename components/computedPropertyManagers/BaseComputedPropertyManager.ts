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
    protected autoSaving = false

    autoSave(arg: boolean) {
        this.autoSaving = arg
    }
    abstract getDefaultVal(): any;
    abstract getDefaultUnit(): Unit;

    protected newProperty() {
        return this.createInitProperty()
    }

    protected abstract createInitProperty(): T

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
        // console.log('getPropertyCssFromModel');
        // console.log(prop);
        // console.log('this.value.selectedSelector', this.value.selectedSelector);
        // console.log('this.value.currentCssAccessor', this.value.currentCssAccessor);
        
        var activeSelector = this.value.selectedSelector 
        if (activeSelector) {
            // console.log('activeSelector val,', <T>activeSelector.getPropertyCss(prop));

            return <T>activeSelector.getPropertyCss(prop)
            
        }
        // console.log(this.value);
        // console.log(this.value.getPropertyCss(prop));
        return <T>this.value.getPropertyCss(prop)
    }

    protected getTmpPropertyCssFromModel(prop: string): T
    {
        if (!this.value) {
            return null
        }
        // console.log('getPropertyCssFromModel');
        // console.log(prop);
        // console.log('this.value.selectedSelector', this.value.selectedSelector);
        // console.log('this.value.currentCssAccessor', this.value.currentCssAccessor);
        
        var activeSelector = this.value.selectedSelector 
        if (activeSelector) {
            // console.log('activeSelector val,', <T>activeSelector.getPropertyCss(prop));

            return <T>activeSelector.getTmpPropertyCss(prop)
            
        }
        // console.log(this.value);
        // console.log(this.value.getTmpPropertyCss(prop));
        return <T>this.value.getTmpPropertyCss(prop)
    }

    protected setTmpPropertyToModel(newCssProp: T)
    {
        if (!this.value) {
            return false
        }
        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            // if (!activeSelector.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            //     activeSelector.tmpCssAccessor.addNewProperty(newCssProp)
            // } else {
            //
            // }
            activeSelector.updateTmpCssPropertyWithoutModel(newCssProp.getName(), newCssProp)

        } else {
            // if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            //     this.value.tmpCssAccessor.addNewProperty(newCssProp)
            // } else {
            //
            // }
            this.value.updateTmpCssPropertyWithoutModel(newCssProp.getName(), newCssProp)

        }
        // this.value.updateModelComponent()

    }

    init() {
        var prop = this.getPropertyCssFromModel(this.getProperty().getName())
        var propTmp = this.getTmpPropertyCssFromModel(this.getProperty().getName())
        let clearval = this.getProperty().getClearValue()
        let unit = this.getProperty().getUnit()

        if (prop) {
            this.setProperty(prop)
            this.getProperty().setActive(true)
            this.setTmpPropertyToModel(prop)

        } else if (propTmp) {
            this.setProperty(propTmp)
            this.getProperty().setActive(false)
        } else {
            this.setProperty(this.newProperty())
            this.getProperty().setActive(false)
            this.getProperty().id = null
            let copy = this.getProperty().deepCopy(this.getProperty())
            this.setProperty(copy)
            this.setTmpPropertyToModel(copy)
            // this.getProperty().clearValue()
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
        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            activeSelector.removeCssPropertyByName(prop.getName())
            activeSelector.synchronize()

        } else {
            this.value.removeCssPropertyByName(prop.getName())

        }
        prop.id = null
        prop.setActive(false)

        this.value.synchronize()
        return null
    }
    activePropCss(prop: T) {
        prop.id = null
        prop.setActive(true)

        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            // if (!activeSelector.cssAccessor.hasCssProperty(prop.getName())) {
            //     activeSelector.cssAccessor.addNewProperty(prop)
            // }
            activeSelector.updateCssPropertyWithoutModel(prop.getName(), prop)
            // activeSelector.synchronize()
        } else {
            // if (!this.value.cssAccessor.hasCssProperty(prop.getName())) {
            //
            // }
            this.value.updateCssPropertyWithoutModel(prop.getName(), prop)
        }

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
        // console.log('ALA MA');
        var activeSelector = this.value.selectedSelector
        if (activeSelector) {
            activeSelector.updateCssPropertyWithoutModel(newProp.getName(), newProp)
            // activeSelector.synchronize()

        } else {
            this.value.updateCssPropertyWithoutModel(newProp.getName(), newProp)

        }

        return newProp.getClearValue()
    }

}
