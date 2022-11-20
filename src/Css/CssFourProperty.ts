import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';
import CssWithThreeValues from './MultiValuesCss/CssWithThreeValues';
import CssTwoProperty from "./CssTwoProperty";
import CssThreeProperty from "./CssThreeProperty";
import CssWithFourValues from './MultiValuesCss/CssWithFourValues';

export default abstract class CssFourProperty extends CssThreeProperty implements CssWithFourValues {
    protected fithVal: string = ''
    protected fithUnit: Unit = new Pixel()
    protected _hasFourValues: boolean = false

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

    getFourthValue(): string {
        return this.fithVal
    }
    setFourthValue(val: string) {
        this.fithVal = val
        this._hasFourValues = true
    }
    getFourthUnit(): Unit {
        return this.fithUnit
    }
    setFourthUnit(unit: Unit) {
        this.fithUnit = unit
    }

}