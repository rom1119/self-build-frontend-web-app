import AxisMoveDetector from '../AxisMoveDetector';
export default class YMoveDetector implements AxisMoveDetector {

    private _yStart
    private _y
    private _elY: number;

    /**
     * initPosition
     */
    public initMousePosition(y: number) {
        this._yStart = y
    }

    /**
     * initPosition
     */
    public initElPosition(y: number) {
        this._elY = y
    }

    set y(newVal: number)
    {
        if (this._y == newVal) {
            return
        }
        this._y = newVal
    }

    get computedY()
    {
        var newCalc =  this._y - this._yStart   
             
        return  newCalc + this._elY
    }

    computedVal(): number {
        return this.computedY
    }

    setAxisPosition(val: number) {
        this.y = val
    }

}