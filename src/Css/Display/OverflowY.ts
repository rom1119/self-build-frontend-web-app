import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import Overflow from "./Overflow";

export default class OverflowY extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'overflow-y'
    public getName(): string {
        return OverflowY.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        return Overflow.getAccessableProperty()
    }
    getAccessableProperty(): any[] {
        return OverflowY.getAccessableProperty()
    }


}