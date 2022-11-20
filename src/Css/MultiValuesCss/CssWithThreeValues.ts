import Unit from '../../Unit/Unit';
import CssWithTwoValues from './CssWithTwoValues';
export default interface CssWithThreeValues extends CssWithTwoValues {
    getThirdValue(): string
    setThirdValue(val: string)

    getThirdUnit(): Unit
    setThirdUnit(unit: Unit)
}