import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class TransformStyle extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'transform-style'
    
    public static FLAT = 'flat'
    public static PRESERVE_3D = 'preserve-3d'
    
    
    public getName(): string {
        return TransformStyle.PROP_NAME
    }
    getAccessableProperty(): any[] {
        let props = []
        props.push(TransformStyle.FLAT)
        props.push(TransformStyle.PRESERVE_3D)
        return props
    }
  


}