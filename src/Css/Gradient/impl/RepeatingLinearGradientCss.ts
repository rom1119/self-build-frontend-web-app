import BaseGradientCss, { BaseGradientDirection, BaseGradientStructVal } from "../BaseGradientCss"
import UnitSize from "~/src/Unit/UnitSize"
import Vue from "vue"
import CssWithoutValue from "~/src/Errors/CssWithoutValue"
import PredefinedKeywords from "../PredefinedKeywords"
import LinearSites from '../LinearSites';
import Named from '../../../Unit/Named';
import { LinearGradientDirection, LinearGradientStructVal } from "./LinearGradientCss"
import { LinearGradientCss } from "../.."


export class RepeatingLinearGradientDirection extends  LinearGradientDirection {

    
}

export class RepeatingLinearGradientStructVal extends  LinearGradientStructVal  {
    
    
}

export default class RepeatingLinearGradientCss extends LinearGradientCss
{
    public static PROP_NAME = 'repeating-linear-gradient'

    constructor() {
        super()
        this.sites = new LinearSites()
        this.direction = new RepeatingLinearGradientDirection()
    }

    createClearValue(): BaseGradientStructVal {
        return new RepeatingLinearGradientStructVal()
    }
   
    public getName(): string {
        return RepeatingLinearGradientCss.PROP_NAME
    }
    
}