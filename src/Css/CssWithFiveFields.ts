import Unit from '../Unit/Unit';
import CssWithFourFields from './CssWithFourFields';
import CssWithOneField from './CssWithOneField';
import CssWithThreeFields from './CssWithThreeFields';
import CssWithTwoValue from './CssWithTwoFields';

export default interface CssWithFiveFields  extends CssWithFourFields {

    valFifth: number
    unitFifth: Unit
}