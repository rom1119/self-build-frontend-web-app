import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import CssTripleValue from '../CssTripleValue';
import Unit from "~/src/Unit/Unit";
import Pixel from '../../Unit/Size/Pixel';

export default class TransformOrigin extends  CssTwoAxis implements CssTripleValue
{
    public static PROP_NAME = 'transform-origin'
    protected _zVal: string = ''
    zValUnit: Unit = new Pixel()


    public getName(): string {
        return TransformOrigin.PROP_NAME
    }

    get zVal() {
        return this._zVal
    }
    
    set zVal(arg) {
        this._zVal = arg

    }

    getThirdValue(): string {
        return this.zVal
    }
    setThirdValue(val: string) {
        this.zVal = val
    }
    getThirdUnit(): Unit {
        return this.zValUnit
    }
    setThirdUnit(unit: Unit) {
        this.zValUnit = unit
    }
  


}