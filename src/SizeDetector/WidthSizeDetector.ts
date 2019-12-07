import AxisSizeDetector from '../AxisSizeDetector';
export default class WidthSizeDetector implements AxisSizeDetector {
    
    private _xStart

    private _widthStart

    private _x

    /**
     * initPosition
     */
    public initPosition(x: number) {
        this._xStart = x
    }

    /**
     * initPosition
     */
    public initSize(width: number) {
        this._widthStart = width
    }

    set x(newVal: number)
    {
        if (this._x == newVal) {
            return
        }
        this._x = newVal
    }

    get computedWidth()
    {
        // console.log('xStart', this._xStart );
        // console.log('x', this._x );
        // console.log('_widthStart', this._widthStart );
        
        var newCalc = this._x - this._xStart     
        
        return this._widthStart + newCalc
    }

    computedVal(): number {

        return this.computedWidth
    }
    
    setAxisPosition(val: number) {
        this.x = val
    }
 
}