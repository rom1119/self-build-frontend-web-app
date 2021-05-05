import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';
import CssDecisionObject from "./CssDecisionObject";
import TransitionCss from '../../Css/Animation/TransitionCss';
import AnimationCss from '../../Css/Animation/AnimationCss';

export default class AnimationObject extends CssDecisionObject {
    public static NAME = AnimationCss.PROP_NAME

    // equals(arg: DecisionObject) {

    //     if (!(arg instanceof BasePropertyCss)) {
    //         return false
    //     }
    //     return (<BasePropertyCss>arg).getName().toLowerCase().indexOf(MarginObject.NAME) > -1
    // }

}