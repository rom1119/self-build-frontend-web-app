import CssSimple from "../../CssSimple";
import CssPropertyLimitable from "../../CssPropertyLimitable";

export default class BorderGlobalColor extends CssSimple implements CssPropertyLimitable
{
    public static PROP_NAME = 'border-color'
    public getName(): string {
        return BorderGlobalColor.PROP_NAME
    }

    public static TRANSPARENT = 'transparent'
    public static RED = 'red'
    public static GREEN = 'green'
    public static BLUE = 'blue'
    public static YELLOW = 'yellow'
    public static AQUA = 'aqua'
    public static WHITE = 'white'
    public static BLACK = 'black'
    public static GRAY = 'gray'
    public static PINK = 'pink'
    static getAccessableProperty(): any[] {
        let props = []
        props.push(BorderGlobalColor.TRANSPARENT)
        props.push(BorderGlobalColor.RED)
        props.push(BorderGlobalColor.GREEN)
        props.push(BorderGlobalColor.BLUE)
        props.push(BorderGlobalColor.AQUA)
        props.push(BorderGlobalColor.WHITE)
        props.push(BorderGlobalColor.BLACK)
        props.push(BorderGlobalColor.GRAY)
        props.push(BorderGlobalColor.PINK)

        return props
    }
    getAccessableProperty(): any[] {
        return BorderGlobalColor.getAccessableProperty()
    }
}