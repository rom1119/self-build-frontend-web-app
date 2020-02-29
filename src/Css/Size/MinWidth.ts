import CssSimple from "../CssSimple";
import ContentSizeCss from "./ContentSizeCss";

export default class MinWidth extends ContentSizeCss 
{
    public static PROP_NAME = 'min-width'
    public getName(): string {
        return MinWidth.PROP_NAME
    }
}