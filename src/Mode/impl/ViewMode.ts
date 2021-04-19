import LayoutMode from '../LayoutMode';
import ModeAction from '../ModeAction';
import MouseDownAction from '../action/MouseDownAction';
import MouseUpAction from '../action/MouseUpAction';
import ElementPositionAction from '../action/ElementPositionAction';
import PseudoSelectorViewAction from '../action/PseudoSelectorViewAction';
import MouseClickAction from '../action/MouseClickAction';
import MouseOverAction from '../action/MouseOverAction';
import MouseOutAction from '../action/MouseOutAction';
import MouseMoveAction from '../action/MouseMoveAction';
import KeyDownAction from '../action/KeyDownAction';
import KeyUpAction from '../action/KeyUpAction';
import FontFaceViewAction from '../action/FontFaceViewAction';
import MediaQueryViewModeAction from '../action/MediaQueryViewModeAction';
import KeyFrameViewModeAction from '../action/KeyFrameViewModeAction';
export default class ViewMode extends LayoutMode 
{
    public static NAME = 'view-mode-layout-creator'
    protected name = ViewMode.NAME

    public canRun(action: ModeAction) {
        // console.error('as')
        switch (action.getName()) {
            case MouseDownAction.NAME :
                return false
            case MouseUpAction.NAME:
                return false
            case ElementPositionAction.NAME:
                return false
            case MouseOverAction.NAME:
                return false
            case MouseOutAction.NAME:
                return false
            case MouseClickAction.NAME:
                return false
            case MouseMoveAction.NAME:
                return false
            case KeyDownAction.NAME:
                return false
            case KeyUpAction.NAME:
                return false
            case PseudoSelectorViewAction.NAME:
                return true
            case MediaQueryViewModeAction.NAME:
                return true
            case KeyFrameViewModeAction.NAME:
                return true
            case FontFaceViewAction.NAME:
                return true
            
        }

        throw Error('Not implemented ' + action.getName() + ' action')
    }

    public getName() {
        return ViewMode.NAME
    }

    public getLabel() {
        return 'Tryb widoku'
    }

}