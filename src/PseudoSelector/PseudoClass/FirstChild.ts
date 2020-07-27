import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class FirstChild extends PseudoClass
{
    public static NAME = 'first-child'
    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return FirstChild.NAME
    }
}