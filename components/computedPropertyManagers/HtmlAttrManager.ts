import CustomAttr from '~/src/Attribute/html/CustomAttr';
import HtmlAttr from '~/src/Attribute/HtmlAttr';
import HtmlTag from '~/src/Layout/HtmlTag';
import ComputedPropertyManager from './ComputedPropertyManager';
export default abstract class HtmlAttrManager<T extends HtmlAttr> {

    attr: T
    protected value: HtmlTag

    protected autoSaving = false

    autoSave(arg: boolean) {
        this.autoSaving = arg
    }
    constructor() {
        this.attr = this.createInitAttr()
    }

    public getHtmlTag()
    {
        return this.value
    }

    protected abstract createInitAttr(): T

    public setHtmlEl(val: HtmlTag)
    {
        this.value = val
    }
    
    getAttr(): T 
    {
        return this.attr
    }

    setAttr(arg: T)
    {
        this.attr = arg   
    }
    protected getAttrFromModel(prop: string): T
    {
        if (!this.value) { 
            return null
        }

        return <T>this.value.attributeAccessor.getAttribute(prop)
    }

    init() {
        var prop = this.getAttrFromModel(this.getAttr().key)
        
        if (prop) {
            this.setAttr(prop)
            this.getAttr().active  = true
        } else {

            
            this.getAttr().active  = false
            // if (clearval) {
            //     this.getProperty().setValue(clearval)
            // } else {
            //     this.getProperty().setValue(this.getDefaultVal())
            //     this.getProperty().setUnit(this.getDefaultUnit())   
            // }
        }

        
    }

    updateAttr(attr: T) {
        this.value.attributeAccessor.setNewWithValue(attr.key, attr.value)

        // attr.active = true
        this.value.synchronize()

    }

    activateAttr(attr: T) {

        this.value.attributeAccessor.addNewAttribute(attr)

        attr.active = true

        this.value.synchronize()
    }
    
    deactivateAttr(attr: T) {
        
        this.value.attributeAccessor.removeByName(attr.key)

        attr.active = false

        this.value.synchronize()
    }
}