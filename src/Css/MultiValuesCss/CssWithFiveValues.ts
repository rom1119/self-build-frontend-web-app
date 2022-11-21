import Unit from '../../Unit/Unit';
import CssWithTwoValues from './CssWithTwoValues';
import CssWithThreeValues from '~/src/Css/MultiValuesCss/CssWithThreeValues';
import CssWithFourValue from './CssWithFourValues';
export default interface CssWithFiveValues extends CssWithFourValue {
    getFifthValue(): string
    setFifthValue(val: string)

    getFifthUnit(): Unit
    setFifthUnit(unit: Unit)
}