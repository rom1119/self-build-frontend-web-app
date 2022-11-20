import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';
import CssWithFiveValues from './MultiValuesCss/CssWithFiveValues';
import CssFourProperty from "./CssFourProperty";

export default abstract class CssFiveProperty extends CssFourProperty implements CssWithFiveValues {
    protected fithVal: string = ''
    protected fithUnit: Unit = new Pixel()
    protected _hasFiveValues: boolean = false

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

    getFifhValue(): string {
        return this.fithVal
    }
    setFifhValue(val: string) {
        this.fithVal = val
        this._hasFiveValues = true
    }
    getFifhUnit(): Unit {
        return this.fithUnit
    }
    setFifhUnit(unit: Unit) {
        this.fithUnit = unit
    }

}