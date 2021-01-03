import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";
import MarginCss from "~/src/Css/BoxModel/Margin/MarginCss";
import MarginBottomCss from "~/src/Css/BoxModel/Margin/MarginBottomCss";
import MarginObject from "~/src/DecisionManager/decisionObjects/MarginObject";

export default class MarginBottomObject extends MarginObject {
    public static NAME = MarginBottomCss.PROP_NAME

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}
