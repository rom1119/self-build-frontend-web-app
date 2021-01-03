import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";
import MarginCss from "~/src/Css/BoxModel/Margin/MarginCss";
import MarginRightCss from "~/src/Css/BoxModel/Margin/MarginRightCss";
import MarginObject from "~/src/DecisionManager/decisionObjects/MarginBottomObject";

export default class MarginRightObject extends MarginObject {
    public static NAME = MarginRightCss.PROP_NAME

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}
