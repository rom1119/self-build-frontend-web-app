import CssDirectionComposite from "../CssDirectionComposite"


export default class BasePaddingCss extends CssDirectionComposite
{
    public static PROP_NAME = 'padding'
    public getName(): string {
        return BasePaddingCss.PROP_NAME
    }

    auto() 
    {
        this.setValue('auto')
    }

}