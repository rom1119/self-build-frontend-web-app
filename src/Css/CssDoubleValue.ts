import Unit from '../Unit/Unit';
export default interface CssDoubleValue 
{
    getSecondValue(): string
    setSecondValue(val: string)

    getSecondUnit(): Unit
    setSecondUnit(unit: Unit)
}