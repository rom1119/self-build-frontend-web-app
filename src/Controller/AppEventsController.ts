import AdvisorTagController from './AdvisorTagController';
import LayoutCreatorModeComponent from '../../components/LayoutCreatorModeComponent.vue';
import ActiveElController from '../ActiveElController';
import DefaultActiveElController from './DefaultActiveElController';
import ActivableTagToManage from '../ActivableTagToManage';
import ActivableTagToAnimation from '../ActivableTagToAnimation';
import ActivableTagToPosition from '../ActivableTagToPosition';
import ActiveToController from '../ActiveToController';
import { Height } from '../Css';
import BorderModel from '../Layout/Border/BorderModel';
import HtmlTag from '../Layout/HtmlTag';
import MarginModel from '../Layout/Margin/MarginModel';
import PaddingModel from '../Layout/Padding/PaddingModel';
import TableElement from '../Layout/tag/Table/elements/TableElement';
import KeyDownAction from '../Mode/action/KeyDownAction';
import KeyUpAction from '../Mode/action/KeyUpAction';
import MouseClickAction from '../Mode/action/MouseClickAction';
import MouseDownAction from '../Mode/action/MouseDownAction';
import MouseMoveAction from '../Mode/action/MouseMoveAction';
import MouseOutAction from '../Mode/action/MouseOutAction';
import MouseOverAction from '../Mode/action/MouseOverAction';
import MouseUpAction from '../Mode/action/MouseUpAction';
import DefaultActiveToAnimationController from './DefaultActiveToAnimationController';
import DefaultActiveToManageController from './DefaultActiveToManageController';
import DefaultActiveToPositionController from './DefaultActiveToPositionController';
import _ from 'lodash';
import Vue from 'Vue';
import LayoutMode from '../Mode/LayoutMode';
import AnimationMode from '../Mode/impl/AnimationMode';
import EditMode from '../Mode/impl/EditMode';
import SelectElementForAnimationAction from '../Mode/layoutAction/SelectElementForAnimationAction';
import CreateAnimationAction from '../Mode/layoutAction/CreateAnimationAction';
import BeforeSelectElementForAnimationAction from '../Mode/layoutAction/BeforeSelectElementForAnimationAction';
import UnSelectElementForAnimationAction from '../Mode/layoutAction/UnSelectElementForAnimationAction';
import ActiveToAnimationController from '../ActiveToAnimationController';
import AnimationCreator from '../Animation/AnimationCreator';


export default class AppEventsController
{

    protected advisorController: AdvisorTagController

    activeElController: ActiveElController = new DefaultActiveElController();
    activeToManageController: ActiveToController<ActivableTagToManage> = new DefaultActiveToManageController();
    activeToPositionController: ActiveToController<ActivableTagToPosition> = new DefaultActiveToPositionController();
    activeToAnimationController: ActiveToAnimationController<HtmlTag> = null

    adivisorController: AdvisorTagController
    animationCreator: AnimationCreator
    hasAccualControllerWorks = false;
    currentMouseOverTag: HtmlTag;

    protected _creatorMode: LayoutCreatorModeComponent


    constructor(creatorMode: LayoutCreatorModeComponent, activeToAnimationController: ActiveToAnimationController<HtmlTag>) {
        this._creatorMode = creatorMode
        this.adivisorController = new AdvisorTagController(creatorMode)
        this.activeToAnimationController = activeToAnimationController
    }

    get creatorMode(): LayoutCreatorModeComponent
    {
        return this._creatorMode
    }
    
    set creatorMode(creatorMode: LayoutCreatorModeComponent)
    {
        this._creatorMode = creatorMode
    }

    get currentMode(): LayoutMode {
        // @ts-ignore
        return this.creatorMode.mode
    }

    getCurrentMouseOverTag(): HtmlTag {
        return this.currentMouseOverTag
    }

