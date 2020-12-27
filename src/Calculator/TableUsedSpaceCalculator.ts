import TableElement from "~/src/Layout/tag/Table/elements/TableElement";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";


export default interface TableUsedSpaceCalculator<T extends TableElement>
{

    calculate(excludedTableEl: T)
}
