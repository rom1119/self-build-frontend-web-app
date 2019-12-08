import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";

export default class BackgroundImage extends CssSimple 
{
    public static PROP_NAME = 'background-image'
    public getName(): string {
        return BackgroundImage.PROP_NAME
    }
}