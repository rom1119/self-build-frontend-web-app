import BorderStyle from "./BorderStyle";

export default class BorderNone extends BorderStyle
{
    get value(): string
    {
        return 'none'
    }
}