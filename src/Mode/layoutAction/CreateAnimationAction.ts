import ModeAction from "../ModeAction";
import LayoutCreatorAction from '../LayoutCreatorAction';

export default class CreateAnimationAction implements LayoutCreatorAction
{
    public static NAME = 'create-animation-action-layout-creator'


    public getName() {
        return CreateAnimationAction.NAME

    }
}
