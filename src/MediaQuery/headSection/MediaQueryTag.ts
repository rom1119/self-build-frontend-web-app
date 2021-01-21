import BaseSelector from "~/src/BaseSelector";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";

export default class MediaQueryTag {


    mediaQuery: MediaQueryCss
    selector: string
    cssList: BasePropertyCss[]


    constructor(mediaQuery: MediaQueryCss, selector: string, cssList: BasePropertyCss[]) {
        this.mediaQuery = mediaQuery;
        this.selector = selector;
        this.cssList = cssList;
    }
}

