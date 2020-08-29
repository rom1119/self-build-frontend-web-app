import BaseGradientCss, { BaseGradientDirection, BaseGradientStructVal } from "../BaseGradientCss"
import UnitSize from "~/src/Unit/UnitSize"
import Vue from "vue"
import CssWithoutValue from "~/src/Errors/CssWithoutValue"
import PredefinedKeywords from "../PredefinedKeywords"
import LinearSites from '../LinearSites';
import Named from '../../../Unit/Named';


export class LinearGradientDirection extends  BaseGradientDirection {
    protected _direction: string
    protected _directionUnit: UnitSize

    public static DEFAULT_DIRECTION = LinearSites.RIGHT
    
    public static DEFAULT_DIRECTION_UNIT = new Named()

    set direction(val)
    {
        Vue.set(this, '_direction', val)
    }
    
    get direction()
    {
        return this._direction
    }
    
    set directionUnit(val)
    {
        Vue.set(this, '_directionUnit', val)
    }
    
    get directionUnit()
    {
        return this._directionUnit
    }

    getDirectionValue() : string {
        return this._directionUnit.getValue(this._direction)
    }

    getFullValue(): string
    {
        var res = ''
        if (this._directionUnit instanceof Named) {
            res += 'to '
        }
        res += `${this.getDirectionValue()}`
        
        if (res.trim().length == 0) {
            throw new CssWithoutValue('BaseGradientStructVal without set val')
        }
        return res
    }
}

export class LinearGradientStructVal extends  BaseGradientStructVal {
    
    
}

export default class LinearGradientCss extends BaseGradientCss
{
    public static PROP_NAME = 'linear-gradient'

    protected sites: LinearSites

    constructor() {
        super()
        this.sites = new LinearSites()
        this.direction = new LinearGradientDirection()
    }

    createClearValue(): BaseGradientStructVal {
        return new LinearGradientStructVal()
    }
    getPredefinedSites(): PredefinedKeywords {
        return this.sites
    }
    public getName(): string {
        return LinearGradientCss.PROP_NAME
    }
    

    
}