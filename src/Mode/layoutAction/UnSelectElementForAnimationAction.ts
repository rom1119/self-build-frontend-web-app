import ModeAction from "../ModeAction";
import HtmlTag from '../../Layout/HtmlTag';
import LayoutCreatorAction from '../LayoutCreatorAction';

export default class UnSelectElementForAnimationAction implements LayoutCreatorAction
{
    public static NAME = 'unselect-element-for-animation-action-layout-creator'

    escapePress: boolean = false

    constructor(keyString: string) {
        this.escapePress = keyString === "Escape"
    }

    public getName() {
        return UnSelectElementForAnimationAction.NAME

    }
}
