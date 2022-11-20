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

export default class OutlineStyle extends CssSimple implements CssPropertyLimitable {
    public static PROP_NAME = 'outline-style'

    public getName(): string {
        return OutlineStyle.PROP_NAME
    }

    public static AUTO = 'auto'
    public static NONE = 'none'
    public static DASHED = 'dashed'
    public static DOUBLE = 'double'
    public static DOTTED = 'dotted'
    public static SOLID = 'solid'
    public static GROOVE = 'groove'
    public static RIDGE = 'ridge'
    public static INSET = 'inset'
    public static OUTSET = 'outset'

    static getAccessableProperty(): any[] {
        let props = []
        props.push(OutlineStyle.AUTO)
        props.push(OutlineStyle.NONE)
        props.push(OutlineStyle.DASHED)
        props.push(OutlineStyle.DOUBLE)
        props.push(OutlineStyle.DOTTED)
        props.push(OutlineStyle.SOLID)
        props.push(OutlineStyle.GROOVE)
        props.push(OutlineStyle.RIDGE)
        props.push(OutlineStyle.INSET)
        props.push(OutlineStyle.OUTSET)

        return props
    }
    getAccessableProperty(): any[] {
        return OutlineStyle.getAccessableProperty()
    }

}