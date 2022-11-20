import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssDoubleValue from './CssDoubleValue';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';
import CssWithThreeValues from './CssWithThreeValues';
import CssTripleValue from './CssTripleValue';
import CssTwoAxis from '~/src/Css/CssTwoAxis';

export default abstract class CssThreeAxis extends BasePropertyCss implements CssTripleValue
{
    protected _xVal: string = ''
    xValUnit: Unit = new Named()
    protected _yVal: string = ''
    yValUnit: Unit = new Named()

    protected _hasTwoValues = false
    protected _hasThreeValues = false

    valThird: string = ''
    unitThird: Unit = new Named()



    constructor(val: any, unit: Unit) {
        super(unit)
        this.values.push(val)
    }

    onChangeXKeywordValue() {
        if (!(this.xValUnit instanceof Named)) {
            this.xValUnit = new Named()
        }
    }
    
    onChangeYKeywordValue() {
        if (!(this.yValUnit instanceof Named)) {
            this.yValUnit = new Named()
        }
    }

    onChangeXNumericValue() {
        if (this.xValUnit instanceof Named) {
            this.xValUnit = new Pixel()
        }
    }
    
    onChangeYNumericValue() {
        if (this.yValUnit instanceof Named) {
            this.yValUnit = new Pixel()
        }
    }
    onChangeHasTwoValue() {

        if (!this.hasTwoValues) {
            this._yVal = null
            this.yValUnit = null
        } else {
            this._yVal = 'center'
            this.yValUnit = new Named()
        }
    }

    get value(): any
    {
        if (this._hasTwoValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal)

        }

        if (this._hasThreeValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal) + ' ' + this.unitThird.getValue(this.valThird)

        }
        
        return this.xValUnit.getValue(this._xVal)
    }

    getClearValue(): string
    {
        return this.xVal
    }

    getValue(): string
    {
        if (this._xVal == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (!this.xValUnit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }
        if (this._hasTwoValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal)
        }
        
        if (this._hasThreeValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal) + ' ' + this.unitThird.getValue(this.valThird)

        }
        return this.xValUnit.getValue(this._xVal)
    }

    get xVal() {
        return this._xVal
    }
    
    set xVal(arg) {
        this._xVal = arg
        if (!arg.length) {
            this.xValUnit = new Named()
        } else {
            
        }
    }
    
    get yVal() {
        return this._yVal
    }
    
    set yVal(arg) {
        this._yVal = arg
        if (!arg) {
            this.yValUnit = new Named()
        } else {
            
        }
    }

    get canSelectXvalKeyword() {
        return this.getAccessableXAsixProperty().indexOf(this.xVal) > -1 || !this.xVal.length
    }
    
    get canSelectYvalKeyword() {
        return this.getAccessableYAsixProperty().indexOf(this.yVal) > -1 || !this.yVal.length
    }


    get hasTwoValues() {
        return this._hasTwoValues
    }
    
    set hasTwoValues(arg) {
        this._hasTwoValues = arg
        
    }
    
    getSecondValue(): string {
        return this.yVal
    }
    setSecondValue(val: string) {
        this.yVal = val
        this._hasTwoValues = true
    }
    getSecondUnit(): Unit {
        return this.yValUnit
    }
    setSecondUnit(unit: Unit) {
        this.yValUnit = unit
    }

    getThirdValue(): string
    {
        return this.valThird
    }
    setThirdValue(val: string)
    {
        this.valThird = val
        this._hasThreeValues = true

    }
    
    getThirdUnit(): Unit
    {
        return this.unitThird
    }
    setThirdUnit(unit: Unit)
    {
        this.unitThird = unit
    }

    setValue(val)
    {
        super.setValue(val)
        this.xVal = val
    }
    
    setUnit(unit: Unit)
    {

        this.xValUnit = unit
    }
    
    getUnit()
    {

        return this.xValUnit
    }
  
}