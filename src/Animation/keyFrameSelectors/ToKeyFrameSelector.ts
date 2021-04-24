import KeyFrameCssAccessor from "../../Css/PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";

export default class ToKeyFrameSelector extends KeyFrameSelector
{
    public static NAME = 'to-animation-selector'

    public getName(): string {
        return ToKeyFrameSelector.NAME
    }
    public getValue(): string {
        return 'to'
    }
    
}