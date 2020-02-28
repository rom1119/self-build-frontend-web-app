import HtmlTag from "../Layout/HtmlTag";
import StyleCss from "./StyleCss";

export default class StyleCssListCreator
{

    createFrom(tag: HtmlTag): StyleCss[]
    {
        let list = []
        for (const el of tag.cssAccessor.all) {
            let css = new StyleCss(el.getName(), el.getClearValue(), el.getUnit().name)
            list.push(css)
            
        }

        return list
    }


}