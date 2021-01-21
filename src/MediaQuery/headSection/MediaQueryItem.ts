import BaseSelector from "~/src/BaseSelector";
import HtmlTag from "~/src/Layout/HtmlTag";
import MediaQueryTag from "~/src/MediaQuery/headSection/MediaQueryTag";
import MediaQueryCss from "~/src/MediaQuery/MediaQueryCss";

export default class MediaQueryItem {


    mediaQuery: MediaQueryCss
    tags: MediaQueryTag[]


    constructor(mediaQuery: MediaQueryCss) {
        this.mediaQuery = mediaQuery;
        this.tags = [];
    }
}

