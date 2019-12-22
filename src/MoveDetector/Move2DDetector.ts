import XMoveDetector from "./XMoveDetector"
import YMoveDetector from "./YMoveDetector"


export default class Move2DDetector {
    
    private xPositionDetector: XMoveDetector
    private yPositionDetector: YMoveDetector

    constructor()
    {
        this.xPositionDetector = new XMoveDetector()
        this.yPositionDetector = new YMoveDetector()
    }

    /**
     * initPosition
     */
    public initMousePosition(x: number, y: number) {
        this.xPositionDetector.initMousePosition(x)
        this.yPositionDetector.initMousePosition(y)
    }

    /**
     * initPosition
     */
    public initElPosition(width: number, height: number) {
        this.xPositionDetector.initElPosition(width)
        this.yPositionDetector.initElPosition(height)
    }

    set x(newVal: number)
    {
        this.xPositionDetector.x = newVal
    }

    set y(newVal: number)
    {
        this.yPositionDetector.y = newVal
    }

    get computedX()
    {
        return this.xPositionDetector.computedX
    }

    get computeY()
    {             
        return this.yPositionDetector.computedY
    }

  
}