import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import WidthUsedItem from './WidthUsedItem';
import CssValue from '../../../Css/CssValue';

export default class WidthUsed {
    items: WidthUsedItem[] = []



    get value() {
        var val = ''
        this.items.forEach((element, key) => {
            val += element.va
            if (key < this.values.length - 1) {
                val += ', '
            }
        });
        
        return val
    }

}
