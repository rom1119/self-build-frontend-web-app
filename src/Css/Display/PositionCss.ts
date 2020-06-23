import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import Named from '../../Unit/Named';

export default class PositionCss extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'position'
    public getName(): string {
        return PositionCss.PROP_NAME
    }
    public static STATIC = 'static'
    public static ABSOLUTE = 'absolute'
    public static RELATIVE = 'relative'
    public static FIXED = 'fixed'

    public static NEW_ABSOLUTE()
    {
        return new this(PositionCss.ABSOLUTE, new Named())
    }
    
    public static NEW_RELATIVE()
    {
        return new this(PositionCss.RELATIVE, new Named())
    }

    static getAccessableProperty(): any[] {
        let props = []
        props.push(PositionCss.STATIC)
        props.push(PositionCss.ABSOLUTE)
        props.push(PositionCss.RELATIVE)
        props.push(PositionCss.FIXED)

        return props
    }
    getAccessableProperty(): any[] {
        return PositionCss.getAccessableProperty()
    }


}