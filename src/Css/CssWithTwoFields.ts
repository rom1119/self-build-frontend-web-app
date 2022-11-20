import Unit from '../Unit/Unit';
import CssWithOneField from './CssWithOneField';

export default interface CssWithTwoFields extends CssWithOneField {

    valSecond: number
    unitSecond: Unit
}