import UnitColor from '../UnitColor';
interface ParamsRGBA {
    r, g, b, a
}
export default class RGBA extends UnitColor {
    

    protected _name: string = 'rgba'
    private r
    private g
    private b
    private a

    constructor()
    {
        super()
    }

   
    public getValue(val): string {
        let red = val.r
        let green = val.g
        let blue = val.b
        let alpha = val.a
        var stringRgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`

        return stringRgbaColor
    }
    
}