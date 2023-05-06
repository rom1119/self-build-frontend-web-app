import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";
import SpecialFunctionOwner from "../SpecialFunction/SpecialFunctionOwner";

export default class FilterCss extends CssSimple implements CssPropertyLimitable, SpecialFunctionOwner {
    
    public static PROP_NAME = 'filter'
    public getName(): string {
        return FilterCss.PROP_NAME
    }
    public static URL = 'url'
    public static BLUR = 'blur'
    public static CONTRAST = 'contrast'
    public static DROP_SHADOW = 'drop-shadow'
    public static ZOOM_IN = 'zoom-in'
    public static GRAB = 'grab'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(FilterCss.URL)
        props.push(FilterCss.BLUR)
        props.push(FilterCss.CONTRAST)
        props.push(FilterCss.DROP_SHADOW)
        props.push(FilterCss.ZOOM_IN)
        props.push(FilterCss.GRAB)



        return props
    }
    getAccessableProperty(): any[] {
        return FilterCss.getAccessableProperty()
    }
}