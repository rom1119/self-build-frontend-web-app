export default class MouseDetector {

    private _xStart
    private _yStart

    private _x
    private _y

    /**
     * initPosition
     */
    public initPosition(x: number, y: number) {
        this._xStart = x
        this._yStart = y
    }

    set x(newVal: number)
    {
        if (this._x == newVal) {
            return
        }
        this._x = newVal
    }

    set y(newVal: number)
    {
        if (this._y == newVal) {
            return
        }
        this._y = newVal
    }

    get XLengthMove()
    {
        return Math.abs(this._xStart - this._x)
    }

    get YLengthMove()
    {
        return Math.abs(this._yStart - this._y)
    }

}