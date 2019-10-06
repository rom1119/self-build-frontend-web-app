import BorderStyle from "./BorderStyle";

export default class BorderDashed extends BorderStyle
{
    get value(): string
    {
        return 'dashed'
    }
}