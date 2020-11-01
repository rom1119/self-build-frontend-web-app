import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";

export default class DefaultCSSObject extends CssDecisionObject {
    public static NAME = 'DE'

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}