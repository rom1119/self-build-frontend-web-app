import CssSimple from "../CssSimple";

export default class FontColor extends CssSimple
{
    public static PROP_NAME = 'color'
    public getName(): string {
        return FontColor.PROP_NAME
    }
}