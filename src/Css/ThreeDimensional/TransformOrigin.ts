import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class TransformOrigin extends CssSimple implements CssPropertyLimitable
{
    getAccessableProperty(): any[] {
        throw new Error("Method not implemented.");
    }
    public static PROP_NAME = 'transform-style'

    public static FLAT = 'flat'
    public static PRESERVE_3D = 'preserve-3d'


    public getName(): string {
        return TransformOrigin.PROP_NAME
    }
  


}