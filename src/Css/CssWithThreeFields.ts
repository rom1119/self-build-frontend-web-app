import Unit from '../Unit/Unit';
import CssWithOneField from './CssWithOneField';
import CssWithTwoValue from './CssWithTwoFields';

export default interface CssWithThreeFields extends CssWithTwoValue {

    valThird: number
    unitThird: Unit
}