import LayoutMode from '../LayoutMode';
import ModeAction from '../ModeAction';
import MouseDownAction from '../action/MouseDownAction';
import MouseUpAction from '../action/MouseUpAction';
import ElementPositionAction from '../action/ElementPositionAction';
import PseudoSelectorViewAction from '../action/PseudoSelectorViewAction';
import MouseOverAction from '../action/MouseOverAction';
import MouseOutAction from '../action/MouseOutAction';
import MouseClickAction from '../action/MouseClickAction';
import MouseMoveAction from '../action/MouseMoveAction';
import KeyDownAction from '../action/KeyDownAction';
import KeyUpAction from '../action/KeyUpAction';
import FontFaceViewAction from '../action/FontFaceViewAction';
import MediaQueryViewModeAction from '../action/MediaQueryViewModeAction';
import KeyFrameViewModeAction from '../action/KeyFrameViewModeAction';
import LayoutCreatorAction from '../LayoutCreatorAction';
export default class EditMode extends LayoutMode 
{
    public isEditMode = true
    public static NAME = 'edit-mode-layout-creator'
    protected name = EditMode.NAME

    public disable() {
    }
    public enable() {
    }
    public canRunSystemAction(action: LayoutCreatorAction) {
       
        return false
    }

    public canRun(action: ModeAction) {
        switch (action.getName()) {
            case MouseDownAction.NAME :
                return true
            case MouseUpAction.NAME:
                return true
            case ElementPositionAction.NAME:
                return true
            case MouseOverAction.NAME:
                return true
            case MouseOutAction.NAME:
                return true
            case PseudoSelectorViewAction.NAME:
                return false
            case MediaQueryViewModeAction.NAME:
                return false
            case KeyFrameViewModeAction.NAME:
                return false
            case FontFaceViewAction.NAME:
                return true
            case MouseClickAction.NAME:
                return true
            case MouseMoveAction.NAME:
                return true
            case KeyDownAction.NAME:
                return true
            case KeyUpAction.NAME:
                return true
        }

        throw Error('Not implemented ' + action + ' action')
    }
    public getName() {
        return EditMode.NAME
    }

    public getLabel() {
        return 'Tryb edycji'
    }

}