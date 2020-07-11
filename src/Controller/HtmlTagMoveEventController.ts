import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import MoveEventController from '../MoveEventController';
import Move2DDetector from '../MoveDetector/Move2DDetector';
import MouseMoveEventSource from './MouseMoveEventSource';
import MouseMoveTagEventSource from './MouseMoveTagEventSource';
import Right from '../Site/Right';
import RightCss from '../Css/Display/Direction/RightCss';
import BottomCss from '../Css/Display/Direction/BottomCss';
import Left from '../Site/Left';
import LeftCss from '../Css/Display/Direction/LeftCss';
import Pixel from '../Unit/Size/Pixel';
import TopCss from '../Css/Display/Direction/TopCss';
import PositionCss from '../Css/Display/PositionCss';
import Vue from 'vue';
import PaddingModel from '../Layout/Padding/PaddingModel';
import BorderModel from '../Layout/Border/BorderModel';
import MarginModel from '../Layout/Margin/MarginModel';
export default class HtmlTagMoveEventController extends MoveEventController<MouseMoveTagEventSource>
{
    protected currentElement: HtmlTag
    protected mouseDetector: Move2DDetector
    protected mouseDownTimeout = 200
    ctrlKeyDown = false


    constructor(hasCtrlKeyDown)
    {
        super()
        this.mouseDetector = new Move2DDetector()
        Vue.set(this, 'ctrlKeyDown', false)
        this.ctrlKeyDown = hasCtrlKeyDown
    }

    public hasActiveEl(): boolean {
        return this.mouseDown === true && this.ctrlKeyDown === true
    }

    public mouseDownHandler(source: MouseMoveTagEventSource) {
        this.mouseDown = true
        let el = source.target
         // var el = source.target
        if (el instanceof PaddingModel || el instanceof BorderModel || el instanceof MarginModel) {
            
            el = el.getHtmlTag()
        } else if (el instanceof HtmlTag) {
            el = el

        }
        let event = source.event
        
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async () => {
            if (this.mouseDown && el) {
                this.currentElement = el
                // console.log(this.currentElement);
                this.mouseDetector.initMousePosition(event.clientX, event.clientY)
                let computedStyles = window.getComputedStyle(this.currentElement.getHtmlEl())
                var left = parseInt(computedStyles.getPropertyValue('left'))
                var top = parseInt(computedStyles.getPropertyValue('top'))
                
                console.log('=====================');
                console.log(left);
                console.log(top);
                

                if (!left) {
                    left = parseInt(computedStyles.getPropertyValue('margin-left'))
                }
                if (!top) {
                    top = parseInt(computedStyles.getPropertyValue('margin-top'))
                }
                this.mouseDetector.initElPosition(left, top)

                this.currentElement.cssAccessor.removePropWithName(RightCss.PROP_NAME)
                this.currentElement.cssAccessor.removePropWithName(BottomCss.PROP_NAME)
                
                if (!this.currentElement.hasPosition) {
                    this.currentElement.updateCssPropertyWithoutModel(PositionCss.PROP_NAME, PositionCss.NEW_ABSOLUTE())
                }
                // this.currentElement.updateCssPropertyWithoutModel(LeftCss.PROP_NAME, new LeftCss(left, new Pixel()))
                // this.currentElement.updateCssPropertyWithoutModel(TopCss.PROP_NAME, new TopCss(top, new Pixel()))
                // this.mouseDetector.initSize(width, height)
                    // this.currentElement.changeAsActiveSize()

                }

            }, this.mouseDownTimeout)
    }
    
    public mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
        if (!this.currentElement) {
            return
        }        
        // this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

    }
    public mouseMoveHandler(ev: MouseEvent) {
        if (!this.currentElement) {
            return
        }
        this.mouseDetector.x = ev.clientX
        this.mouseDetector.y = ev.clientY
        let newX = this.mouseDetector.computedX
        let newY = this.mouseDetector.computeY
        
        // if (newX > 0 && newY > 0) {
            console.log('======!!!!!!!!!!!!===============');
            console.log(newX);
            console.log(newY);
            
            this.currentElement.initPos(newX, newY)
        // }
    }

}