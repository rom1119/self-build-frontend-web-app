import CssPropertyAccessor from "./Css/CssPropertyAccessor";
import BasePropertyCss from "./Css/BasePropertyCss";
import ContentElPropertyAccessor from "./Css/PropertyAccessor/ContentElCssPropertyAccessor";
import BoxSizing from './Css/BoxModel/BoxSizing';

export default abstract class LayoutEl {

    protected _lastSynch: Date;
    boxSizing: BoxSizing = null

    protected _uuid: string;
    protected _cssPropertyAccesor: CssPropertyAccessor
    protected _tmpCssPropertyAccesor: CssPropertyAccessor
    protected _updateComponent = 0
    protected _htmlEl: HTMLElement = null
    protected _htmlElHidden = null
    protected _htmlElOutsiteHidden = null
    protected _htmlContentEl = null

    protected _children: LayoutEl[] = []
    protected _active: boolean = true;
    parent: LayoutEl
    version: number = 1
    protected _shortUUID = ''

    constructor()
    {
        this._uuid = Math.floor(Math.random() * 100000000) + ''
        this._updateComponent = Math.floor(Math.random() * 100000000)
        // this.initCssAccessor()
    }

    // protected cloneDeep(oldEl: LayoutEl, newEl: LayoutEl) {
    //     this.clone(oldEl, newEl)
    //     newEl.children = []
    //     for (const child of oldEl.children) {
    //         var cloneChild = child.cloneDeep(child)
    //         newEl.children.push(cloneChild)
    //     }
    // }

    // protected clone(oldEl: LayoutEl, newEl: LayoutEl) {
    //     newEl.cssAccessor.removeAll()
    //     for (const css of oldEl.cssAccessor.all) {
    //         var cloneCss = css.deepCopy(css)
    //         newEl.cssAccessor.addNewProperty(cloneCss)
    //     }
    // }

    // protected copyEl() {

    // }

    get shortUUID(): string
    {
        return this._shortUUID
    }

    set shortUUID(arg: string)
    {
        this._shortUUID = arg
    }

    get attrIdHtmlBox()
    {
        return this._shortUUID
    }
    
    get attrIdHtmlEl()
    {
        return this._shortUUID + '-content'
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

    get tmpCssAccessor(): CssPropertyAccessor
    {
        return this._tmpCssPropertyAccesor
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
            var tmpProp = this.tmpCssAccessor.getProperty(propName)
            if (!tmpProp) {
                this.cssAccessor.addNewProperty(val)
                this.tmpCssAccessor.addNewProperty(val)
            } else {
                tmpProp.setActive(true)
                this.tmpCssAccessor.setNewPropertyValue(propName, val)
                this.cssAccessor.addNewProperty(tmpProp)

            }
        } else {
            let prop = this.cssAccessor.getProperty(val.getName())
            if (prop.getValue() === val.getValue()) {
                // return
            }
            this.cssAccessor.setNewPropertyValue(propName, val)
        }
    }

    public removeCssProperty(prop: BasePropertyCss)
    {
        this._cssPropertyAccesor.removePropWithName(prop.getName())
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

    set uuid(arg: string)
    {
        this._uuid = arg
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


    public setHtmlElHidden(htmlEl)
    {
        this._htmlElHidden = htmlEl
    }

    public getHtmlElHidden(): HTMLElement
    {
        return this._htmlElHidden
    }
    
    public setHtmlContentEl(htmlEl)
    {
        this._htmlContentEl = htmlEl
    }

    public getHtmlContentEl(): HTMLElement
    {
        return this._htmlContentEl
    }
    
    public setHtmlElOutsiteHidden(htmlEl)
    {
        this._htmlElOutsiteHidden = htmlEl
    }

    public getHtmlElOutsiteHidden(): HTMLElement
    {
        return this._htmlElOutsiteHidden
    }

    public setHtmlEl(htmlEl)
    {
        this._htmlEl = htmlEl
    }

    public getHtmlEl(): HTMLElement
    {
        return this._htmlEl
    }


}
