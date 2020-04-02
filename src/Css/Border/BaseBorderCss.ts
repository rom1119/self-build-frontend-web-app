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

export default abstract class BaseBorderCss extends CssDirectionComposite implements CssTripleValue
{
    private _widthUnit
    private _colorUnit
    private _typeUnit

    constructor(val: any, unit: Unit)
    {
        super(val, unit)
        this.clearValue()
        if (unit) {
            this.values.push(unit.getValue(val))
            Vue.set(this.values, 0, val)
            // Vue.set(this, '', val)

            this._widthUnit = unit
        }
        this._typeUnit = new Named()
    }
    getThirdValue(): string {
        return this.values[2]
    }
    setThirdValue(val: string) {
        if (this.values[2] !== 'undefined') {
            this.values[2] = val
        } else {
            this.values.push(val)
        }
        Vue.set(this.values, 2, val)

    }
    getThirdUnit(): Unit {
        return this._colorUnit
    }
    setThirdUnit(unit: Unit) {
        this._colorUnit = unit
    }
    getSecondValue(): string {
        return this.values[1]
    }
    setSecondValue(val: string) {
        if (this.values[1] !== 'undefined') {
            this.values[1] = val
        } else {
            this.values.push(val)
        }

        Vue.set(this.values, 1, val)

    }
    getSecondUnit(): Unit {
        return this._typeUnit
    }
    setSecondUnit(unit: Unit) {
        this._typeUnit = unit
    }

    setValue(val: string)
    {
        this.clearValue()
        let arr = val.toString().split(' ')
        for (const el of arr) {
            this.values.push(el)
            // console.log(el);
            
        }
    }

    getValue(): string
    {
        if (this.values[0] == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (this.values[0].toString().length < 1) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        }
        // var val = ''
        // this.values.forEach(element => {
        //     val += element + ' '
        // });
        
        return `${this.getWidth()} ${this.getType()} ${this.getColor()}`
    }

    public setWidth(val: number, unit: UnitSize)
    {
        if (this.values[0] !== 'undefined') {
            this.values[0] = val
        } else {
            this.values.push(val)
        }

        Vue.set(this.values, 0, val)
        this._widthUnit = unit

    }
    
    public setType(val: string)
    {
        if (this.values[1] !== 'undefined') {
            this.values[1] = val
        } else {
            this.values.push(val)
        }

        Vue.set(this.values, 1, val)

    }
    
    public setColor(val: any, unit: UnitColor)
    {
        if (this.values[2] !== 'undefined') {
            this.values[2] = val
        } else {
            this.values.push(val)
        }

        Vue.set(this.values, 2, val)


        this._colorUnit = unit

    }

    public getClearWidth(): string
    {
        return this.values[0]
    }
    
    public getClearStyle(): string
    {
        return this.values[1]
    }
    
    public getClearColor(): string
    {
        return this.values[2]
    }

    get clearWidth()
    {
        return this.values[0]
    }
    
    set clearWidth(val)
    {
        if (this.values[0] !== 'undefined') {
            this.values[0] = val
        } else {
            this.values.push(val)
        }

        Vue.set(this.values, 0, val)

    }
    
    
    
    set clearWidthUnit(val)
    {

        Vue.set(this, '_widthUnit', val)

    }
    
    get clearWidthUnit()
    {
        return this._widthUnit
    }

    get clearStyle()
    {
        return this.values[1]
    }
    
    set clearStyle(val)
    {
        if (this.values[1] !== 'undefined') {
            this.values[1] = val

        } else {
            this.values.push(val)
        }
        Vue.set(this.values, 1, val)
    }
    
    get clearColor()
    {
        return this.values[2]
    }
    
    set clearColor(val)
    {
        if (this.values[2] !== 'undefined') {
            this.values[2] = val
        } else {
            this.values.push(val)
        }
        Vue.set(this.values, 2, val)
    }

    public getWidth(): string
    {
        return this._widthUnit ? this._widthUnit.getValue(this.values[0]) : ''
    }
    
    public getType(): string
    {
        return this._typeUnit ? this._typeUnit.getValue(this.values[1]) : ''
    }
    
    public getColor(): string
    {
        return this._colorUnit ? this._colorUnit.getValue(this.values[2]) : ''
    }

    public getWidthUnit()
    {
        return this._widthUnit
    }
    
    public getColorUnit()
    {
        return this._colorUnit
    }

    public getTypeUnit()
    {
        return this._typeUnit
    }
}