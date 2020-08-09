import Unit from "./Unit";

export default class UnitSecond extends Unit {

    public static PROP_NAME = 'second-unit'

    protected _name: string = UnitSecond.PROP_NAME
    protected _label: string = 'vw'

    public getValue(val: any): string {
        var newVal = `${val}s`

        return newVal

    }


}