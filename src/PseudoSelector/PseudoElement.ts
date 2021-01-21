import PseudoSelector from "./PseudoSelector";
import HtmlTag from "../Layout/HtmlTag";
import MediaQueryListOwner from "~/src/Css/PropertyAccessor/mediaQuery/MediaQueryListOwner";
import MediaQueryAccessor from "~/src/MediaQuery/MediaQueryAccessor";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";

export default abstract class PseudoElement extends PseudoSelector
{

    constructor(owner: HtmlTag) {
        super(owner)
    }

}
