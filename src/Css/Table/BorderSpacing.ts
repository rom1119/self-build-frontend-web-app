import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';

export default class BorderSpacing extends CssSimple 
{
    public injectable = true

    xVal: number
    xValUnit: UnitSize
    yVal: number
    yValUnit: UnitSize

    public static PROP_NAME = 'border-spacing'
    public getName(): string {
        return BorderSpacing.PROP_NAME
    }
   
    getValue(): string
    {
        
        if (!this.unit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }

        if (this.yVal) {
            return this.unit.getValue(this.values[0])

        }
        return this.unit.getValue(this.values[0])
    }

}