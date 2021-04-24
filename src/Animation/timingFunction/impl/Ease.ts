import TimingFunction from "../TimingFunction";

export default class Ease implements TimingFunction {
    public static PROP_NAME = 'ease'

    getValue() : string {
        return Ease.PROP_NAME
    }
    
}