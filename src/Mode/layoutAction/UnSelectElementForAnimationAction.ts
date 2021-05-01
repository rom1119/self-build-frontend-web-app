import ModeAction from "../ModeAction";
import HtmlTag from '../../Layout/HtmlTag';
import LayoutCreatorAction from '../LayoutCreatorAction';

export default class UnSelectElementForAnimationAction implements LayoutCreatorAction
{
    public static NAME = 'unselect-element-for-animation-action-layout-creator'

    escapePress: boolean = false
    buttClicked: boolean = false

    constructor(keyString?: string, buttClicked?: boolean) {
        this.escapePress = keyString === "Escape"
        this.buttClicked = buttClicked
    }

    public getName() {
        return UnSelectElementForAnimationAction.NAME

    }
}
