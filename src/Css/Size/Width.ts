import CssSimple from "../CssSimple";
import ContentSizeCss from "./ContentSizeCss";

export default class Width extends ContentSizeCss 
{
    public static PROP_NAME = 'width'
    public getName(): string {
        return Width.PROP_NAME
    }
}