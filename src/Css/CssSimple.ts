import BasePropertyCss from "./BasePropertyCss";

export default abstract class CssSimple extends BasePropertyCss
{

    constructor(val)
    {
        super()
        this.values.push(val)
    }

    // set value(val: string)
    // {   
    //     console.log('11111');
        
    //     this.values[0] = val
    // }
}