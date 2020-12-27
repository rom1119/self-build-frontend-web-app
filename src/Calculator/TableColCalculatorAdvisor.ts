import TableColumnCalculator from "~/src/Calculator/TableColumnCalculator";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import UnitSize from "~/src/Unit/UnitSize";

export default interface TableColCalculatorAdvisor
{
    advise(column: TableColumnEl, tableWidthUnit: UnitSize): TableColumnCalculator
}
