import Unit from '../Unit/Unit';
import CssDoubleValue from './CssDoubleValue';
export default interface CssTripleValue extends CssDoubleValue
{
    getThirdValue(): string
    setThirdValue(val: string)
    
    getThirdUnit(): Unit
    setThirdUnit(unit: Unit)
}