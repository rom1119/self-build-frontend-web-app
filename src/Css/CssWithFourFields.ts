import Unit from '../Unit/Unit';
import CssWithOneField from './CssWithOneField';
import CssWithThreeFields from './CssWithThreeFields';
import CssWithTwoValue from './CssWithTwoFields';

export default interface CssWithFourFields  extends CssWithThreeFields {

    valFourth: number
    unitFourth: Unit
}