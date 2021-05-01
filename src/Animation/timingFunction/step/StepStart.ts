import TimingFunction from "../TimingFunction";
import StepTimingFunction from "./StepTimingFunction";

export default class StepStart implements StepTimingFunction {
    
    public static PROP_NAME = 'step-start'

    getValue() : string {
        return StepStart.PROP_NAME
    }
}