    getTagFromEventHandler(val): HtmlTag
    {
        if (
            val instanceof PaddingModel ||
            val instanceof BorderModel ||
            val instanceof MarginModel
        ) {
            return val.getHtmlTag()
        } else if (val instanceof TableElement) {
            return val.getOwner()
        } else {
            return val
        }
    }
    onMouseOver(val) {
        if (!this.currentMode.canRun(new MouseOverAction())) {
            return;
        }
        var tag = this.getTagFromEventHandler(val)
        
        this.currentMouseOverTag = tag;
        
        // console.log('over');
        // console.log(val);
        // console.log(val);
        
        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new BeforeSelectElementForAnimationAction(tag))) {
                this.activeToAnimationController.updateReadyToCheckTag(tag);
            } else {
                // console.log('over updateActiveEl');
                this.activeElController.updateActiveEl(val);

            }

        } else if (this.currentMode instanceof EditMode) {
            if (this.adivisorController.hasShiftKey) {
            
                this.activeToPositionController.updateActiveTag(tag);
            } else {
                this.activeElController.updateActiveEl(val);

            }
        }
     
    }
        
    onMouseOut(val) {
        // console.log('out');
        // console.log(val);
        // console.log('out');
        if (!this.currentMode.canRun(new MouseOutAction())) {
            return;
        }
        var tag = this.getTagFromEventHandler(val)

        this.currentMouseOverTag = null;
        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new BeforeSelectElementForAnimationAction(tag))) {
                this.activeToAnimationController.deactiveReadyToCheckTag();
            } else {
                this.activeElController.deactiveEl(val);
            }
        } else if (this.currentMode instanceof EditMode) {
            if (this.adivisorController.hasShiftKey) {
                this.activeToPositionController.deactiveTag();
            } else {
                this.activeElController.deactiveEl(val);

            }
        } 
    }
        
    onAnyElementMouseClick(source) {
        if (!this.currentMode.canRun(new MouseClickAction())) {
        return;
        }
        var val = source.target;
        var tag = this.getTagFromEventHandler(val)

        // console.log('onAnyElementMouseClick');
        // console.log(source.target);
 
        if (this.hasAccualControllerWorks) {
            return
        }

        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new SelectElementForAnimationAction(tag))) {
                this.activeToAnimationController.updateActiveTag(tag);
            }

        
        } else if (this.currentMode instanceof EditMode) {
            this.activeToManageController.updateActiveTag(tag);
        } 
        
    }
    
    protected isLeftButtonMouseClick(evt) {
        evt = evt || window.event;
        if ("buttons" in evt) {
            return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        return button == 1;
    }
        
    public onMouseDown(source) {
        if (!this.isLeftButtonMouseClick(source.event)) {
            return;
        }
        var el = source.target;
        var tag = this.getTagFromEventHandler(el)

        if (!this.currentMode.canRun(new MouseDownAction())) {
            return;
        }
        if (el.getHtmlTag) {
            var a = el.getHtmlTag().getComputedVal(Height.PROP_NAME);
            console.log(a);
        }

        
        let controller = this.getAdviseController("mouseDown", source.target);
        // console.log('down');
        // console.log(source.target);
        // console.log(source);
        // console.log(controller);
        // console.log('down');
        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new CreateAnimationAction())) {
                controller.mouseDownHandler(source);
            }

        
        } else if (this.currentMode instanceof EditMode) {
            controller.mouseDownHandler(source);
        } 
    }

    onMouseUp(e) {
        if (!this.currentMode.canRun(new MouseUpAction())) {
            return;
        }
        let controller = this.getAdviseController("mouseUp");

        if (controller) {
            setTimeout(() => {
                controller.mouseUpHandler(e);
                this.hasAccualControllerWorks = false;
            }, 0);
        }
    }

    onMouseMove(e) {
        if (!this.currentMode.canRun(new MouseMoveAction())) {
            return;
        }

        let controller = this.getAdviseController("mouseover");
        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new CreateAnimationAction())) {
                if (controller) {
                    controller.mouseMoveHandler(e);
                    this.hasAccualControllerWorks = true;
                }
            }
        } else if (this.currentMode instanceof EditMode) {
            if (controller) {
                controller.mouseMoveHandler(e);
                this.hasAccualControllerWorks = true;
            }

        }
    }

    onKeyDown(e) {
        if (!this.currentMode.canRun(new KeyDownAction())) {
        return;
        }
        console.log("e.shiftKey");
        console.log(e.key);
        // console.log(e.shiftKey);

        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new UnSelectElementForAnimationAction(e.key))) {
                this.activeToAnimationController.deactiveTag();
                this.activeElController.deactiveEl(null);
                // this.activeToAnimationController.deactiveReadyToCheckTag();
            } else if (this.currentMode.canRunSystemAction(new CreateAnimationAction())) {
                if (e.shiftKey) {
                    this.adivisorController.hasShiftKey = true;
                    if (this.currentMouseOverTag) {
                        this.activeToPositionController.updateActiveTag(
                            this.currentMouseOverTag
                        );
                    }
                }
            }

        } else if (this.currentMode instanceof EditMode) {
            if (e.shiftKey) {
                this.adivisorController.hasShiftKey = true;
                if (this.currentMouseOverTag) {
                    this.activeToPositionController.updateActiveTag(
                    this.currentMouseOverTag
                    );
                }
            }

        }
        
    }

    onKeyPress(e) {
        if (this.currentMode instanceof AnimationMode) {
            if (this.currentMode.canRunSystemAction(new UnSelectElementForAnimationAction(e.key))) {
                this.activeToAnimationController.deactiveTag();
            }
        }
    }
    onKeyUp(e) {
        if (!this.currentMode.canRun(new KeyUpAction())) {
            return;
        }
        console.log("e.shiftKey");
        console.log(e.shiftKey);
        if (this.adivisorController.hasShiftKey) {
            this.adivisorController.hasShiftKey = false;
            this.activeToPositionController.deactiveTag();
        }
    }

    private getAdviseController(eventName, el?) {
        return this.adivisorController.advise(eventName, el);
    }
}