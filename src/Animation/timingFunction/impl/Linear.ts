import TimingFunction from "../TimingFunction";

export default class Linear implements TimingFunction {
    public static PROP_NAME = 'linear'

    getValue() : string {
        return 'linear'
    }
    
}