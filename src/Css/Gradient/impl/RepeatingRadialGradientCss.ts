import BaseGradientCss, { BaseGradientDirection, BaseGradientStructVal } from "../BaseGradientCss"
import UnitSize from "~/src/Unit/UnitSize"
import Vue from "vue"
import CssWithoutValue from "~/src/Errors/CssWithoutValue"
import PredefinedKeywords from "../PredefinedKeywords"
import LinearSites from '../LinearSites';
import Named from '../../../Unit/Named';
import RadialSites from "../RadialSites"
import Unit from '../../../Unit/Unit';
import { RadialGradientCss } from "../.."
import { RadialGradientDirection, RadialGradientStructVal } from "./RadialGradientCss"


export class RepeatingRadialGradientDirection extends  RadialGradientDirection {
    
}

export class RepeatingRadialGradientStructVal extends  RadialGradientStructVal {
    
    
}

export default class RepeatingRadialGradientCss  extends RadialGradientCss
{
    public static PROP_NAME = 'repeating-radial-gradient'

    protected sites: RadialSites

    constructor() {
        super()
        this.sites = new RadialSites()
        this.direction = new RepeatingRadialGradientDirection()
    }

    createClearValue(): BaseGradientStructVal {
        return new RepeatingRadialGradientStructVal()
    }
  
    public getName(): string {
        return RepeatingRadialGradientCss.PROP_NAME
    }

    
}