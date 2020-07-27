import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class FirstOfType extends PseudoClass
{
    public static NAME = 'first-of-type'
    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return FirstOfType.NAME
    }
}