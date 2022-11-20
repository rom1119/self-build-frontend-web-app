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
import BaseShadowCss, { BaseShadowStruct } from "./BaseShadowCss";
import CssValue from "../CssValue";

export class BoxShadowStruct extends BaseShadowStruct implements CssValue {
    protected _inset = false
    protected _spread
    protected _spreadUnit


    getId(): number {
        return this.id
    }

    set inset(val) {
        Vue.set(this, '_inset', val)
    }

    get inset() {
        return this._inset
    }

    set spread(val) {
        Vue.set(this, '_spread', val)
    }

    get spread() {
        return this._spread
    }

    set spreadUnit(val) {
        Vue.set(this, '_spreadUnit', val)
    }

    get spreadUnit() {
        return this._spreadUnit
    }

    getSpreadValue(): string {
        return this._spreadUnit.getValue(this._spread)
    }


    getFullValue(): string {
        var str = ''
        if (!this.getOffsetXValue()) {
            throw Error('offsetX is not set shadow')
        }
        if (!this.getOffsetYValue()) {
            throw Error('offsetY is not set shadow')
        }

        if (!this.getBlurValue()) {
            throw Error('blur is not set in shadow')
        }

        if (!this.getSpreadValue()) {
            throw Error('spread is not set in shadow')
        }

        if (!this.getColorValue()) {

            throw Error('Color is not set in shadow')
        }

        if (this.inset === true) {
            str += 'inset '
        }
        str += `${this.getOffsetXValue()} ${this.getOffsetYValue()}`
        if (this.getBlurValue()) {
            str += ` ${this.getBlurValue()}`

        }
        if (this.getSpreadValue()) {
            str += ` ${this.getSpreadValue()}`

        }
        if (this.getColorValue()) {
            str += ` ${this.getColorValue()}`

        }

        return str
    }
}

export default class BoxShadowCss extends BaseShadowCss {
    public static PROP_NAME = 'box-shadow'

    public static DEFAULT_SPREAD = 0
    public static DEFAULT_SPREAD_UNIT = new Pixel()

    public getName(): string {
        return BoxShadowCss.PROP_NAME
    }

    createClearValue(): BaseShadowStruct {
        return new BoxShadowStruct()
    }





}