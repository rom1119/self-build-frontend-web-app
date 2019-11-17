import CssSimple from "../CssSimple";

export default class MaxWidth extends CssSimple 
{
    public static PROP_NAME = 'max-width'
    public getName(): string {
        return MaxWidth.PROP_NAME
    }
}