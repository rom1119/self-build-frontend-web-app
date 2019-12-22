import AxisMoveDetector from '../AxisMoveDetector';
export default class XMoveDetector implements AxisMoveDetector {
    
    private _xStart
    private _x
    private _elX: number;

    /**
     * initPosition
     */
    public initMousePosition(x: number) {
        this._xStart = x
    }

    /**
     * initPosition
     */
    public initElPosition(width: number) {
        this._elX = width
    }

    set x(newVal: number)
    {
        if (this._x == newVal) {
            return
        }
        this._x = newVal
    }

    get computedX()
    {
        // console.log('xStart', this._xStart );
        // console.log('x', this._x );
        // console.log('_widthStart', this._widthStart );
        
        var newCalc = this._x - this._xStart     
        
        return newCalc + this._elX
    }

    computedVal(): number {

        return this.computedX
    }
    
    setAxisPosition(val: number) {
        this.x = val
    }
 
}