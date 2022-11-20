import Unit from '../Unit/Unit';
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
export default interface CssMultipleValue<T> {
    getValueByIndex(index: number): T
    getValues(): T[]
    addValue(val: T)
    removeValue(val: T)

}