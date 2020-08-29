import Unit from "./Unit";

export default class UnitTurn extends Unit {

    public static PROP_NAME = 'turn-unit'

    protected _name: string = UnitTurn.PROP_NAME
    protected _label: string = 'turn'

    public getValue(val: any): string {
        var newVal = `${val}turn`

        return newVal

    }


}