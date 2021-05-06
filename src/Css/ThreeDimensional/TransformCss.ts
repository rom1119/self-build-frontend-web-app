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
import TimingFunction from "../../Animation/timingFunction/TimingFunction";
import Linear from '../../Animation/timingFunction/impl/Linear';
import { UnitSecond } from "~/src/Unit";
import Width from '../Size/Width';
import CssOwner from '../../CssOwner';
import KeyFrameAccessor from '../../Animation/KeyFrameAccessor';
import KeyFrame from '../../Animation/KeyFrame';
import UnitTime from '../../Unit/UnitTime';

export class AnimationCssStruct implements CssValue {
    id
    protected _duration: number
    protected _timingFunction: TimingFunction
    protected _delay: number
    protected _iterationCount: string
    protected _direction: string
    protected _fillMode: string
    protected _playState: string
    protected _keyFrame: KeyFrame

    protected _timeUnit: UnitTime = new UnitSecond()
    protected _delayUnit: UnitTime = new UnitSecond()
    protected _timingFunctionUnit: Named = new Named()

    
    getId(): number {
        return this.id
    }
    
    get keyFrameName()
    {
        if (this.keyFrame) {
            return this.keyFrame.name
        }

        return null
    }
    
    get keyFrameId()
    {
        if (this.keyFrame) {
            return this.keyFrame.uuid
        }

        return null
    }
    get durationUnit()
    {
        return this._timeUnit
    }
    
    set durationUnit(arg)
    {
        this._timeUnit = arg
    }
    
    get delayUnit()
    {
        return this._delayUnit
    }
    
    set delayUnit(arg)
    {
        this._delayUnit = arg
    }
    

    set iterationCount(val)
    {
        Vue.set(this, '_iterationCount', val)

    }
    
    get iterationCount()
    {
        return this._iterationCount
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
        this._delay = val
    }
    
    get delay()
    {
        return this._delay
    }
    
    set direction(val)
    {
        this._direction = val
    }
    
    get direction()
    {
        return this._direction
    }
    
    set fillMode(val)
    {
        this._fillMode = val
    }
    
    get fillMode()
    {
        return this._fillMode
    }
    
    set playState(val)
    {
        this._playState = val
    }
    
    get playState()
    {
        return this._playState
    }
    
    set keyFrame(val)
    {
        this._keyFrame = val
    }
    
    get keyFrame()
    {
        return this._keyFrame
    }

    get delayValue() {
        
        if (this.delayUnit) {
            return this.delayUnit.getValue(this.delay)
        }
        return ''
    }
    
    get durationValue() {
        
        if (this.durationUnit) {
            return this.durationUnit.getValue(this.duration)
        }
        return ''
    }
    

    getFullValue(): string
    {
        var str = ''

        if (this.duration) {
            str += `${this.durationValue}`  
        }
        if (this.timingFunction) {
            str += ` ${this.timingFunction.getValue()}`
            
        }
        if (this.delay) {
            str += ` ${this.delayValue}`  
        }
        
        if (this.iterationCount) {
            str += ` ${this.iterationCount}`  
        }
        
        if (this.direction) {
            str += ` ${this.direction}`  
        }
        
        if (this.fillMode) {
            str += ` ${this.fillMode}`  
        }
        
        if (this.playState) {
            str += ` ${this.playState}`  
        }
        
        
        if (this.keyFrame) {
            str += ` ${this.keyFrame.name}`  

        }
      

        return str
    }
    
}

export default class TransformCss extends BasePropertyCss implements CssMultipleValue<AnimationCssStruct>
{
    public static PROP_NAME = 'transform'
    constructor()
    {
        super(new Pixel())
        // var val = new AnimationCssStruct()
        // val.duration = AnimationCss.DEFAULT_DURATION
        // val.timingFunction = AnimationCss.DEFAULT_TIMING_FUNCTION
        this.values = []
        this.clearValue()
        // this.values.push(val)
        // var shadow = this.createClearValue()
        

        // this.values.push(shadow)
        // Vue.set(this.values, 0, shadow)
        
    }

    public initOwner(owner: CssOwner) {
        super.initOwner(owner)

    }
    
    public getName(): string {
        return TransformCss.PROP_NAME
    }


    // addValueWith()

    getValueByIndex(index: number): AnimationCssStruct {
        return this.values[index]
    }

    getValues(): AnimationCssStruct[] {
        return this.values
    }
    addValue(val: AnimationCssStruct) {
        // throw new Error("Method not implemented.");
        this.values.push(val)
    }
    removeValue(val: AnimationCssStruct) {
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

    get value(): any
    {
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