import TimingFunction from "../TimingFunction";

export default class EaseOut implements TimingFunction {
    public static PROP_NAME = 'ease-out'

    getValue() : string {
        return EaseOut.PROP_NAME
    }
    
}