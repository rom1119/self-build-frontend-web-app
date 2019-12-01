export default interface AxisPositionDetector
{
    computedVal(): number
    initPosition(val: number)
    initSize(val: number)
    setAxisPosition(val: number)

}