import TimingFunction from "../TimingFunction";
import StepTimingFunction from "./StepTimingFunction";

export default class StepEnd implements StepTimingFunction {
    
    public static PROP_NAME = 'step-end'

    getValue() : string {
        return StepEnd.PROP_NAME
    }
}