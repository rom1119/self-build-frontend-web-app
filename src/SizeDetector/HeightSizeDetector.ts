import AxisSizeDetector from '../AxisSizeDetector';
export default class HeightSizeDetector implements AxisSizeDetector {

    private _yStart

    private _heightStart

    private _y

    /**
     * initPosition
     */
    public initPosition(y: number) {
        this._yStart = y
    }


    /**
     * initPosition
     */
    public initSize(height: number) {
        this._heightStart = height
    }



    set y(newVal: number)
    {
        if (this._y == newVal) {
            return
        }
        this._y = newVal
    }

    get computedHeight()
    {
        var newCalc =  this._y - this._yStart   
             
        return this._heightStart + newCalc
    }

    computedVal(): number {
        return this.computedHeight
    }

    setAxisPosition(val: number) {
        this.y = val
    }

}