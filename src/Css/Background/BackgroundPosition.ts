import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';

export default class BackgroundPosition extends CssTwoAxis
{
    public static PROP_NAME = 'background-position'
    public getName(): string {
        return BackgroundPosition.PROP_NAME
    }

}