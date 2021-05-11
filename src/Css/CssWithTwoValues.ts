import Unit from '../Unit/Unit';
import CssWithOneValue from './CssWithOneValue';

export default interface CssWithTwoValues extends  CssWithOneValue {
    
    valSecond: number
    unitSecond: Unit
}