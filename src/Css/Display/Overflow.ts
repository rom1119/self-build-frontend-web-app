import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';

export default class Overflow extends CssTwoAxis implements CssPropertyLimitable
{
    public static PROP_NAME = 'overflow'
    public getName(): string {
        return Overflow.PROP_NAME
    }
    public static UNSET = 'unset'
    public static VISIBLE = 'visible'
    public static HIDDEN = 'hidden'
    public static SCROLL = 'scroll'
    public static AUTO = 'auto'


    static getAccessableProperty(): any[] {
        let props = []
        props.push(Overflow.UNSET)
        props.push(Overflow.VISIBLE)
        props.push(Overflow.HIDDEN)
        props.push(Overflow.SCROLL)
        props.push(Overflow.AUTO)

        return props
    }

    static getAccessableXAxisProperty(): any[] {
        return Overflow.getAccessableProperty()
    }
    
    static getAccessableYAxisProperty(): any[] {
        return Overflow.getAccessableProperty()
    }

    getAccessableXAsixProperty(): any[] {
        return Overflow.getAccessableXAxisProperty()
    }
    
    getAccessableYAsixProperty(): any[] {
        return Overflow.getAccessableYAxisProperty()
    }  

    getAccessableProperty(): any[] {
        return Overflow.getAccessableProperty()
    }


}