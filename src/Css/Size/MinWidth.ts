import CssSimple from "../CssSimple";

export default class MinWidth extends CssSimple 
{
    public static PROP_NAME = 'min-width'
    public getName(): string {
        return MinWidth.PROP_NAME
    }
}