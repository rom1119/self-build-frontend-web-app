import LayoutMode from '../LayoutMode';
import ModeAction from '../ModeAction';
import MouseDownAction from '../action/MouseDownAction';
import MouseUpAction from '../action/MouseUpAction';
import ElementPositionAction from '../action/ElementPositionAction';
import PseudoSelectorViewAction from '../action/PseudoSelectorViewAction';
export default class EditMode extends LayoutMode 
{
    public static NAME = 'edit-mode-layout-creator'
    protected name = EditMode.NAME


    public canRun(action: ModeAction) {
        switch (action.getName()) {
            case MouseDownAction.NAME :
                return true
            case MouseUpAction.NAME:
                return true
            case ElementPositionAction.NAME:
                return true
            case MouseDownAction.NAME:
                return true
            case MouseUpAction.NAME:
                return true
            case PseudoSelectorViewAction.NAME:
                return false
        }

        throw Error('Not implemented ' + action + ' action')
    }
    public getName() {
        return EditMode.NAME
    }

}