import LayoutMode from '../LayoutMode';
import ModeAction from '../ModeAction';
import MouseDownAction from '../action/MouseDownAction';
import MouseUpAction from '../action/MouseUpAction';
import ElementPositionAction from '../action/ElementPositionAction';
import PseudoSelectorViewAction from '../action/PseudoSelectorViewAction';
export default class ViewMode extends LayoutMode 
{
    public static NAME = 'view-mode-layout-creator'
    protected name = ViewMode.NAME

    public canRun(action: ModeAction) {
        console.error('as')
        switch (action.getName()) {
            case MouseDownAction.NAME :
                return false
            case MouseUpAction.NAME:
                return false
            case ElementPositionAction.NAME:
                return false
            case MouseDownAction.NAME:
                return false
            case MouseUpAction.NAME:
                return false
            case PseudoSelectorViewAction.NAME:
                return true
        }

        throw Error('Not implemented ' + action + ' action')
    }

    public getName() {
        return ViewMode.NAME
    }

}