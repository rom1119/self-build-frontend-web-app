import KeyFrameCssAccessor from "../../PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";
import Percent from '../../../Unit/Size/Percent';

export default class PercentKeyFrameSelector extends KeyFrameSelector
{
    protected unit: Percent
    val: number = 0

    constructor() {
        super()
        this.unit = new Percent()
    }
    public getName(): string {
        return 'percent-animation-selector'
    }
    public getValue(): string {
        return this.unit.getValue(this.val)
    }
    
}