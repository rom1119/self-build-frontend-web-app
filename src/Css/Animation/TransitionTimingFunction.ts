import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssTwoAxis from '../CssTwoAxis';
import BasePropertyCss from '../BasePropertyCss';
import TimingFunction from '../../Animation/timingFunction/TimingFunction';
import Named from '../../Unit/Named';
import Vue from 'vue'

export default class TransitionTimingFunction extends BasePropertyCss
{
    public static PROP_NAME = 'transition-timing-function'

    protected _timingFunction: TimingFunction
    protected unit: Named = new Named()

    public getName(): string {
        return TransitionTimingFunction.PROP_NAME
    }

    get timingFunctionUnit()
    {
        return this.unit
    }

    set timingFunction(val: TimingFunction)
    {
        Vue.set(this, '_timingFunction', val)
        this.setValue(val)
    }
    
    get timingFunction(): TimingFunction
    {
        return this._timingFunction
    }
}