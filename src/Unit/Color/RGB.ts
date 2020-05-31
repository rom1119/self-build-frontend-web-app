import UnitColor from '../UnitColor';
interface ParamsRGB {
    r, g, b
}
export default class RGB extends UnitColor {
    
    public static PROP_NAME = 'rgb-color-unit'
    protected _name: string = RGB.PROP_NAME
    protected _label: string = 'rgb'

    private r
    private g
    private b

    constructor()
    {
        super()
    }

   
    public getValue(val): string {
        let red = val.r
        let green = val.g
        let blue = val.b
        var stringRgbaColor = `rgb(${red}, ${green}, ${blue})`

        return stringRgbaColor
    }
    
}