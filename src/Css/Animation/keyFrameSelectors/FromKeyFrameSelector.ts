import KeyFrameCssAccessor from "../../PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";

export default class FromKeyFrameSelector extends KeyFrameSelector
{
    public getName(): string {
        return 'from-animation-selector'
    }
    public getValue(): string {
        return 'from'
    }
    
}