import Unit from "./Unit";

export default class UnitDeg extends Unit {

    public static PROP_NAME = 'deg-unit'

    protected _name: string = UnitDeg.PROP_NAME
    protected _label: string = 'deg'

    public getValue(val: any): string {
        var newVal = `${val}deg`

        return newVal

    }


}