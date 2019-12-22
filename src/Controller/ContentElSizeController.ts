import SizeElController from '~/src/SizeElController';
import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
export default class ContentElSizeController extends SizeElController
{
    protected currentElement: HtmlTag
    protected mouseDetector: Size2DDetector

    constructor()
    {
        super()
        this.mouseDetector = new Size2DDetector()

    }

    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }

    public mouseDownHandler(source: any) {
        this.mouseDown = true
        let el: HtmlTag = source.target
        let event = source.event
        console.log(el.toString());
        console.log(el.cssAccessor.all);
        // console.log(el.paddingRightWidth);
        
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    this.currentElement = el
                    this.mouseDetector.initPosition(event.clientX, event.clientY)
                    this.mouseDetector.initSize(el.width, el.height)
                    // this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }
    
    public mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
        if (!this.currentElement) {
            return
        }
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

    }
    public mouseMoveHandler(ev: MouseEvent) {
        if (!this.currentElement) {
            return
        }
        // console.log(e.clientX);
        this.mouseDetector.x = ev.clientX
        this.mouseDetector.y = ev.clientY
        let newValWidth = this.mouseDetector.computedWidth
        let newValHeight = this.mouseDetector.computedHeight

        if (newValWidth > 0 && newValHeight > 0) {

            this.currentElement.initSize(newValWidth, newValHeight)
        }
    }

}