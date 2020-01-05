import SizeElController from '~/src/SizeElController';
import BorderModel from '../Layout/Border/BorderModel';
import HeightSizeDetector from '../SizeDetector/HeightSizeDetector';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '../Layout/Border/BorderRight';
import WidthSizeDetector from '../SizeDetector/WidthSizeDetector';
import AxisPositionDetector from '../AxisSizeDetector';
import PaddingLeft from '../Layout/Padding/PaddingLeft';
import PaddingRight from '../Layout/Padding/PaddingRight';
import PaddingModel from '../Layout/Padding/PaddingModel';
import Pixel from '../Unit/Size/Pixel';
export default class PaddingElSizeController extends SizeElController
{
    protected currentElement: PaddingModel
    protected mouseDetector: AxisPositionDetector
    
    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }
    private beforeStartMouseMove(ev: MouseEvent)
    {
        // console.log('aaa');
        // console.log(this.currentElement);
        // console.log('aaa');
        if (this.currentElement instanceof PaddingLeft || this.currentElement instanceof PaddingRight) {
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
        // console.log(this.mouseDetector.computedVal());
        let newVal = this.mouseDetector.computedVal()
        if (newVal > 0) {
            
            this.currentElement.initSize(newVal)
            this.currentElement.updatePixelPropertyForTag()

        }
    }

    private getMouseAxisPosition(ev: MouseEvent): number {
        if (this.currentElement instanceof PaddingLeft || this.currentElement instanceof PaddingRight) {
            return ev.clientX
        } else {
            return ev.clientY
            
        }
    }
    
}