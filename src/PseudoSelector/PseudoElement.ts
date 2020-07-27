import PseudoSelector from "./PseudoSelector";
import HtmlTag from "../Layout/HtmlTag";

export default abstract class PseudoElement extends PseudoSelector
{
    constructor(owner: HtmlTag) {
        super(owner)
    }
}