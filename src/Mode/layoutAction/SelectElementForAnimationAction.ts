import ModeAction from "../ModeAction";
import HtmlTag from '../../Layout/HtmlTag';
import LayoutCreatorAction from '../LayoutCreatorAction';

export default class SelectElementForAnimationAction implements LayoutCreatorAction
{
    public static NAME = 'select-element-for-animation-action-layout-creator'

    el: HtmlTag = null

    constructor(el: HtmlTag) {
        this.el = el
    }

    public getName() {
        return SelectElementForAnimationAction.NAME

    }
}
