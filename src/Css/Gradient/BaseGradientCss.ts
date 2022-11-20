import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssWithThreeValues from "../MultiValuesCss/CssWithThreeValues";
import Named from '../../Unit/Named';
import Vue from 'vue'
import BasePropertyCss from "../BasePropertyCss";
import CssMultipleValue from "../CssMultipleValue";
import Pixel from '../../Unit/Size/Pixel';
import CssValue from "../CssValue";
import PredefinedKeywords from "./PredefinedKeywords";
import Percent from '../../Unit/Size/Percent';

export abstract class BaseGradientDirection implements CssValue {
    id
    getId(): number {
        return this.id
    }
    abstract getFullValue(): string

}

export abstract class BaseGradientStructVal implements CssValue {
    id

    public static DEFAULT_COLOR = 'blue'
    public static DEFAULT_COLOR_UNIT = new Named()

    public static DEFAULT_SIZE = 10
    public static DEFAULT_SIZE_UNIT = new Percent()

    protected _size: number
    protected _sizeUnit: UnitSize
    protected _color: any
    protected _colorUnit: UnitColor

    getId(): number {
        return this.id
    }
    set color(val) {
        Vue.set(this, '_color', val)
    }

    get color() {
        return this._color
    }

    set colorUnit(val) {
        Vue.set(this, '_colorUnit', val)
    }

    get colorUnit() {
        return this._colorUnit
    }


    set size(val) {
        Vue.set(this, '_size', val)

    }

    get size() {
        return this._size
    }

    set sizeUnit(val) {
        Vue.set(this, '_sizeUnit', val)

    }

    get sizeUnit() {
        return this._sizeUnit
    }

    getColorValue(): string {
        if (this._colorUnit) {
            return this._colorUnit.getValue(this._color)

        }

        return ''
    }

    getSizeValue(): string {
        return this._sizeUnit.getValue(this._size)
    }

    getFullValue(): string {
        var res = ''
        if (this.getColorValue()) {
            res += `${this.getColorValue()}`
        }

        if (this.getSizeValue()) {
            res += ` ${this.getSizeValue()}`
        }

        if (res.trim().length == 0) {
            throw new CssWithoutValue('BaseGradientStructVal without set val')
        }
        return res
    }

}

export default abstract class BaseGradientCss extends BasePropertyCss implements CssMultipleValue<BaseGradientStructVal>
{
    protected values: BaseGradientStructVal[] = []
    protected _direction: BaseGradientDirection

    constructor() {
        super(new Named())
        this.values = []
        this.clearValue()
        // var shadow = this.createClearValue()
        // this.values.push(shadow)
        // Vue.set(this.values, 0, shadow)

    }

    abstract createClearValue(): BaseGradientStructVal
    abstract getPredefinedSites(): PredefinedKeywords


    set direction(val) {
        Vue.set(this, '_direction', val)
    }

    get direction() {
        return this._direction
    }

    // addValueWith()

    getValueByIndex(index: number): BaseGradientStructVal {
        return this.values[index]
    }

    getValues(): BaseGradientStructVal[] {
        return this.values
    }
    addValue(val: BaseGradientStructVal) {
        Vue.set(this.values, this.values.length, val)

        // this.values.push(val)
    }
    removeValue(val: BaseGradientStructVal) {
        throw new Error("Method not implemented.");
    }

    setValue(val: any) {
        return false        // this.values.push(val)
    }

    getValue(): string {
        if (this.values.length == 0) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value`)
        }
        var val = '' + this.getName() + '('
        if (this.direction) {
            if (this.direction.getFullValue().trim().length > 0) {
                val += this.direction.getFullValue() + ', '
            }

        }

        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });

        val += ')'

        return val
    }

    get value(): string {
        var val = '' + this.getName() + '('
        if (this.direction) {
            if (this.direction.getFullValue().trim().length > 0) {
                val += this.direction.getFullValue() + ', '
            }

        }

        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });

        val += ')'

        return val
    }


}