import SizeElController from '~/src/SizeElController';
import BorderModel from '../Layout/Border/BorderModel';
import HeightSizeDetector from '../SizeDetector/HeightSizeDetector';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '../Layout/Border/BorderRight';
import WidthSizeDetector from '../SizeDetector/WidthSizeDetector';
import AxisPositionDetector from '../AxisSizeDetector';
import OffsetCalculator from '../Calculator/OffsetCalculator';
import BorderOffsetCalculator from '../Calculator/Offset/BorderOffsetCalculator';
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';
export default class BorderElSizeController extends SizeElController
{
    protected currentElement: BorderModel
    protected mouseDetector: AxisPositionDetector
    protected offsetCalculator: OffsetCalculator<BorderModel>

    
    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }
    private beforeStartMouseMove(ev: MouseEvent)
    {
        if (this.currentElement instanceof BorderLeft || this.currentElement instanceof BorderRight) {
            this.mouseDetector = new WidthSizeDetector()
            this.mouseDetector.initPosition(ev.clientX)
            this.mouseDetector.initSize(this.currentElement.width)
            
        } else {
            this.mouseDetector =  new HeightSizeDetector()
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
        let newVal = this.mouseDetector.computedVal()
        // console.log(this.mouseDetector.computedVal());
        // console.log(this.currentElement);
        if (newVal > 0) {
            this.currentElement.initSize(newVal)
            this.currentElement.updatePixelPropertyForTag()
            this.offsetCalculator = new BorderOffsetCalculator(this.currentElement.getHtmlTag())
            this.currentElement.offset = this.offsetCalculator.calculateOffset(this.currentElement)
            

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