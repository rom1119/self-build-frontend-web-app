import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import RowspanAttr from '~/src/Attribute/html/RowspanAttr';
import HtmlAttrManager from '../HtmlAttrManager';
import TableCell from '../../../src/Layout/tag/Table/TableCell';


export default class RowspanAttrManager extends HtmlAttrManager<RowspanAttr>{

    protected value: TableCell = null

    protected createInitAttr(): RowspanAttr {
        return new RowspanAttr(1)
    }

    deactivateAttr(attr: ColspanAttr) {
        
        this.value.attributeAccessor.removeByName(attr.key)

        attr.active = false

        this.value.getTable().updateTableStructure()
        this.value.getTable().updateRealView()

        this.value.synchronize()
    }

    activateAttr(attr: ColspanAttr) {

        this.value.attributeAccessor.addNewAttribute(attr)

        attr.active = true

        this.value.getTable().updateTableStructure()
        this.value.getTable().updateRealView()

        this.value.synchronize()
    }

    updateAttr(attr: ColspanAttr) {
        this.value.attributeAccessor.setNewWithValue(attr.key, attr.value)

        this.value.getTable().updateTableStructure()
        this.value.getTable().updateRealView()
        // attr.active = true
        this.value.synchronize()

    }
}
