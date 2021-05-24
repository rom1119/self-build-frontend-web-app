import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import TableColumnEl from '../../elements/TableColumnEl';
import TableRowEl from '../../elements/TableRowEl';
import TableCellRemoverForColspanEditor from '../../../../../Remover/impl/TableCellRemoverForColspanEditor';


export default class ColspanEditor implements TableEditor{

    protected cellRemover: TableCellRemoverForColspanEditor

    protected columns: TableColumnEl[]
    protected rows: TableRowEl[]

    protected tabel: TableTag

    constructor(tab: TableTag) {
        this.cellRemover = new TableCellRemoverForColspanEditor(tab.rows, tab.api)
    }


    editTable(tableTag: TableTag) {
        // this.updateRows(tableTag)
        // return
        // console.trace('PL');
        this.columns = tableTag.columns
        this.rows = tableTag.rows
        this.tabel = tableTag
        for (const row of tableTag.rows) {
            this.updateRow(row)
        }
    }

    protected updateRow(row: TableRowEl) {
        var res = row.children.length
        var colsTotal = row.amountCellsInRow

        var toRemoveAmount = 0
        var currColINDEX = -1
        var newChildrenList = []

        // console.log('%c updateRow ColspanEditor', 'background: red;');
        // // console.log('row.children', row.tr.children);
        // console.log('row INDEX', row.index);
        // console.log('colsTotal', colsTotal);
        var rowChildrenLength = row.children.length
        for (var i = 0; i < rowChildrenLength ; i++) {
            var cell = row.children[i]
            // console.log('key', i);
            // console.log('row.children.length', row.children.length);
            cell.containColumns = []
            // if (currColINDEX === colsTotal - 1) {
                // console.log('BREAK');
                
                // break
            // }
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
            // console.log('maxColspan', maxColspan);
            console.log('currColINDEX LOOP', currColINDEX);
            // console.log('realColspan', realColspan);
            
            
            currColINDEX += realColspan - 1
            // console.log('currColINDEX 22', currColINDEX);

            toRemoveAmount += realColspan - 1

            var newColWithColspan = this.modifyCellWithColspan(cell, realColspan, i + 1)

            newChildrenList.push(newColWithColspan)
        }

        // console.log('newChildrenList', newChildrenList);
        // console.log('toRemoveAmount', toRemoveAmount);
        // console.log('currColINDEX', currColINDEX);
        // console.log('row.children.length', row.children.length);
        // console.log('removed', row.children.sli);
        if (row.amountCellsInRow > row.children.length) {
            var sliceChildren = newChildrenList.splice(row.children.length - (row.amountCellsInRow - this.tabel.columns.length))
            // console.log('elsToRemove', toRemoveAmount);
            // console.log('sliceChildren', sliceChildren);
            var i = 0
            while (i < sliceChildren.length) {
                var col = this.tabel.columns[this.tabel.columns.length]
                if (!col) {
                    col = new TableColumnEl(this.tabel, this.tabel.columns.length)

                }
                var child = sliceChildren[i]
                child.colIndex = col.index
                
                col.addCellChild(child)
                
                this.tabel.columns.push(col)
                child.columnElement = col
                i++
            }
            
            newChildrenList = newChildrenList.concat(sliceChildren)

            // for (const rem of elsToRemove) {
            //     this.cellRemover.remove(rem)
            // }
        }

        // console.log('newChildrenList 2', newChildrenList);
        // console.log('cols 2', this.tabel.columns);


        row.children = newChildrenList
        row.tr.children = newChildrenList
    }
    protected modifyCellWithColspan(cell: TableCell, realColspan: number, currColINDEX: number): TableCell {
        var colToAdd: TableColumnEl[] = []

        colToAdd = this.columns.slice(currColINDEX, currColINDEX +  realColspan - 1)
        console.log('modifyCellWithColspan !!!!');
        // console.log('currColINDEX', currColINDEX);
        // console.log('realColspan', realColspan);
        // console.log('cell.rowIndex', cell.rowIndex);
        console.log(colToAdd);
        
        this.moveCellFromColumnIndexToOffset(currColINDEX, cell.rowIndex, realColspan)
        for (const col of colToAdd) {
            // console.log('cellWithRowIndex', cellWithRowIndex);
            // console.log('col.children', col.children);
            // if (cellWithRowIndex) {
                
            // }
            col.addCellChild(cell)
            // cell.columnElement = col
            // console.log(col.getHtmlEl());
            
        }
        console.log('cell.colIndex', cell.colIndex);
        cell.containColumns = colToAdd
        console.log('cell.containColumns', cell.containColumns);


        return cell
    }

    protected moveCellFromColumnIndexToOffset(colIdx: number, cellRowIndex: number, realColspan) {
        var step = realColspan - 1
        var currIndex = this.columns.length - 1
        // console.log('%c moveCellFromColumnIndexToOffset', 'background: aqua;');
        // console.log('colIdx', colIdx);
        // console.log('step', step);
        // console.log('cellRowIndex', cellRowIndex);
        // console.log('this.rows[cellRowIndex].amoun', this.rows[cellRowIndex].amountCellsInRow);
        if (this.rows[cellRowIndex].amountCellsInRow === this.columns.length) {
            // return 
        }
        
        while (currIndex >= colIdx) {
            // console.log('while');
            // console.log('currIndex', currIndex);
            var col: TableColumnEl = this.columns[currIndex]
            currIndex --
            var cellWithRowIndex = col.getCellByRowIndex(cellRowIndex)
            // console.log('cellWithRowIndex', cellWithRowIndex);
            if (!cellWithRowIndex) {
                continue
            }
            // console.log('cellWithRowIndex.colIndex', cellWithRowIndex.colIndex);
            var newIndexCol = cellWithRowIndex.colIndex + step
            var cellToMove = col.getChildByIDAndRemove(cellWithRowIndex.uuid)
            // console.log('newIndexCol', newIndexCol);
            // console.log('cellToMove', cellToMove);

            if (newIndexCol <= this.columns.length - 1) {
                cellToMove.colIndex = newIndexCol
                cellToMove.columnElement = this.columns[newIndexCol]
                this.columns[newIndexCol].replaceChildInRow(cellToMove)
                 
            }

            
        }

    }


}



