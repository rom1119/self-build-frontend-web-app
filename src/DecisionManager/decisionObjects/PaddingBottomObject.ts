import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";
import PaddingTopCss from "~/src/Css/BoxModel/Padding/PaddingTopCss";
import PaddingRightCss from "~/src/Css/BoxModel/Padding/PaddingRightCss";
import PaddingBottomCss from "~/src/Css/BoxModel/Padding/PaddingBottomCss";

export default class PaddingBottomObject extends CssDecisionObject {
    public static NAME = PaddingBottomCss.PROP_NAME

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}
