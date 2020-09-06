import KeyFrameCssAccessor from "../../PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";

export default class ToKeyFrameSelector extends KeyFrameSelector
{
    public getName(): string {
        return 'to-animation-selector'
    }
    public getValue(): string {
        return 'to'
    }
    
}