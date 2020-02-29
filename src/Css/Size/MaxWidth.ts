import CssSimple from "../CssSimple";
import ContentSizeCss from "./ContentSizeCss";

export default class MaxWidth extends ContentSizeCss 
{
    public static PROP_NAME = 'max-width'
    public getName(): string {
        return MaxWidth.PROP_NAME
    }
}