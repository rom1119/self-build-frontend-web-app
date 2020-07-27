import PseudoClass from "../PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";

export default class Visited extends PseudoClass
{
    public static NAME = 'visited'
    
    constructor(owner: HtmlTag) {
        super(owner)
    }
    
    public getName(): string {
        return Visited.NAME
    }
}