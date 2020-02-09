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
import OffsetCalculator from '../Calculator/OffsetCalculator';
import PaddingOffsetCalculator from '../Calculator/Offset/PaddingOffsetCalculator';
import HtmlTag from '../Layout/HtmlTag';
import MarginSizeCalculator from '../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import BorderSizeCalculator from '../Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '../Calculator/OffsetSize/BorderOffsetSizeCalculator';
export default class PaddingElSizeController extends SizeElController
{
    protected currentElement: PaddingModel
    protected mouseDetector: AxisPositionDetector
    protected offsetCalculator: OffsetCalculator<PaddingModel>

    
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
            this.offsetCalculator = new PaddingOffsetCalculator(this.currentElement.getHtmlTag())
            this.currentElement.offset = this.offsetCalculator.calculateOffset(this.currentElement)
            this.recalculateMargins(this.currentElement, this.currentElement.getHtmlTag())
            this.recalculateBorders(this.currentElement, this.currentElement.getHtmlTag())
            // this.currentElement.getHtmlTag().recalculateRealComputedProperties()
        }
    }

    private recalculateMargins(currentElement, htmlTag: HtmlTag)
    {
        let sizeCalc = new MarginSizeCalculator(htmlTag)
        let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)
        if (currentElement instanceof PaddingLeft || currentElement instanceof PaddingRight) {
            htmlTag.marginTop.length = sizeCalc.calculateSize(htmlTag.marginTop)
            htmlTag.marginTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginTop)
            htmlTag.marginBottom.length = sizeCalc.calculateSize(htmlTag.marginBottom)
            htmlTag.marginBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginBottom)
        } else {
            htmlTag.marginLeft.length = sizeCalc.calculateSize(htmlTag.marginLeft)
            htmlTag.marginLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginLeft)
            htmlTag.marginRight.length = sizeCalc.calculateSize(htmlTag.marginRight)
            htmlTag.marginRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginRight)
            
        }
    }

    private recalculateBorders(currentElement, htmlTag: HtmlTag)
    {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)
        if (currentElement instanceof PaddingLeft || currentElement instanceof PaddingRight) {
            htmlTag.borderTop.length = sizeCalc.calculateSize(htmlTag.borderTop)
            htmlTag.borderTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderTop)
            htmlTag.borderBottom.length = sizeCalc.calculateSize(htmlTag.borderBottom)
            htmlTag.borderBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderBottom)
        } else {
            htmlTag.borderLeft.length = sizeCalc.calculateSize(htmlTag.borderLeft)
            htmlTag.borderLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderLeft)
            htmlTag.borderRight.length = sizeCalc.calculateSize(htmlTag.borderRight)
            htmlTag.borderRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderRight)
            
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