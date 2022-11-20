import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import Overflow from "./Overflow";

export default class OverflowX extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'overflow-x'
    public getName(): string {
        return OverflowX.PROP_NAME
    }

    static getAccessableProperty(): any[] {
        return Overflow.getAccessableProperty()
    }
    getAccessableProperty(): any[] {
        return OverflowX.getAccessableProperty()
    }


}