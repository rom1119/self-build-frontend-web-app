import TimingFunction from "../TimingFunction";

export default class EaseInOut implements TimingFunction {
    public static PROP_NAME = 'ease-in-out'

    getValue() : string {
        return EaseInOut.PROP_NAME
    }
    
}