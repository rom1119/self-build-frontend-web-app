
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

export default class CssPropDecisionMaker implements DecisionManager<CssDecisionObject> {

    protected tag: HtmlTag

    constructor(tag: HtmlTag) {
        this.tag = tag
    }

    canManage(arg: CssDecisionObject) {

        var tagName = this.tag.getDomainTagName()
        if (tagName == 'tr' || tagName == 'thead' || tagName == 'tbody' || tagName == 'tfoot') {
            if (arg instanceof WidthObject) {
                return false
            }

            if (arg instanceof HeightObject) {
                return false
            }
        }

        if (tagName == 'tr' || tagName == 'thead' || tagName == 'tbody' ||tagName == 'tfoot') {

            if (arg instanceof PaddingLeftObject) {
                return false
            }

            if (arg instanceof PaddingRightObject) {
                return false
            }
        }

        if (tagName == 'tr' || tagName == 'td' || tagName == 'th' || tagName == 'tr' || tagName == 'thead' || tagName == 'tbody' ||tagName == 'tfoot' ) {
            if (arg instanceof MarginObject) {
                return false
            }

        }

        return true

    }

}
