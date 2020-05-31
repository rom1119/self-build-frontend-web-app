import Unit from '../Unit/Unit';
import CssDoubleValue from './CssDoubleValue';
export default interface CssMultipleValue<T>
{
    getValueByIndex(index: number): T
    getValues(): T[]
    addValue(val: T)
    removeValue(val: T)
    
}