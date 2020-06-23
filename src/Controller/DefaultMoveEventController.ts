import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import MoveEventController from '../MoveEventController';
import Move2DDetector from '../MoveDetector/Move2DDetector';
import MouseMoveEventSource from './MouseMoveEventSource';
export default class DefaultMoveEventController extends MoveEventController<MouseMoveEventSource>
{
    protected currentElement: HTMLElement
    protected mouseDetector: Move2DDetector
    protected mouseDownTimeout = 200

    constructor()
    {
        super()
        this.mouseDetector = new Move2DDetector()
    }

    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }

    public mouseDownHandler(source: MouseMoveEventSource) {
        this.mouseDown = true
        let el = source.target
        let event = source.event
        // console.log(el.toString());
        
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async () => {
            if (this.mouseDown && el) {
                this.currentElement = el
                // console.log(this.currentElement);
                this.mouseDetector.initMousePosition(event.clientX, event.clientY)
                let computedStyles = window.getComputedStyle(this.currentElement)
                var left = parseInt(computedStyles.getPropertyValue('left'))
                var top = parseInt(computedStyles.getPropertyValue('top'))

                if (!left) {
                    left = parseInt(computedStyles.getPropertyValue('margin-left'))
                }
                if (!top) {
                    top = parseInt(computedStyles.getPropertyValue('margin-top'))
                }
                this.mouseDetector.initElPosition(left, top)
                
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
            this.currentElement.style.right = 'unset'
            this.currentElement.style.left = newX + 'px'
            this.currentElement.style.top = newY + 'px'
        // }
    }

}