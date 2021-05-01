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
import CreateAnimationAction from '../layoutAction/CreateAnimationAction';
import SelectElementForAnimationAction from '../layoutAction/SelectElementForAnimationAction';
import LayoutCreatorAction from '../LayoutCreatorAction';
import BeforeSelectElementForAnimationAction from '../layoutAction/BeforeSelectElementForAnimationAction';
import UnSelectElementForAnimationAction from '../layoutAction/UnSelectElementForAnimationAction';
export default class AnimationMode extends LayoutMode 
{
    public isAnimationEditMode = true

    selectedHtmlEl = null
    public static NAME = 'animation-mode-layout-creator'
    protected name = AnimationMode.NAME


    public canRunSystemAction(action: LayoutCreatorAction) {
        if (!this.selectedHtmlEl) {
            if (action instanceof SelectElementForAnimationAction) {
                this.selectedHtmlEl = action.el
                return true
            }
            
            if (action instanceof BeforeSelectElementForAnimationAction) {
                return true
            }

            return false
        } else {
            if (action instanceof CreateAnimationAction) {
                return true
            }

            if (action instanceof UnSelectElementForAnimationAction) {
                if (action.escapePress) {
                    this.selectedHtmlEl = null
                    return true
                }
            }

            return false
        }
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
        return AnimationMode.NAME
    }

    public getLabel() {
        return 'Tryb animacji'
    }

}