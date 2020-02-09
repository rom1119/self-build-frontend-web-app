import CssPropertyAccessor from "./Css/CssPropertyAccessor";
import BasePropertyCss from "./Css/BasePropertyCss";
import ContentElPropertyAccessor from "./Css/PropertyAccessor/ContentElCssPropertyAccessor";

export default abstract class LayoutEl {

    protected _lastSynch: Date;
    protected _uuid: string;
    protected _cssPropertyAccesor: CssPropertyAccessor
    protected _updateComponent = 0
    protected _htmlEl = null

    protected _children: LayoutEl[] = []
    protected _active: boolean = true;  

    constructor()
    {
        this._uuid = Math.floor(Math.random() * 10000000) + ''
        // this.initCssAccessor()
    }

    protected initCssAccessor()
    {
        this._cssPropertyAccesor = new ContentElPropertyAccessor(this)
    }

    public isActive(): boolean {
        return this._active === true
    }
    
    public activate() {
        this._active = true
    }

    public deactivate() {
        this._active = false
    }

    get cssAccessor(): CssPropertyAccessor
    {
        return this._cssPropertyAccesor
    }

    public updateCssProperty(propName: string, val: BasePropertyCss)
    {
        let currentBackground = this.cssAccessor.getProperty(val.getName())
        // console.log(`%c$ PPPPPP`)
        // console.log(currentBackground.getValue())
        // console.log(val)
        // console.log(val.getValue())
        // console.log(currentBackground.getUnit())
        // console.log(val.getUnit())
        if (currentBackground.getValue() == val.getValue()) {
            return
        }
        this._cssPropertyAccesor.setNewPropertyValue(propName, val)
        this.updateModelComponent()
    }
    
    public updateCssPropertyWithoutModel(propName: string, val: BasePropertyCss)
    {
        if (!this.cssAccessor.hasCssProperty(val.getName())) {
            this.cssAccessor.addNewProperty(val)
        } else {            
            let currentBackground = this.cssAccessor.getProperty(val.getName())
            if (currentBackground.getValue() === val.getValue()) {
                return
            }
            this._cssPropertyAccesor.setNewPropertyValue(propName, val)
        }
    }
    
    public updateModelComponent()
    {
        this._updateComponent++
    }

    get updateComponentKey()
    {
        return this._updateComponent
    }
    
    get lastSynch(): Date
    {
        return this._lastSynch
    }
    set lastSynch(date: Date)
    {
        this._lastSynch = date
    }

    get uuid() : string
    {
        return this._uuid
    }

    get children(): LayoutEl[]
    {
        return this._children
    }

    set children(arg: LayoutEl[])
    {
        this._children = arg
    }

    public equals(el: LayoutEl): boolean
    {
        return this.uuid === el.uuid
    }
    

    public setHtmlEl(htmlEl)
    {
        this._htmlEl = htmlEl
    }
    
    public getHtmlEl()
    {
        return this._htmlEl
    }

    
}
