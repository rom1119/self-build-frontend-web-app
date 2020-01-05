import CssWithoutValue from '../Errors/CssWithoutValue';
import Unit from '../Unit/Unit';
export default abstract class BasePropertyCss
{
    protected values: string[]
    protected unit: Unit
    public active = true

    constructor(unit: Unit)
    {
        this.unit = unit
        this.values = []
    }

    public getUnit(): Unit
    {
        return this.unit
    }
    
    public setUnit(unit: Unit)
    { 
        this.unit = unit
    }

    getValue(): string
    {
        if (!this.values[0]) {
            if (this.values[0].toString().length < 1)
                throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (!this.unit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }
        return this.unit.getValue(this.values[0])
    }
    

    setValue(val: string)
    {
        this.clearValue()
        this.values.push(val)
        // this.values.push(val)
    }

    public abstract getName(): string

    public getClearValue() {
        return this.values[0]
    }

    public clearValue()
    {
        this.values = []

        return this
    }

    public equals(el: BasePropertyCss): boolean
    {
        return el.getName() === this.getName()
    }

    public clone(): BasePropertyCss {
        var clone = Object.create(this);

        return clone;
    }

    public isActive()
    {
        return this.active === true
    }

    public setActive(val: boolean)
    {
        this.active = val
    }


}