import Unit from '../../Unit/Unit';
import CssWithTwoValues from './CssWithTwoValues';
import CssWithThreeValues from '~/src/Css/MultiValuesCss/CssWithThreeValues';
export default interface CssWithFourValues extends CssWithThreeValues {
    getFourthValue(): string
    setFourthValue(val: string)

    getFourthUnit(): Unit
    setFourthUnit(unit: Unit)
}