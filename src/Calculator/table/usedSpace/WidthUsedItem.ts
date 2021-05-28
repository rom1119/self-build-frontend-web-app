import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";

export default class WidthUsedItem {
    protected size: number = 0

    get value() {
        return this.size
    }
    
    set value(arg) {
        this.size = arg
    }

}
