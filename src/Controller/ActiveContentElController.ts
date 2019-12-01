import ActiveElController from '~/src/ActiveElController';
import HtmlTag from '../Layout/HtmlTag';
import TwoDimensionalPositionDetector from '../PositionDetector/TwoDimensionalPositionDetector';
export default class ActiveContentElController extends ActiveElController
{
    protected currentElement: HtmlTag
    protected mouseDetector: TwoDimensionalPositionDetector

    constructor()
    {
        super()
        this.mouseDetector = new TwoDimensionalPositionDetector()

    }

    public hasActiveEl(): boolean {
        return this.currentElement != null
    }

    public mouseDownHandler(source: any) {
        this.mouseDown = true
        let el = source.target
        let event = source.event
        console.log(el.toString());
        
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    this.currentElement = el
                    this.mouseDetector.initPosition(event.clientX, event.clientY)
                    this.mouseDetector.initSize(el.width, el.height)
                    this.currentElement.changeAsActiveSize()

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
        this.currentElement.initSize(this.mouseDetector.computedWidth, this.mouseDetector.computedHeight)
    }

}