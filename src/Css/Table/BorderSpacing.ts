import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import CssDoubleValue from "../CssDoubleValue";
import Unit from "~/src/Unit/Unit";

export default class BorderSpacing extends CssSimple implements CssDoubleValue
{
    public injectable = true

    xVal: number = 5
    xValUnit: UnitSize
    yVal: number = 5
    yValUnit: UnitSize

    public static PROP_NAME = 'border-spacing'
    public getName(): string {
        return BorderSpacing.PROP_NAME
    }

    constructor(val: any, unit: UnitSize)
    {
        super(val, unit)
        this.xVal = val
        this.yVal = val

        this.xValUnit = unit
        this.yValUnit = unit
    }
    getSecondValue(): string {
        return this.yVal.toString()
    }
    setSecondValue(val: string) {
        this.yVal = Number(val)
    }
    getSecondUnit(): Unit {
        return this.yValUnit
    }
    setSecondUnit(unit: Unit) {
        this.yValUnit = unit
    }
   
    getValue(): string
    {

        return this.xValUnit.getValue(this.xVal)
    }
    
    get value(): string
    {

        return this.xValUnit.getValue(this.xVal)
    }
    
    getClearValue(): string
    {

        return this.xVal.toString()
    }
    
    setValue(val)
    {
        super.setValue(val)
        this.xVal = val
    }
    
    setUnit(unit)
    {

        this.xValUnit = unit
    }
    
    getUnit()
    {

        return this.xValUnit
    }

}