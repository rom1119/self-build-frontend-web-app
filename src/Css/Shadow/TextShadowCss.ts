import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssTripleValue from "../CssTripleValue";
import Named from '../../Unit/Named';
import Vue from 'vue'
import BasePropertyCss from "../BasePropertyCss";
import CssMultipleValue from "../CssMultipleValue";
import Pixel from '../../Unit/Size/Pixel';
import BaseShadowCss, { BaseShadowStruct } from "./BaseShadowCss";
import CssValue from "../CssValue";

export class TextShadowStruct extends BaseShadowStruct implements CssValue {
    getId(): number {
        return this.id
    }

    getFullValue(): string
    {
        var str = ''
        if (!this.getOffsetXValue()) {
            throw Error('offsetX is not set shadow')
        }
        if (!this.getOffsetYValue()) {
            throw Error('offsetY is not set shadow')
        }
        if (!this.getColorValue()) {
            
            throw Error('Color is not set in shadow')
        }

        str += `${this.getOffsetXValue()} ${this.getOffsetYValue()}`
        if (this.getBlurValue()) {
            str += ` ${this.getBlurValue()}`

        }
        if (this.getColorValue()) {
            str += ` ${this.getColorValue()}`

        }

        return str
    }
}

export default class TextShadowCss extends BaseShadowCss
{
    public static PROP_NAME = 'text-shadow'

    public getName(): string {
        return TextShadowCss.PROP_NAME
    }

    createClearValue(): BaseShadowStruct
    {
        return new TextShadowStruct()
    }

    
    
    
    
}