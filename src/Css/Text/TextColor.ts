import CssSimple from "../CssSimple";

export default class TextColor extends CssSimple
{
    public static PROP_NAME = 'color'
    public getName(): string {
        return TextColor.PROP_NAME
    }
}