import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";

export default class HeightObject extends CssDecisionObject {
    public static NAME = 'height'

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}