import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class Focus extends PseudoClass
{
    public static NAME = 'focus'
    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return Focus.NAME
    }
}