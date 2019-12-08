import Unit from "./Unit";

export default class UnitUrl extends Unit {
    public getValue(val: any): string {
        var newVal = `url(${val})`

        return newVal

    }


}