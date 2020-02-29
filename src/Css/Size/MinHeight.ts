import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import ContentSizeCss from "./ContentSizeCss";

export default class MinHeight extends ContentSizeCss 
{
    public static PROP_NAME = 'min-height'
    public getName(): string {
        return MinHeight.PROP_NAME
    }
}