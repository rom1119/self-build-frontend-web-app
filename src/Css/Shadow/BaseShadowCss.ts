import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssTripleValue from "../CssTripleValue";
import Named from '../../Unit/Named';
import Vue from 'vue'
import BasePropertyCss from "../BasePropertyCss";
import CssMultipleValue from "../CssMultipleValue";
import Pixel from '../../Unit/Size/Pixel';
import CssValue from "../CssValue";

export abstract class BaseShadowStruct {
    id
    protected _offsetX: number
    protected _offsetXUnit: UnitSize
    protected _offsetY: number
    protected _offsetYUnit: UnitSize
    protected _blur: number
    protected _blurUnit: UnitSize
    protected _color: any
    protected _colorUnit: UnitColor

    set offsetX(val)
    {
        // if (this.values[0] !== 'undefined') {
        //     this.values[0] = val
        // } else {
        //     this.values.push(val)
        // }

        Vue.set(this, '_offsetX', val)

    }
    
    get offsetX()
    {
        return this._offsetX
    }
    
    set offsetY(val)
    {
        Vue.set(this, '_offsetY', val)
    }
    
    get offsetY()
    {
        return this._offsetY
    }
    
    set blur(val)
    {
        Vue.set(this, '_blur', val)
    }
    
    get blur()
    {
        return this._blur
    }
    
    set color(val)
    {
        Vue.set(this, '_color', val)
    }
    
    get color()
    {
        return this._color
    }


    set offsetXUnit(val)
    {
        // if (this.values[0] !== 'undefined') {
        //     this.values[0] = val
        // } else {
        //     this.values.push(val)
        // }

        Vue.set(this, '_offsetXUnit', val)

    }
    
    get offsetXUnit()
    {
        return this._offsetXUnit
    }
    
    set offsetYUnit(val)
    {
        Vue.set(this, '_offsetYUnit', val)
    }
    
    get offsetYUnit()
    {
        return this._offsetYUnit
    }
    
    set blurUnit(val)
    {
        Vue.set(this, '_blurUnit', val)
    }
    
    get blurUnit()
    {
        return this._blurUnit
    }
    
    set colorUnit(val)
    {
        Vue.set(this, '_colorUnit', val)
    }
    
    get colorUnit()
    {
        return this._colorUnit
    }
    
    
    getColorValue() : string {
        return this._colorUnit.getValue(this._color)
    }
    
    getOffsetXValue(): string {
        return this._offsetXUnit.getValue(this._offsetX)
    }
    
    getOffsetYValue(): string {
        return this._offsetYUnit.getValue(this._offsetY)
    }
    
    getBlurValue(): string {
        return this._blurUnit.getValue(this._blur)
    }

    abstract getFullValue(): string
    
}

export default abstract class BaseShadowCss extends BasePropertyCss implements CssMultipleValue<BaseShadowStruct>
{
    protected values: BaseShadowStruct[] = []

    public static DEFAULT_OFFSET_X = 3
    public static DEFAULT_OFFSET_Y = 3
    public static DEFAULT_BLUR = 3
    public static DEFAULT_COLOR = 'blue'
    public static DEFAULT_OFFSET_X_UNIT = new Pixel()
    public static DEFAULT_OFFSET_Y_UNIT = new Pixel()
    public static DEFAULT_BLUR_UNIT = new Pixel()
    public static DEFAULT_COLOR_UNIT = new Named()

    constructor(offXPixel: number, offYPixel: number, color: string)
    {
        super(new Pixel())
        this.values = []
        this.clearValue()
        // var shadow = this.createClearValue()
        
        // shadow.offsetX = offXPixel
        // shadow.offsetY = offYPixel
        // shadow.color = color
        // shadow.blur = BaseShadowCss.DEFAULT_BLUR

        // shadow.offsetXUnit = BaseShadowCss.DEFAULT_OFFSET_X_UNIT
        // shadow.offsetYUnit = BaseShadowCss.DEFAULT_OFFSET_Y_UNIT
        // shadow.blurUnit = BaseShadowCss.DEFAULT_BLUR_UNIT
        // shadow.colorUnit = BaseShadowCss.DEFAULT_COLOR_UNIT

        // this.values.push(shadow)
        // Vue.set(this.values, 0, shadow)

    }

    abstract createClearValue(): BaseShadowStruct

    // addValueWith()

    getValueByIndex(index: number): BaseShadowStruct {
        return this.values[index]
    }

    getValues(): BaseShadowStruct[] {
        return this.values
    }
    addValue(val: BaseShadowStruct) {
        Vue.set(this.values, this.values.length, val)

        // this.values.push(val)
    }
    removeValue(val: BaseShadowStruct) {
        throw new Error("Method not implemented.");
    }

    setValue(val: any)
    {
        return false        // this.values.push(val)
    }

    getValue(): string
    {
        if (this.values.length == 0) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        // if (this.values[0].toString().length < 1) {
        //     throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        // }
        var val = ''
        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });
        
        return val
    }

    get value(): string
    {
        // if (this.values[0].toString().length < 1) {
        //     throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        // }
        var val = ''
        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });
        
        return val
    }

    
}