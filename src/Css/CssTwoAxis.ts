import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";
import Unit from "../Unit/Unit";
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
import CssPropertyLimitable from './CssPropertyLimitable';
import Pixel from '../Unit/Size/Pixel';
import Named from '../Unit/Named';

export default abstract class CssTwoAxis extends BasePropertyCss implements CssWithTwoValues, CssPropertyLimitable {
    protected _xVal: string = ''
    xValUnit: Unit = new Named()
    protected _yVal: string = ''
    yValUnit: Unit = new Named()

    protected _hasTwoValues = false

    public static UNSET = 'unset'

    public static LEFT = 'left'
    public static CENTER = 'center'
    public static RIGHT = 'right'
    public static TOP = 'top'
    public static BOTTOM = 'bottom'



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

    get value(): any {
        if (this._hasTwoValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal)

        }
        return this.xValUnit.getValue(this._xVal)
    }

    getClearValue(): string {
        return this.xVal
    }

    getValue(): string {
        if (this._xVal == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value`)
        }
        if (!this.xValUnit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit`)
        }
        if (this._hasTwoValues) {
            return this.xValUnit.getValue(this._xVal) + ' ' + this.yValUnit.getValue(this._yVal)

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

    static getAccessableXAxisProperty(): any[] {
        let props = []
        props.push(CssTwoAxis.UNSET)
        props.push(CssTwoAxis.LEFT)
        props.push(CssTwoAxis.CENTER)
        props.push(CssTwoAxis.RIGHT)


        return props
    }

    static getAccessableYAxisProperty(): any[] {
        let props = []
        props.push(CssTwoAxis.UNSET)
        props.push(CssTwoAxis.TOP)
        props.push(CssTwoAxis.CENTER)
        props.push(CssTwoAxis.BOTTOM)


        return props
    }

    static getAccessableProperty(): any[] {
        let props = []

        props = props.concat(CssTwoAxis.getAccessableXAxisProperty(), CssTwoAxis.getAccessableYAxisProperty())
        props.splice(props.indexOf(CssTwoAxis.CENTER), 1)
        props.splice(props.indexOf(CssTwoAxis.UNSET), 1)

        return props
    }
    getAccessableProperty(): any[] {
        return CssTwoAxis.getAccessableProperty()
    }
    getAccessableXAsixProperty(): any[] {
        return CssTwoAxis.getAccessableXAxisProperty()
    }

    getAccessableYAsixProperty(): any[] {
        return CssTwoAxis.getAccessableYAxisProperty()
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

    setValue(val) {
        super.setValue(val)
        this.xVal = val
    }

    setUnit(unit: Unit) {

        this.xValUnit = unit
    }

    getUnit() {

        return this.xValUnit
    }

}