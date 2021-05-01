import TimingFunction from "../TimingFunction";
import StepTimingFunction from "./StepTimingFunction";

export default class Steps implements StepTimingFunction {
    public static PROP_NAME = 'steps'

    val: number = 0
    stepPosition: string = null
  
    public static STEP_POSITIONS = {
        jump_start: 'jump-start',
        jump_end: 'jump-end',
        jump_none: 'jump-none',
        jump_both: 'jump-both',
        start: 'start',
        end: 'end'
    }

    constructor() {
        this.stepPosition = Steps.STEP_POSITIONS.jump_start
    }
    getValue() : string {
        return `cubic-bezier(${this.val}, ${this.stepPosition})`
    }

    public static CREATE_FROM_VAL(val: string): Steps
    {
        var o = new this()
        var params = val.substring(val.indexOf('('))
        params = params.replace('(', '')
        params = params.replace(')', '')
        var paramsArr = params.split(',')
        o.val = Number(paramsArr[0].trim())
        o.stepPosition = paramsArr[1].trim()


        // console.log(params);
        // console.log(paramsArr);


        return o
    }
    
}