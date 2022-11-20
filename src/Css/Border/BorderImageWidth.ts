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

export default class BorderImageWidth extends CssFourProperty {
    public static PROP_NAME = 'border-image-width'

    public getName(): string {
        return BorderImageWidth.PROP_NAME
    }

}