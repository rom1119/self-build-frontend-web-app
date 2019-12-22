import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import MoveEventController from '../MoveEventController';
import Move2DDetector from '../MoveDetector/Move2DDetector';
export default class DefaultMoveEventController extends MoveEventController
{
    protected currentElement: HTMLElement
    protected mouseDetector: Move2DDetector

    constructor()
    {
        super()
        this.mouseDetector = new Move2DDetector()

    }

    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }

    public mouseDownHandler(event: MouseEvent) {
        this.mouseDown = true
        let el = event.target
        // let event = event
        // console.log(el.toString());
        // console.log(el.cssAccessor.all);
        console.log(event);
        
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async () => {
            if (this.mouseDown && el) {
                console.log(event.target.parentElement.parentElement);
                console.log('clientX', event.clientX);
                console.log('clientY', event.clientY);
                this.currentElement = (<HTMLElement>el).parentElement.parentElement
                console.log(this.currentElement);
                this.mouseDetector.initMousePosition(event.clientX, event.clientY)
                let computedStyles = window.getComputedStyle(this.currentElement)
                var left = parseInt(computedStyles.getPropertyValue('left'))
                var top = parseInt(computedStyles.getPropertyValue('top'))
                
                console.log('left', left);
                console.log('top', top);
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

            }, 400)
    }
    
    public mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
        if (!this.currentElement) {
            return
        }
        console.log('UP');
        
        // this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

    }
    public mouseMoveHandler(ev: MouseEvent) {
        if (!this.currentElement) {
            return
        }
        console.log(ev.clientX);
        console.log(this.currentElement)
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