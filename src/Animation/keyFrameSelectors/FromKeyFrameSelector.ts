import KeyFrameCssAccessor from "../../Css/PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";

export default class FromKeyFrameSelector extends KeyFrameSelector
{
    public static NAME = 'from-animation-selector'
    public getName(): string {
        return FromKeyFrameSelector.NAME
    }
    public getValue(): string {
        return 'from'
    }
    
}