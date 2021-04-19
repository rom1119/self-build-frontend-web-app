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


export default class AppEventsController
{
  
    protected advisorController: AdvisorTagController

    activeElController: ActiveElController = new DefaultActiveElController();
    activeToManageController: ActiveToController<ActivableTagToManage> = new DefaultActiveToManageController();
    activeToPositionController: ActiveToController<ActivableTagToPosition> = new DefaultActiveToPositionController();
    activeToAnimationController: ActiveToController<ActivableTagToAnimation> = new DefaultActiveToAnimationController();
  
    adivisorController: AdvisorTagController
    hasAccualControllerWorks = false;
    currentMouseOverTag: HtmlTag;

    protected _creatorMode: LayoutCreatorModeComponent


    constructor(creatorMode: LayoutCreatorModeComponent) {
      this._creatorMode = creatorMode
      this.adivisorController = new AdvisorTagController(creatorMode);
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

    onMouseOver(val) {
        if (!this.currentMode.canRun(new MouseOverAction())) {
          return;
        }
        // console.log('over');
        // console.log(val);
        // console.log(val);
        if (
          val instanceof PaddingModel ||
          val instanceof BorderModel ||
          val instanceof MarginModel
        ) {
          this.currentMouseOverTag = val.getHtmlTag();
        } else if (val instanceof HtmlTag) {
          this.currentMouseOverTag = val;
        } else if (val instanceof TableElement) {
          this.currentMouseOverTag = val;
        }
    
        if (this.adivisorController.hasShiftKey) {
          if (
            val instanceof PaddingModel ||
            val instanceof BorderModel ||
            val instanceof MarginModel
          ) {
            this.activeToPositionController.updateActiveTag(val.getHtmlTag());
          } else if (val instanceof HtmlTag) {
            this.activeToPositionController.updateActiveTag(val);
          }
        } else {
          this.activeElController.updateActiveEl(val);
        }
      }
    
      onMouseOut(val) {
        // console.log('out');
        // console.log(val);
        // console.log('out');
        if (!this.currentMode.canRun(new MouseOutAction())) {
          return;
        }
        this.currentMouseOverTag = null;
        if (this.adivisorController.hasShiftKey) {
          if (
            val instanceof PaddingModel ||
            val instanceof BorderModel ||
            val instanceof MarginModel
          ) {
            this.activeToPositionController.deactiveTag();
          } else if (val instanceof HtmlTag) {
            this.activeToPositionController.deactiveTag();
          }
        } else {
          this.activeElController.deactiveEl(val);
        }
      }
    
      onAnyElementMouseClick(source) {
        if (!this.currentMode.canRun(new MouseClickAction())) {
          return;
        }
        var val = source.target;
        // console.log('onAnyElementMouseClick');
        // console.log(source.target);
        // console.log(source.target.columns);
        // console.log(source.target.rows);
        if (!this.hasAccualControllerWorks) {
          if (
            val instanceof PaddingModel ||
            val instanceof BorderModel ||
            val instanceof MarginModel
          ) {
            this.activeToManageController.updateActiveTag(val.getHtmlTag());
          } else {
            this.activeToManageController.updateActiveTag(val);
          }
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
    
      onMouseDown(source) {
        if (!this.isLeftButtonMouseClick(source.event)) {
          return;
        }
        var el = source.target;
        // if (el instanceof PaddingModel || el instanceof BorderModel || el instanceof MarginModel) {
    
        //     el = el.getHtmlTag()
        // } else if (el instanceof HtmlTag) {
        //     el = el.
    
        // }
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
        controller.mouseDownHandler(source);
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
        if (controller) {
          controller.mouseMoveHandler(e);
          this.hasAccualControllerWorks = true;
        }
      }
    
      onKeyDown(e) {
        if (!this.currentMode.canRun(new KeyDownAction())) {
          return;
        }
        // console.log("e.shiftKey");
        // console.log(e.shiftKey);
        if (e.shiftKey) {
          this.adivisorController.hasShiftKey = true;
          if (this.currentMouseOverTag) {
            this.activeToPositionController.updateActiveTag(
              this.currentMouseOverTag
            );
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