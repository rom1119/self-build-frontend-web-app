import HtmlNodeRemover from "~/src/Remover/HtmlNodeRemover";
import HtmlTag from "~/src/Layout/HtmlTag";
import HtmlNode from "~/src/Layout/HtmlNode";

export default interface RemoverAdvisor  {

    advise(tag: HtmlNode): HtmlNodeRemover
}
