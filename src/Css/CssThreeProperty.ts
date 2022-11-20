import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';
import CssWithThreeValues from './MultiValuesCss/CssWithThreeValues';
import CssTwoProperty from "./CssTwoProperty";

export default abstract class CssThreeProperty extends CssTwoProperty implements CssWithThreeValues {
    protected fithVal: string = ''
    protected fithUnit: Unit = new Pixel()
    protected _hasThreeValues: boolean = false

    get value(): string {
        var parentVal = super.value
        if (this.fithVal == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value`)
        }
        if (!this.fithUnit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit`)
        }
        return parentVal + ' ' + this.fithUnit.getValue(this.fithVal)

    }
    getValue(): string {
        var parentVal = super.value
        if (this.fithVal == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value`)
        }
        if (!this.fithUnit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit`)
        }
        return parentVal + ' ' + this.fithUnit.getValue(this.fithVal)
    }

    getThirdValue(): string {
        return this.fithVal
    }
    setThirdValue(val: string) {
        this.fithVal = val
        this._hasThreeValues = true
    }
    getThirdUnit(): Unit {
        return this.fithUnit
    }
    setThirdUnit(unit: Unit) {
        this.fithUnit = unit
    }

}