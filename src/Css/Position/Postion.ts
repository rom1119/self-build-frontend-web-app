import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class Position extends CssSimple implements CssPropertyLimitable
{
    
    public static PROP_NAME = 'position'
    public getName(): string {
        return Position.PROP_NAME
    }

    getAccessableProperty(): any[] {
        throw new Error("Method not implemented.");
    }
}