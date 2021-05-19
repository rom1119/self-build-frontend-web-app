import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import HtmlAttrManager from '../HtmlAttrManager';
import HtmlTag from '../../../src/Layout/HtmlTag';
import TableCell from '../../../src/Layout/tag/Table/TableCell';


export default class ColspanAttrManager extends HtmlAttrManager<ColspanAttr>{

    protected value: TableCell = null

    protected createInitAttr(): ColspanAttr {
        return new ColspanAttr(1)
    }

    updateAttr(attr: ColspanAttr) {
        this.value.attributeAccessor.setNewWithValue(attr.key, attr.value)

        this.value.getTable().updateTableStructure()
        // attr.active = true
        this.value.synchronize()

    }
}
