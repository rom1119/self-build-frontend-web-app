import BaseGradientCss, { BaseGradientDirection, BaseGradientStructVal } from "../BaseGradientCss"
import UnitSize from "~/src/Unit/UnitSize"
import Vue from "vue"
import CssWithoutValue from "~/src/Errors/CssWithoutValue"
import PredefinedKeywords from "../PredefinedKeywords"
import LinearSites from '../LinearSites';
import Named from '../../../Unit/Named';
import RadialSites from "../RadialSites"
import Unit from '../../../Unit/Unit';


export class RadialGradientDirection extends  BaseGradientDirection {
    protected _shape: string
    protected _shapeUnit: Unit = new Named()
    protected _size: string
    protected _sizeUnit: Unit = new Named()
    
    protected _xPos: string
    protected _xPosUnit: UnitSize
    
    protected _yPos: string
    protected _yPosUnit: UnitSize

    public static DEFAULT_SHAPE = RadialSites.SHAPES.circle
    public static DEFAULT_SIZE = RadialSites.CLOSEST_CORNER

    public static DEFAULT_XPOS = RadialSites.X_POS.center
    public static DEFAULT_YPOS = RadialSites.Y_POS.center
    
    public static DEFAULT_XPOS_UNIT = new Named()
    public static DEFAULT_YPOS_UNIT= new Named()


    set shape(val)
    {
        Vue.set(this, '_shape', val)
    }
    
    get shape()
    {
        return this._shape
    }
    
    set shapeUnit(val)
    {
        Vue.set(this, '_shapeUnit', val)
    }
    
    get shapeUnit()
    {
        return this._shapeUnit
    }
    
    set size(val)
    {
        Vue.set(this, '_size', val)
    }
    
    get size()
    {
        return this._size
    }
    
    set sizeUnit(val)
    {
        Vue.set(this, '_sizeUnit', val)
    }
    
    get sizeUnit()
    {
        return this._sizeUnit
    }
    
    set xPos(val)
    {
        Vue.set(this, '_xPos', val)
    }
    
    get xPos()
    {
        return this._xPos
    }
    
    set yPos(val)
    {
        Vue.set(this, '_yPos', val)
    }
    
    get yPos()
    {
        return this._yPos
    }


    
    set xPosUnit(val)
    {
        Vue.set(this, '_xPosUnit', val)
    }
    
    get xPosUnit()
    {
        return this._xPosUnit
    }
    
    set yPosUnit(val)
    {
        Vue.set(this, '_yPosUnit', val)
    }
    
    get yPosUnit()
    {
        return this._yPosUnit
    }

    getXPosValue() : string {
        return this._xPosUnit.getValue(this._xPos)
    }
    
    getYPosValue(): string {
        return this._yPosUnit.getValue(this._yPos)
    }

    getFullValue(): string
    {
        var res = ''

        if (this.shape) {
            res += ` ${this.shape}`
        }
        
        if (this.size) {
            res += ` ${this.size}`
        }

        if (this.getXPosValue() || this.getYPosValue()) {
            res += ' at'
        }
        if (this.getXPosValue()) {
            res += ` ${this.getXPosValue()}`

        }
        
        if (this.getYPosValue()) {
            res += ` ${this.getYPosValue()}`

        }
        
        if (res.trim().length == 0) {
            throw new CssWithoutValue('RadialGradientDirection without set val')
        }
        return res
    }
}

export class RadialGradientStructVal extends  BaseGradientStructVal {
    
    
}

export default class RadialGradientCss extends BaseGradientCss
{
    public static PROP_NAME = 'radial-gradient'

    protected sites: RadialSites

    constructor() {
        super()
        this.sites = new RadialSites()
        this.direction = new RadialGradientDirection()
    }

    createClearValue(): BaseGradientStructVal {
        return new RadialGradientStructVal()
    }
    getPredefinedSites(): PredefinedKeywords {
        return this.sites
    }
    public getName(): string {
        return RadialGradientCss.PROP_NAME
    }
    

    
}