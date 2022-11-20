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
import { EM, Percent, Pixel, UnitUrl } from "~/src/Unit";
import BaseGradientCss from '../Gradient/BaseGradientCss';
import CssFiveProperty from '../CssFiveProperty';
import CssFourProperty from '../CssFourProperty';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';

export default class OutlineWidth extends CssSimple implements CssPropertyLimitable, CssPropertyLimitableNotRequired {
    getAvailableAnotherUnits(): string[]
    {
        return [
            Pixel.PROP_NAME, Percent.PROP_NAME, EM.PROP_NAME
        ]
    }
    public static PROP_NAME = 'outline-width'

    public getName(): string {
        return OutlineWidth.PROP_NAME
    }

    public static THIN = 'thin'
    public static MEDIUM = 'medium'
    public static THICK = 'thick'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(OutlineWidth.THIN)
        props.push(OutlineWidth.MEDIUM)
        props.push(OutlineWidth.THICK)

        return props
    }
    getAccessableProperty(): any[] {
        return OutlineWidth.getAccessableProperty()
    }

}