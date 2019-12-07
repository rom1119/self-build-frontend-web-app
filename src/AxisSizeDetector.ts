export default interface AxisSizeDetector
{
    computedVal(): number
    initPosition(val: number)
    initSize(val: number)
    setAxisPosition(val: number)

}