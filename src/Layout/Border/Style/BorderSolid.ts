import BorderStyle from "./BorderStyle";

export default class BorderSolid extends BorderStyle
{
    get value(): string
    {
        return 'solid'
    }
}