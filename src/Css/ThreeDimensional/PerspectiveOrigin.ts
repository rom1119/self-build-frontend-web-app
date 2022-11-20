import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssWithTwoValues from '../MultiValuesCss/CssWithTwoValues';
import Unit from '../../Unit/Unit';
import Percent from '../../Unit/Size/Percent';
import CssTwoAxis from '../CssTwoAxis';

export default class PerspectiveOrigin extends CssTwoAxis {
    public static PROP_NAME = 'perspective-origin'




    public getName(): string {
        return PerspectiveOrigin.PROP_NAME
    }



}