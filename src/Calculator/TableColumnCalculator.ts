import TableElement from "~/src/Layout/tag/Table/elements/TableElement";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";


export default interface TableColumnCalculator
{

    calculate(tableWidth : number, currentColWidth: number, freeSpace: number)
}
