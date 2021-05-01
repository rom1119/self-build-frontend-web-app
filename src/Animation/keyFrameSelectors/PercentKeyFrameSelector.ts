import KeyFrameCssAccessor from "../../Css/PropertyAccessor/KeyFrameCssAccessor"
import ApiService from "~/src/Api/ApiService"
import KeyFrameSelectorSynchronizer from "~/src/Synchronizer/Impl/KeyFrameSelectorSynchronizer"
import BaseSelector from '../../BaseSelector';
import KeyFrameSelector from "../KeyFrameSelector";
import Percent from '../../Unit/Size/Percent';

export default class PercentKeyFrameSelector extends KeyFrameSelector
{
    public static NAME = 'percent-animation-selector'
    readonly isPercent = true
    protected unit: Percent
    val: number = 0

    constructor() {
        super()
        this.unit = new Percent()
    }
    public getName(): string {
        return PercentKeyFrameSelector.NAME
    }
    public getValue(): string {
        return this.unit.getValue(this.val)
    }

    public getUnit()
    {
        return this.unit
    }

    
}