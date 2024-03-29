
import BorderCompositeCss from "../BaseBorderCss";

export default class BorderGlobalCss extends BorderCompositeCss
{
    public static PROP_NAME = 'border'
    public getName(): string {
        return BorderGlobalCss.PROP_NAME
    }

    get left(): string
    {
        let propLength = this.values.length
        let fullProp = this.blankValue
        let newVal = ''

        return this.blankValue
    }
    
    get right(): string
    {
        let propLength = this.values.length
        let fullProp = this.blankValue
        let newVal = ''

        return this.blankValue

    }
    
    get top(): string
    {
        let propLength = this.values.length
        let fullProp = this.blankValue
        let newVal = ''

        return this.values[0]
    }

    get bottom(): string
    {
        let propLength = this.values.length
        let fullProp = this.blankValue
        let newVal = ''

        return this.blankValue

    }


}