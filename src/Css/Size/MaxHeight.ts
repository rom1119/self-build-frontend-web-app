import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import ContentSizeCss from "./ContentSizeCss";

export default class MaxHeight extends ContentSizeCss 
{
    public static PROP_NAME = 'max-height'
    public getName(): string {
        return MaxHeight.PROP_NAME
    }
}