import Unit from "./Unit";

export default class UnitUrl extends Unit {

    public static PROP_NAME = 'url-unit'

    protected _name: string = UnitUrl.PROP_NAME
    protected _label: string = 'vw'

    public getValue(val: any): string {
        var newVal = `url(${val})`

        return newVal

    }


}