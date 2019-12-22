export default interface AxisMoveDetector
{
    computedVal(): number
    initElPosition(val: number)
    initMousePosition(val: number)
    setAxisPosition(val: number)

}