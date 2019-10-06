export default class MouseDetector {

    private _xStart
    private _yStart

    private _widthStart
    private _heightStart

    private _x
    private _y

    /**
     * initPosition
     */
    public initPosition(x: number, y: number) {
        this._xStart = x
        this._yStart = y
    }


    /**
     * initPosition
     */
    public initSize(width: number, height: number) {
        this._widthStart = width
        this._heightStart = height
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

    get computedWidth()
    {
        var newCalc =  this._x - this._xStart        
        return this._widthStart + newCalc
    }

    get computedHeight()
    {
        var newCalc =  this._y - this._yStart   
             
        return this._heightStart + newCalc
    }

}