import Unit from '../../Unit/Unit';
export default interface CssWithTwoValues {
    getSecondValue(): string
    setSecondValue(val: string)

    getSecondUnit(): Unit
    setSecondUnit(unit: Unit)
}