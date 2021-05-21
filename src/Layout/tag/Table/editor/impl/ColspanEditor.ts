import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import TableColumnEl from '../../elements/TableColumnEl';
import TableRowEl from '../../elements/TableRowEl';
import TableCellRemoverForColspanEditor from '../../../../../Remover/impl/TableCellRemoverForColspanEditor';


export default class ColspanEditor implements TableEditor{

    protected cellRemover: TableCellRemoverForColspanEditor

    protected columns: TableColumnEl[]

    constructor(tab: TableTag) {
        this.cellRemover = new TableCellRemoverForColspanEditor(tab.rows, tab.api)
    }


    editTable(tableTag: TableTag) {
        // this.updateRows(tableTag)
        // return
        // console.trace('PL');
        this.columns = tableTag.columns
        for (const row of tableTag.rows) {
            this.updateRow(row)
        }
    }

    protected updateRow(row: TableRowEl) {
        var res = row.children.length
        var colsTotal = this.columns.length

        var toRemoveAmount = 0
        var currColINDEX = -1
        var newChildrenList = []

        // console.log('%c updateRow ColspanEditor', 'background: red;');
        // console.log('row.children', row.tr.children);
        // console.log('colsTotal', colsTotal);
        var rowChildrenLength = row.children.length
        for (var i = 0; i < rowChildrenLength ; i++) {
            var cell = row.children[i]
            // console.log('row INDEX', cell.rowIndex);
            // console.log('key', i);
            // console.log('row.children.length', row.children.length);
            cell.containColumns = []
            if (currColINDEX === colsTotal - 1) {
                // console.log('BREAK');
                
                break
            }
            currColINDEX++
            // console.log('cell.colspanAttrVal', cell.colspanAttrVal);
            // console.log('cell.colspanAttr', cell.colspanAttr);
            if (cell.colspanAttrVal < 2) {
                newChildrenList.push(cell)
                // console.log('BREAaaaaK');
                continue
            }

            var maxColspan = colsTotal - Number(currColINDEX)
            var realColspan = cell.colspanAttrVal
            if (cell.colspanAttrVal > maxColspan) {
                realColspan = maxColspan 
            }
            // console.log('cell.colspanAttrVal', cell.colspanAttrVal);
            console.log('maxColspan', maxColspan);
            console.log('currColINDEX', currColINDEX);
            console.log('realColspan', realColspan);
            
            
            currColINDEX += realColspan - 1
            console.log('currColINDEX 22', currColINDEX);

            toRemoveAmount += realColspan - 1

            var newColWithColspan = this.modifyCellWithColspan(cell, realColspan, i + 1)

            newChildrenList.push(newColWithColspan)
        }

        // console.log('newChildrenList', newChildrenList);
        // console.log('toRemoveAmount', toRemoveAmount);
        // console.log('removed', row.children.sli);
        if (currColINDEX > colsTotal) {
            var elsToRemove = row.children.slice(row.children.length - toRemoveAmount)
            // console.log('elsToRemove', elsToRemove);
    
            for (const rem of elsToRemove) {
                this.cellRemover.remove(rem)
            }

        }
        

        row.children = newChildrenList
        row.tr.children = newChildrenList
    }
    protected modifyCellWithColspan(cell: TableCell, realColspan: number, currColINDEX: number): TableCell {
        var colToAdd: TableColumnEl[] = []

        colToAdd = this.columns.slice(currColINDEX, currColINDEX +  realColspan - 1)
        console.log('modifyCellWithColspan');
        console.log('currColINDEX', currColINDEX);
        console.log('realColspan', realColspan);
        console.log('cell.rowIndex', cell.rowIndex);
        console.log(colToAdd);
        
        for (const col of colToAdd) {
            // console.log('cellWithRowIndex', cellWithRowIndex);
            console.log('col.children', col.children);
            // if (cellWithRowIndex) {
                
            // }
            this.moveCellFromColumnIndexToOffset(currColINDEX, cell.rowIndex, realColspan)
            col.addCellChild(cell)
            // console.log(col.getHtmlEl());
            
        }
        
        cell.containColumns = colToAdd

        return cell
    }

    protected moveCellFromColumnIndexToOffset(colIdx: number, cellRowIndex: number, realColspan) {
        var step = realColspan - 1
        var currIndex = this.columns.length - 1
        console.log('moveCellFromColumnIndexToOffset');
        
        while (currIndex >= colIdx) {
            // console.log('while');
            var col: TableColumnEl = this.columns[currIndex]
            currIndex --
            var cellWithRowIndex = col.getCellByRowIndex(cellRowIndex)
            if (!cellWithRowIndex) {
                continue
            }
            var newIndexCol = cellWithRowIndex.colIndex + step
            var cellToMove = col.getChildByIDAndRemove(cellWithRowIndex.uuid)

            if (newIndexCol <= this.columns.length - 1) {
                cellToMove.colIndex = newIndexCol
                cellToMove.columnElement = this.columns[newIndexCol]
                this.columns[newIndexCol].replaceChildInRow(cellToMove)
                 
            }

            
        }

    }


}



