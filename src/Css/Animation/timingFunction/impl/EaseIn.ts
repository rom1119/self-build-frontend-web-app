import TimingFunction from "../TimingFunction";

export default class EaseIn implements TimingFunction {
    public static PROP_NAME = 'ease-in'

    getValue() : string {
        return EaseIn.PROP_NAME
    }
    
}