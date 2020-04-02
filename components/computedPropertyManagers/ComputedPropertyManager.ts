import Unit from "~/src/Unit/Unit";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import FetcherRealCssProp from "~/src/FetcherRealCssProp";
import HtmlTag from "~/src/Layout/HtmlTag";

export default interface ComputedPropertyManager {

    init()
    setFetcher(realFetcher)
    setHtmlEl(val: HtmlTag)
    deactiveGlobalPropCss(newProp: BasePropertyCss)
    deactivePropCss(newProp: BasePropertyCss)
    activePropCss(newProp: BasePropertyCss)
    updateCssProp(newProp: BasePropertyCss)
}