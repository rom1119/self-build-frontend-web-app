import CssWithoutValue from '../Errors/CssWithoutValue';
export default abstract class BasePropertyCss
{
    protected name: string
    protected values: string[]

    constructor()
    {
        this.values = []
    }

    get value(): string
    {
        if (!this.values[0]) {
            throw new CssWithoutValue(`CSS property ${this.name} not have value` )
        }
        return this.values[0]
    }

}