import BasePropertyCss from "./BasePropertyCss";
import Unit from '../Unit/Unit';

export default abstract class CssSimple extends BasePropertyCss
{

    constructor(val: any, unit: Unit)
    {
        super(unit)
        this.values.push(val)
    }

    // set value(val: string)
    // {   
    //     console.log('11111');
        
    //     this.values[0] = val
    // }
}