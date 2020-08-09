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
import TimingFunction from "./timingFunction/TimingFunction";
import Linear from './timingFunction/impl/Linear';
import { UnitSecond } from "~/src/Unit";
import Width from '../Size/Width';

export class TransitionStruct implements CssValue {
    id
    protected _all: boolean
    protected _propertyName: string
    protected _duration: number
    protected _timingFunction: TimingFunction
    protected _delay: number

    protected _propertyNameUnit: Named = new Named()
    protected _durationUnit: UnitSecond = new UnitSecond()
    protected _delayUnit: UnitSecond = new UnitSecond()
    protected _timingFunctionUnit: Named = new Named()
    
    getId(): number {
        return this.id
    }
    set all(val)
    {
        Vue.set(this, '_all', val)
    }
    get all()
    {
        return this._all
    }
    
    get propertyNameUnit()
    {
        return this._propertyNameUnit
    }
    
    get timingFunctionUnit()
    {
        return this._timingFunctionUnit
    }
    
    get durationUnit()
    {
        return this._durationUnit
    }
    
    get delayUnit()
    {
        return this._delayUnit
    }
    

    set propertyName(val)
    {
        // if (this.values[0] !== 'undefined') {
        //     this.values[0] = val
        // } else {
        //     this.values.push(val)
        // }

        Vue.set(this, '_propertyName', val)

    }
    
    get propertyName()
    {
        return this._propertyName
    }
    
    set duration(val)
    {
        Vue.set(this, '_duration', val)
    }
    
    get duration()
    {
        return this._duration
    }
    
    set timingFunction(val: TimingFunction)
    {
        Vue.set(this, '_timingFunction', val)
    }
    
    get timingFunction(): TimingFunction
    {
        return this._timingFunction
    }
    
    set delay(val)
    {
        Vue.set(this, '_delay', val)
    }
    
    get delay()
    {
        return this._delay
    }
    
    getPropertyName()
    {
        if (this.all) {
            return 'all'
        }

        return this.propertyName
    }
    
    

    getFullValue(): string
    {
        var str = ''
        if (!this.propertyName) {
            if (!this.all) {
                throw Error('property is not set')
            }
        }
        if (!this.duration) {
            throw Error('duration is not set')
        }
        if (this.propertyName && this.all === true) {
            // throw Error('can not set property Name And ALL')

        }

        if (this.all === true) {
            str += 'all '
        } else {

            str += `${this.propertyName} `
        }

        str += `${this.duration}s`
        if (this.timingFunction.getValue()) {
            str += ` ${this.timingFunction.getValue()}`

        }
        
        if (this.delay) {
            str += ` ${this.delay}s`

        }
      

        return str
    }
    
}

export default class TransitionCss extends BasePropertyCss implements CssMultipleValue<TransitionStruct>
{
    public static PROP_NAME = 'transition'

    protected values: TransitionStruct[] = []
    
    public static DEFAULT_ALL = true
    public static DEFAULT_PROPERTY_NAME = Width.PROP_NAME
    public static DEFAULT_DURATION = 0.5
    public static DEFAULT_DELAY = 0
    public static DEFAULT_TIMING_FUNCTION = new Linear()
   
    
    constructor()
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
    
    public getName(): string {
        return TransitionCss.PROP_NAME
    }
    createClearValue(): TransitionStruct
    {
        return new TransitionStruct()
    }

    // addValueWith()

    getValueByIndex(index: number): TransitionStruct {
        return this.values[index]
    }

    getValues(): TransitionStruct[] {
        return this.values
    }
    addValue(val: TransitionStruct) {
        Vue.set(this.values, this.values.length, val)

        // this.values.push(val)
    }
    removeValue(val: TransitionStruct) {
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

    
}