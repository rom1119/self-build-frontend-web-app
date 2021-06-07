import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import TableColumnEl from '../../elements/TableColumnEl';
import TableRowEl from '../../elements/TableRowEl';
import TableTd from '../../TableTd';
import TableTh from '../../TableTh';
import Width from '../../../../../Css/Size/Width';
import Height from '../../../../../Css/Size/Height';
import RealColumnOffset from '../RealColumnOffset';
import BusyCellPlaceByRowspan from '../BusyCellPlaceByRowspan';


export default class NotFullRowEditor implements TableEditor{

    protected realOffsetColumns: RealColumnOffset
    protected busyCellPlaceByRowspan: BusyCellPlaceByRowspan

    constructor(busyCellPlaceByRowspan: BusyCellPlaceByRowspan) {
        this.realOffsetColumns =  new RealColumnOffset()
        this.busyCellPlaceByRowspan =  busyCellPlaceByRowspan
    }

    editTable(tableTag: TableTag) {
        this.updateRows(tableTag)
    }

    protected updateRows(tableTag: TableTag) {
        var rows = tableTag.rows
        var cols = tableTag.columns

        if (rows.length < 2) {
            return
        }
        type rowIndexWithAmountCell = { rowIndex: number, colOffset: number, amountCellsInRow: number, row: TableRowEl }
        var rowIndexWhereNotFullRow: rowIndexWithAmountCell[] = []
        var maxColsInRow = 0
        for (var i = 0; i < rows.length; i++) {
            // throw new Error('ASDASD')
            var row = rows[i]
            var realOffsetCols = this.realOffsetColumns.countElementsFrom(row, cols.length)
            var realOffsetByRowspan = this.busyCellPlaceByRowspan.offsetForRow(row)
            // console.log('REAL OFFSET', realOffsetCols);
            // console.log('REAL OFFSET Rowspan', realOffsetByRowspan);
            var amountCellsInRow = row.tr.children.length + realOffsetCols + realOffsetByRowspan
            if (amountCellsInRow > maxColsInRow) {
                maxColsInRow = amountCellsInRow
            }
            var newEl = {
                rowIndex: i,
                colOffset: realOffsetCols + realOffsetByRowspan,
                amountCellsInRow: amountCellsInRow,
                row: row,
            }
            rowIndexWhereNotFullRow.push(newEl)
            row.amountCellsInRow = newEl.amountCellsInRow
        }

        for (var i = 0; i < cols.length; i++) {
            var col = cols[i]
            col.hiddenChildren = []
        }
        // console.log('%c updateRows', 'background: blue;');
        // console.log(rowIndexWhereNotFullRow);
        // console.log(maxColsInRow);
        // return
        
        for (var i = 0; i < rowIndexWhereNotFullRow.length; i++) {
            var el = rowIndexWhereNotFullRow[i]
            // const rowIndex = rowIndexWhereNotFullRow[amontCellsInRow];
            el.row.tr.hiddenChildren = []
            el.row.hiddenChildren = []
            // console.log('FOR');
            // console.log('length', rowIndexWhereNotFullRow.length);
            // console.log('i', i);
            if (el.amountCellsInRow < maxColsInRow) {
                // var i = el.row.tr.allChildren.length - 1
                while (el.row.tr.allChildren.length < maxColsInRow - el.colOffset) {
                    // throw Error('asd')
                    // console.log('while not null');
                    // console.log('el.row.tr.allChildren.length', el.row.tr.allChildren.length);
                    // console.log('el', el);
                    // console.log('el', el.row.tr.shortUUID);
                    // // return
                    // console.log('el.index',el.rowIndex);
                    // console.log('el.row.tr.allChildren.length',el.row.tr.allChildren.length);
                    var col = tableTag.columns[el.row.tr.allChildren.length + el.colOffset]
                    if (!col) {
                        // console.log('!!');
                        return
                    }
                    var cell = this.createNotVisibleCells(el.row, col)
                    cell.rowIndex = el.rowIndex
                    cell.colIndex = col.index
                    // console.log('el.row.tr.allChildren.length', el.row.tr.allChildren.length);
                    
                    el.row.tr.appendHiddenChild(cell)
                    // console.log('el.row.tr.allChildren.length', el.row.tr.allChildren.length);
                    el.row.hiddenChildren.push(cell)
                    if (col) {
                        col.hiddenChildren.push(cell)
                        // console.log(col.children);
                        // console.log(col.hiddenChildren);
                        
                        cell.columnElement = col

                    }

                    cell.rowElement = el.row
                    // console.log('col.hiddenChildren.length',col.hiddenChildren.length);
                    // console.log('col.allChildren.length',col.allChildren.length);
                    // i++
                    // console.log('col.hiddenChildren.length',col.hiddenChildren.length);
                    // console.log('col.allChildren.length',col.allChildren.length);
                }
            }
            
        }
    }
    createNotVisibleCells(row: TableRowEl, col: TableColumnEl): TableCell {
        var cell: TableCell
        if (row.canAddThAsChild()) {
            cell = new TableTh()
        } else {
            cell = new TableTd()
        }

        cell.visibilityHidden = true
        cell.parent = row.tr

        var rowIndex = row.index

        
        var width, widthUnit

        if (col) {
            width = col.width
            widthUnit = col.getWithUnit()

        }
        
        var height = row.height
        var heightUnit = row.getHeightUnit()

        // console.log('createNotVisibleCells');
        // console.log(rowIndex);
        // console.log(width);
        // console.log(widthUnit);
        

        var widthCss = new Width(width, widthUnit)
        var heightCss = new Height(height, heightUnit)
        cell.setWidth(width)
        cell.setWidthUnit(widthUnit)
        cell.updateCssPropertyWithoutModel(widthCss.getName(), widthCss)
        cell.updateCssPropertyWithoutModel(heightCss.getName(), heightCss)


        return cell


    }


}



