import ActiveElController from '~/src/ActiveElController';
import BorderModel from '../Layout/Border/BorderModel';
import YPositionDetector from '../PositionDetector/YPositionDetector';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '../Layout/Border/BorderRight';
import XPositionDetector from '../PositionDetector/XPositionDetector';
import AxisPositionDetector from '../AxisPositionDetector';
export default class ActiveBorderElController extends ActiveElController
{
    protected currentElement: BorderModel
    protected mouseDetector: AxisPositionDetector
    
    public hasActiveEl(): boolean {
        return this.currentElement != null
    }
    private beforeStartMouseMove(ev: MouseEvent)
    {
        if (this.currentElement instanceof BorderLeft || this.currentElement instanceof BorderRight) {
            this.mouseDetector = new XPositionDetector()
            this.mouseDetector.initPosition(ev.clientX)
            this.mouseDetector.initSize(this.currentElement.width)
            
        } else {
            this.mouseDetector =  new YPositionDetector()
            this.mouseDetector.initPosition(ev.clientY)
            this.mouseDetector.initSize(this.currentElement.width)
            
        }
    }

    public mouseDownHandler(source: any) {
        this.mouseDown = true
        let el = source.target
        let event: MouseEvent = source.event
        console.log(el.toString());
        
        // console.log(el.innerText);
        
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    this.currentElement = el
                    // let compStyles = window.getComputedStyle(el.htmlEl);
                    // var comp = compStyles.getPropertyValue('width')
                    // console.log('aa');
                    
                    this.beforeStartMouseMove(event)
                    this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }
    
    public mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
        if (this.currentElement == null) {
            return
        }
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null
    }
    public mouseMoveHandler(ev: MouseEvent) {
        if (this.currentElement == null) {
            return
        }
        // console.log(e.clientX);
        this.mouseDetector.setAxisPosition(this.getMouseAxisPosition(ev)) 
        // this.getMouseDetector().y = e.clientY
        // console.log(this.mouseDetector.computedVal());
        let newVal = this.mouseDetector.computedVal()
        if (newVal > 0) {
            this.currentElement.initSize(newVal)

        }
    }

    private getMouseAxisPosition(ev: MouseEvent): number {
        if (this.currentElement instanceof BorderLeft || this.currentElement instanceof BorderRight) {
            return ev.clientX
        } else {
            return ev.clientY
            
        }
    }
    
}