import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import ContentSizeCss from "./ContentSizeCss";

export default class Height extends ContentSizeCss 
{
    public static PROP_NAME = 'height'
    public getName(): string {
        return Height.PROP_NAME
    }
}