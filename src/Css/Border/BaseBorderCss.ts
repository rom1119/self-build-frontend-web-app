import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";

export default abstract class BaseBorderCss extends CssDirectionComposite
{
    private _widthUnit
    private _colorUnit

    constructor(val: any, unit: Unit)
    {
        super(val, unit)
        this.clearValue()
        this.values.push(unit.getValue(val))
        this._widthUnit = unit
    }
    getValue(): string
    {
        if (!this.values[0]) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        var val = ''
        this.values.forEach(element => {
            val += element + ' '
        });
        
        return val
    }

    public setWidth(val: number, unit: UnitSize)
    {
        if (this.values[0] !== 'undefined') {
            this.values[0] = unit.getValue(val)
        } else {
            this.values.push(unit.getValue(val))
        }
    }
    
    public setType(val: string)
    {
        if (this.values[1] !== 'undefined') {
            this.values[1] = val
        } else {
            this.values.push(val)
        }
    }
    
    public setColor(val: string, unit: UnitColor)
    {
        if (this.values[2] !== 'undefined') {
            this.values[2] = unit.getValue(val)
        } else {
            this.values.push(unit.getValue(val))
        }

        this._colorUnit = unit

    }

    public getWidth(): string
    {
        return this.values[0]
    }
    
    public getType(): string
    {
        return this.values[1]
    }
    
    public getColor(): string
    {
        return this.values[2]
    }

    public getWidthUnit()
    {
        return this._widthUnit
    }
    
    public getColorUnit()
    {
        return this._colorUnit
    }
}