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


export default class NotFullRowEditor implements TableEditor{

    protected realOffsetColumns: RealColumnOffset

    constructor() {
        this.realOffsetColumns =  new RealColumnOffset()
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
        type rowIndexWithAmountCell = { rowIndex: number, colOffset: number, amontCellsInRow: number, row: TableRowEl }
        var rowIndexWhereNotFullRow: rowIndexWithAmountCell[] = []
        var maxColsInRow = 0
        for (var i = 0; i < rows.length; i++) {
            // throw new Error('ASDASD')
            var row = rows[i]
            var realOffsetCols = this.realOffsetColumns.countElementsFrom(row, cols.length)
            console.log('REAL OFFSET', realOffsetCols);
            
            if (row.tr.children.length > maxColsInRow) {
                maxColsInRow = row.tr.children.length
            }
            rowIndexWhereNotFullRow.push({
                rowIndex: i,
                colOffset: realOffsetCols,
                amontCellsInRow: row.tr.children.length + realOffsetCols,
                row: row,
            })
        }

        for (const col of cols) {
            col.hiddenChildren = []
        }
        // console.log('updateRows');
        // console.log(rowIndexWhereNotFullRow);
        // console.log(maxColsInRow);
        
        for (const el of rowIndexWhereNotFullRow) {
            // const rowIndex = rowIndexWhereNotFullRow[amontCellsInRow];
            el.row.tr.hiddenChildren = []
            el.row.hiddenChildren = []
            if (el.amontCellsInRow < maxColsInRow) {
                var i = el.row.tr.allChildren.length - 1
                while (el.row.tr.allChildren.length  < maxColsInRow - el.colOffset) {
                    // console.log('while');
                    // console.log('el.index',el.rowIndex);
                    // console.log('el.row.tr.allChildren.length',el.row.tr.allChildren.length);
                    var col = tableTag.columns[el.row.tr.allChildren.length + el.colOffset]
                    var cell = this.createNotVisibleCells(el.row, col)
                    cell.rowIndex = el.rowIndex
                    cell.colIndex = i + el.colOffset
                    
                    el.row.tr.appendHiddenChild(cell)
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
                    i++
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
        cell.setWidth(widthUnit)
        cell.updateCssPropertyWithoutModel(widthCss.getName(), widthCss)
        cell.updateCssPropertyWithoutModel(heightCss.getName(), heightCss)


        return cell


    }


}



