import ModeAction from "../ModeAction";
import HtmlTag from '../../Layout/HtmlTag';
import LayoutCreatorAction from '../LayoutCreatorAction';

export default class BeforeSelectElementForAnimationAction implements LayoutCreatorAction
{
    public static NAME = 'before-select-element-for-animation-action-layout-creator'

    el: HtmlTag = null

    constructor(el: HtmlTag) {
        this.el = el
    }

    public getName() {
        return BeforeSelectElementForAnimationAction.NAME

    }
}
