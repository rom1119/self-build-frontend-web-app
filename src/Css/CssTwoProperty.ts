import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssDoubleValue from './CssDoubleValue';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';

export default abstract class CssTwoProperty extends BasePropertyCss implements CssDoubleValue
{
    protected  secondVal :string = ''
    protected  secondUnit :Unit = new Pixel()
    protected  _hasTwoValues :boolean = false



    constructor(val: any, unit: Unit) {
        super(unit)
        this.values.push(val)
    }

    get value(): string 
    {
        if (this.blankValue == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (!this.unit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }
        if (this._hasTwoValues) {
            return this.unit.getValue(this.blankValue) + ' ' + this.secondUnit.getValue(this.secondVal)

        }
        return this.unit.getValue(this.blankValue)
    }
    getValue(): string
    {
        if (this.blankValue == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (!this.unit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }
        if (this._hasTwoValues) {
            return this.unit.getValue(this.blankValue) + ' ' + this.secondUnit.getValue(this.secondVal)

        }
        return this.unit.getValue(this.blankValue)
    }

    getSecondValue(): string {
        return this.secondVal
    }
    setSecondValue(val: string) {
        this.secondVal = val
        this._hasTwoValues = true
    }
    getSecondUnit(): Unit {
        return this.secondUnit
    }
    setSecondUnit(unit: Unit) {
        this.secondUnit = unit
    }
  
}