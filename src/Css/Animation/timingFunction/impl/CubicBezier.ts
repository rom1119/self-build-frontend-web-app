import TimingFunction from "../TimingFunction";

export default class CubicBezier implements TimingFunction {
    public static PROP_NAME = 'cubic-bezier'

    x1: number = 0
    y1: number = 0
    x2: number = 0
    y2: number = 0

    getValue() : string {
        return `cubic-bezier(${this.x1}, ${this.y1}, ${this.x2}, ${this.y2})`
    }

    public static CREATE_FROM_VAL(val: string): CubicBezier
    {
        var o = new this()
        var params = val.substring(val.indexOf('('))
        params = params.replace('(', '')
        params = params.replace(')', '')
        var paramsArr = params.split(',')
        o.x1 = Number(paramsArr[0].trim())
        o.y1 = Number(paramsArr[1].trim())
        o.x2 = Number(paramsArr[2].trim())
        o.y2 = Number(paramsArr[3].trim())

        console.log(params);
        console.log(paramsArr);


        return o
    }
    
}