import XPositionDetector from "./XPositionDetector"
import YPositionDetector from "./YPositionDetector"

export default class TwoDimensionalPositionDetector {
    
    private xPositionDetector: XPositionDetector
    private yPositionDetector: YPositionDetector

    constructor()
    {
        this.xPositionDetector = new XPositionDetector()
        this.yPositionDetector = new YPositionDetector()
    }

    /**
     * initPosition
     */
    public initPosition(x: number, y: number) {
        this.xPositionDetector.initPosition(x)
        this.yPositionDetector.initPosition(y)
    }

    /**
     * initPosition
     */
    public initSize(width: number, height: number) {
        this.xPositionDetector.initSize(width)
        this.yPositionDetector.initSize(height)
    }

    set x(newVal: number)
    {
        this.xPositionDetector.x = newVal
    }

    set y(newVal: number)
    {
        this.yPositionDetector.y = newVal
    }

    get computedWidth()
    {
        return this.xPositionDetector.computedWidth
    }

    get computedHeight()
    {             
        return this.yPositionDetector.computedHeight
    }
}