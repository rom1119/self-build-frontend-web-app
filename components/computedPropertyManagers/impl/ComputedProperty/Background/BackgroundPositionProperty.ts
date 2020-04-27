import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage } from "~/src/Css";

export default class BackgroundImageProperty implements ComputedPropertyManager {

    protected value: HtmlTag
    DEFAULT_BORDER = 0
    // property: BackgroundImage = new BackgroundImage(this.DEFAULT_BORDER, this.DEFAULT_BORDER_UNIT)


    init() {
        throw new Error("Method not implemented.");
    }
    setFetcher(realFetcher: any) {
        throw new Error("Method not implemented.");
    }
    setHtmlEl(val: HtmlTag) {
        throw new Error("Method not implemented.");
    }
    deactiveGlobalPropCss(newProp: BasePropertyCss) {
        throw new Error("Method not implemented.");
    }
    deactivePropCss(newProp: BasePropertyCss) {
        this
    }
    activePropCss(newProp: BasePropertyCss) {
        throw new Error("Method not implemented.");
    }
    updateCssProp(newProp: BasePropertyCss) {
        throw new Error("Method not implemented.");
    }

}