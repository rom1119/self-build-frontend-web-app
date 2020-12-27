import TableColumnCalculator from "~/src/Calculator/TableColumnCalculator";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import UnitSize from "~/src/Unit/UnitSize";


export default class ColPxCalculator implements TableColumnCalculator
{
    protected usedWidthByColumnsCalculator


    calculate(tableWidth: number, column: TableColumnEl) {

        var width: UnitSize = column.getWidthValue()

        return

    }

}
