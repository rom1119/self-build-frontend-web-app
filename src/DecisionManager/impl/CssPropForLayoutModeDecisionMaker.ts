
import UnableCreateCssPropertyFromName from '../../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Css/";
import BasePropertyCss from '../../Css/BasePropertyCss';
import DecisionManager from '../DecisionManager';
import HtmlTag from '../../Layout/HtmlTag';
import CssDecisionObject from '../decisionObjects/CssDecisionObject';
import MarginObject from '../decisionObjects/MarginObject';
import WidthObject from '../decisionObjects/WidthObject';
import HeightObject from '../decisionObjects/HeightObject';
import PaddingLeftObject from "~/src/DecisionManager/decisionObjects/PaddingLeftObject";
import PaddingRightObject from "~/src/DecisionManager/decisionObjects/PaddingRightObject";
import LayoutMode from '../../Mode/LayoutMode';
import EditMode from '../../Mode/impl/EditMode';
import TransitionObject from '../decisionObjects/TransitionObject';
import AnimationObject from '../decisionObjects/AnimationObject';

export default class CssPropForLayoutModeDecisionMaker implements DecisionManager<CssDecisionObject> {

    protected mode: LayoutMode

    constructor(mode: LayoutMode) {
        this.mode = mode
    }

    canManage(arg: CssDecisionObject) {

        if (this.mode instanceof EditMode) {
            if (arg instanceof TransitionObject) {
                return false
            }

            if (arg instanceof AnimationObject) {
                return false
            }
        }

        return true

    }

}
