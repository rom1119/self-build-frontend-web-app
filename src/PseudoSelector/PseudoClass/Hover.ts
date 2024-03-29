import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class Hover extends PseudoClass
{
    public static NAME = 'hover'
    protected _name = Hover.NAME

    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return Hover.NAME
    }
    
}