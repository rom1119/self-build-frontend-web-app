import WidthSizeDetector from "./WidthSizeDetector"
import HeightSizeDetector from "./HeightSizeDetector"

export default class Size2DDetector {
    
    private xPositionDetector: WidthSizeDetector
    private yPositionDetector: HeightSizeDetector

    constructor()
    {
        this.xPositionDetector = new WidthSizeDetector()
        this.yPositionDetector = new HeightSizeDetector()
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
    
    get x()
    {
        return this.xPositionDetector.x
    }

    set y(newVal: number)
    {
        this.yPositionDetector.y = newVal
    }
    
    get y()
    {
        return this.yPositionDetector.y
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