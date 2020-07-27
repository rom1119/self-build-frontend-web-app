import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class Active extends PseudoClass
{
    public static NAME = 'active'
    protected _name = Active.NAME
    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return Active.NAME
    }
}