import BorderStyle from "./BorderStyle";

export default class BorderDotted extends BorderStyle
{
    get value(): string
    {
        return 'dotted'
    }
}