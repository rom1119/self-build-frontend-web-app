import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import TableColumnEl from '../../elements/TableColumnEl';
import TableRowEl from '../../elements/TableRowEl';
import TableTd from '../../TableTd';
import TableTh from '../../TableTh';
import Width from '../../../../../Css/Size/Width';
import Height from '../../../../../Css/Size/Height';


export default class NotFullRowEditor implements TableEditor{



    editTable(tableTag: TableTag) {
        this.updateRows(tableTag)
    }

    protected updateRows(tableTag: TableTag) {
        var rows = tableTag.rows
        var cols = tableTag.columns

        if (rows.length < 2) {
            return
        }
        type rowIndexWithAmountCell = { rowIndex: number, amontCellsInRow: number, row: TableRowEl }
        var rowIndexWhereNotFullRow: rowIndexWithAmountCell[] = []
        var maxColsInRow = 0
        for (var i = 0; i < rows.length; i++) {
            // throw new Error('ASDASD')
                
            var row = rows[i]
            if (row.tr.children.length > maxColsInRow) {
                maxColsInRow = row.tr.children.length
            }
            rowIndexWhereNotFullRow.push({
                rowIndex: i,
                amontCellsInRow: row.tr.children.length,
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
                while (el.row.tr.allChildren.length < maxColsInRow) {
                    // console.log('while');
                    // console.log('el.index',el.rowIndex);
                    // console.log('el.row.tr.allChildren.length',el.row.tr.allChildren.length);
                    var col = tableTag.columns[el.row.tr.allChildren.length]
                    var cell = this.createNotVisibleCells(el.row, col)
                    el.row.tr.appendHiddenChild(cell)
                    el.row.hiddenChildren.push(cell)
                    col.hiddenChildren.push(cell)
                    // console.log('col.hiddenChildren.length',col.hiddenChildren.length);
                    // console.log('col.allChildren.length',col.allChildren.length);
 
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

        

        var width = col.width
        var widthUnit = col.getWithUnit()
        
        var height = row.height
        var heightUnit = row.getHeightUnit()

        // console.log('createNotVisibleCells');
        // console.log(rowIndex);
        // console.log(width);
        // console.log(widthUnit);
        

        var widthCss = new Width(width, widthUnit)
        var heightCss = new Height(height, heightUnit)

        cell.updateCssPropertyWithoutModel(widthCss.getName(), widthCss)
        cell.updateCssPropertyWithoutModel(heightCss.getName(), heightCss)


        return cell


    }


}



