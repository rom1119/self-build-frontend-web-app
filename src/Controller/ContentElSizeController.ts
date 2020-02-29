import SizeElController from '~/src/SizeElController';
import HtmlTag from '../Layout/HtmlTag';
import Size2DDetector from '../SizeDetector/Size2DDetector';
import BorderSizeCalculator from '../Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '../Calculator/OffsetSize/BorderOffsetSizeCalculator';
import MarginSizeCalculator from '../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../Calculator/OffsetSize/MarginOffsetSizeCalculator';
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
            this.recalculateMargins(this.currentElement)
            this.recalculateBorders(this.currentElement)
            // this.currentElement.recalculateRealComputedProperties()
        }
    }

    private recalculateMargins(htmlTag: HtmlTag)
    {
        let sizeCalc = new MarginSizeCalculator(htmlTag)
        let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)
        
        htmlTag.marginTop.length = sizeCalc.calculateSize(htmlTag.marginTop)
        htmlTag.marginTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginTop)
        htmlTag.marginBottom.length = sizeCalc.calculateSize(htmlTag.marginBottom)
        htmlTag.marginBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginBottom)
        htmlTag.marginLeft.length = sizeCalc.calculateSize(htmlTag.marginLeft)
        htmlTag.marginLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginLeft)
        htmlTag.marginRight.length = sizeCalc.calculateSize(htmlTag.marginRight)
        htmlTag.marginRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginRight)
            
    }

    private recalculateBorders(htmlTag: HtmlTag)
    {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)
        
        htmlTag.borderTop.length = sizeCalc.calculateSize(htmlTag.borderTop)
        htmlTag.borderTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderTop)
        htmlTag.borderBottom.length = sizeCalc.calculateSize(htmlTag.borderBottom)
        htmlTag.borderBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderBottom)
        htmlTag.borderLeft.length = sizeCalc.calculateSize(htmlTag.borderLeft)
        htmlTag.borderLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderLeft)
        htmlTag.borderRight.length = sizeCalc.calculateSize(htmlTag.borderRight)
        htmlTag.borderRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderRight)
            
    }

    

}