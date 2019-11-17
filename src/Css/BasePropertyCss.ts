import CssWithoutValue from '../Errors/CssWithoutValue';
export default abstract class BasePropertyCss
{
    protected values: string[]

    constructor()
    {
        this.values = []
    }

    getValue(): string
    {
        if (!this.values[0]) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        return this.values[0]
    }
    

    setValue(val: string)
    {
        this.values[0] = val
        // this.values.push(val)
    }

    public abstract getName(): string

    public clearValue()
    {
        this.values = []

        return this
    }

    public equals(el: BasePropertyCss): boolean
    {
        return el.getName() === this.getName()
    }

}