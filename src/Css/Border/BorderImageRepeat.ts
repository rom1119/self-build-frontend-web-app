import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssWithThreeValues from "../MultiValuesCss/CssWithThreeValues";
import Named from '../../Unit/Named';
import Vue from 'vue'
import { UnitUrl } from "~/src/Unit";
import BaseGradientCss from '../Gradient/BaseGradientCss';
import CssFiveProperty from '../CssFiveProperty';
import CssFourProperty from '../CssFourProperty';
import CssTwoProperty from '../CssTwoProperty';

export default class BorderImageRepeat extends CssTwoProperty implements CssPropertyLimitable {

    public static PROP_NAME = 'border-image-repeat'

    public getName(): string {
        return BorderImageRepeat.PROP_NAME
    }

    public static STRETCH: string = 'stretch'
    public static REPEAT: string = 'repeat'
    public static ROUND: string = 'round'
    public static SPACE: string = 'space'


    static getAccessableProperty(): any[] {
        return [
            BorderImageRepeat.STRETCH, BorderImageRepeat.REPEAT, BorderImageRepeat.ROUND, BorderImageRepeat.SPACE
        ]
    }
    getAccessableProperty(): any[] {
        return BorderImageRepeat.getAccessableProperty()
    }

}