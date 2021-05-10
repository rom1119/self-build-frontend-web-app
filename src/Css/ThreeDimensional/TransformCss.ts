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
import TransformType from './TransformType';
import TransformTypeFactoryFromName from '../../Factory/TransformTypeFactoryFromName';

export class TransformCssStruct implements CssValue {
    id
    protected _value: TransformType
    

    constructor(value: TransformType) {
        this._value = value
    }
    
    getId(): number {
        return this.id
    }

    get value()
    {
        return this._value
    }
    
    // set value(arg)
    // {
    //     this._value = arg
    // }
    
    

    getFullValue(): string
    {
        var str = ''

        if (this.value) {
            str += `${this.value.getValue()}`  
        }
      

        return str
    }
    
}

export default class TransformCss extends BasePropertyCss implements CssMultipleValue<TransformCssStruct>
{
    
    public static PROP_NAME = 'transform'
    
    protected transformTypeFactory: TransformTypeFactoryFromName

    constructor()
    {
        super(new Pixel())
        this.transformTypeFactory = new TransformTypeFactoryFromName()
        // var val = new AnimationCssStruct()
        // val.duration = AnimationCss.DEFAULT_DURATION
        // val.timingFunction = AnimationCss.DEFAULT_TIMING_FUNCTION
        this.values = []
        this.clearValue()
        
    }

     availableTypes(): TransformType[] {
        var all = this.transformTypeFactory.createAll()
        var res = []
        console.log('get availableTypes');
        console.log('all', all);
        
        
        for (const el of all) {
            if (!this.hasValueWithType(el)) {
                res.push(el)
            }
        }
        console.log('res', res);

        return res
    }

    get canAddTransformValue(): boolean
    {
        return true
    }

    public initOwner(owner: CssOwner) {
        super.initOwner(owner)

    }
    
    public getName(): string {
        return TransformCss.PROP_NAME
    }


    // addValueWith()

    getValueByIndex(index: number): TransformCssStruct {
        return this.values[index]
    }

    getValues(): TransformCssStruct[] {
        return this.values
    }
    addValue(val: TransformCssStruct) {
        // throw new Error("Method not implemented.");
        this.values.push(val)
    }
    removeValue(val: TransformCssStruct) {
        var indx = null
        for (const key in this.values) {
            var el = this.values[key]
            if (val.id === el.id) {
                indx = key
                break
            }
        }

        if (indx != null) {
            this.values.splice(indx, 1)
        }
    }

    setValue(val: any)
    {
        return false        // this.values.push(val)
    }

    protected hasValueWithType(el: TransformType): boolean {
        
        for (const val of this.values) {
            if (val.value.getName() === el.getName()) {
                return true
            }
        }
        return false
    }

    getValue(): string
    {
        // if (this.values.length == 0) {
        //     throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        // }
        // if (this.values[0].toString().length < 1) {
        //     throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        // }
        var val = ''
        this.values.forEach((element, key) => {
            val += element.getFullValue()
            if (key < this.values.length - 1) {
                val += ' '
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
                val += ' '
            }
        });
        
        return val
    }



    
}