import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssMultipleValue from "../CssMultipleValue";
import Vue from "vue";

export class FontName {
    id
    protected _name

    set name(val)
    {
        Vue.set(this, '_name', val)
    }
    
    get name()
    {
        return this._name
    }
}

export default class FontFamily extends CssSimple implements CssPropertyLimitable, CssMultipleValue<FontName>
{
    
    public static PROP_NAME = 'font-family'
    public getName(): string {
        return FontFamily.PROP_NAME
    }
    public static SERIF = 'serif'
    public static SANF_SERIF = 'sans-serif'
    public static CURSIVE = 'cursive'
    public static FANTASY = 'fantasy'
    public static MONOSPACE = 'monospace'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(FontFamily.SERIF)
        props.push(FontFamily.SANF_SERIF)
        props.push(FontFamily.CURSIVE)
        props.push(FontFamily.FANTASY)
        props.push(FontFamily.MONOSPACE)

        return props
    }
    getAccessableProperty(): any[] {
        return FontFamily.getAccessableProperty()
    }

    getValueByIndex(index: number): FontName {
        throw new Error("Method not implemented.");
    }
    getValues(): FontName[] {
        throw new Error("Method not implemented.");
    }
    addValue(val: FontName) {
        throw new Error("Method not implemented.");
    }
    removeValue(val: FontName) {
        throw new Error("Method not implemented.");
    }

}