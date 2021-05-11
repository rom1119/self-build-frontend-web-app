import Unit from '../Unit/Unit';
import CssWithOneValue from './CssWithOneValue';
import CssWithTwoValue from './CssWithTwoValues';

export default interface CssWithThreeValues extends  CssWithTwoValue {
    
    valThird: number
    unitThird: Unit
}