import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";
import PaddingTopCss from "~/src/Css/BoxModel/Padding/PaddingTopCss";
import PaddingRightCss from "~/src/Css/BoxModel/Padding/PaddingRightCss";

export default class PaddingRightObject extends CssDecisionObject {
    public static NAME = PaddingRightCss.PROP_NAME

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}
