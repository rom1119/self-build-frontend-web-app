import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";

export default abstract class CssComposite extends BasePropertyCss
{

    constructor(val: any, unit: Unit)
    {
        super(unit)
        this.values.push(val)
    }
    
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
            val += this.unit.getValue(element) + ' '
        });
        
        return val
    }

    public getClearValue() {
        var val = ''
        this.values.forEach(element => {
            val += element + ' '
        });
        
        return val
    }

    
    public withValues(newVals: string[])
    {
        this.values = []

        for (var i = 0; i < newVals.length; i++) {
            this.values.push(newVals[i])
        }
    }
}