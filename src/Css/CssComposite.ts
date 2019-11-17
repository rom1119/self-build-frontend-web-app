import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";

export default abstract class CssComposite extends BasePropertyCss
{
    addPropVal(val: string) {
        this.values.push(val)
    }

    get value(): string
    {
        if (!this.values[0]) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        var val = ''
        this.values.forEach(element => {
            val += element
        });
        return val
    }
    
    public withValue(newVal)
    {
        this.value
    }
}