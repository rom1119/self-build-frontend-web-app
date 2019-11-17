import CssSimple from "../CssSimple";

export default class TextColor extends CssSimple
{
    public static PROP_NAME = 'text-align'
    public getName(): string {
        return TextColor.PROP_NAME
    }
}