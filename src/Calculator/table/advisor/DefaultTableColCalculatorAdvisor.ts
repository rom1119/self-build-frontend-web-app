import TableColCalculatorAdvisor from "~/src/Calculator/TableColCalculatorAdvisor";
import TableColumnCalculator from "~/src/Calculator/TableColumnCalculator";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import UnitSize from "~/src/Unit/UnitSize";
import Pixel from "~/src/Unit/Size/Pixel";
import ColPxCalculator from "~/src/Calculator/table/calculator/ColPxCalculator";

export default class DefaultTableColCalculatorAdvisor implements TableColCalculatorAdvisor{

    advise(column: TableColumnEl, tableWidthUnit: UnitSize): TableColumnCalculator {
        // var widthUnit: UnitSize = column.width
        //
        // if (tableWidthUnit instanceof Pixel) {
        //     return new ColPxCalculator()
        // }

        throw Error('Unable to create TableColumnCalculator for column index ' + column.index + ' and table unit ' + tableWidthUnit.name)
    }



}
