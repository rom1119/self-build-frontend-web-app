import TableRowEl from '../elements/TableRowEl';
import TableCell from '../TableCell';
import TableTag from '../TableTag';
import TableTr from '../TableTr';
import TableContainer from '../TableContainer';
import TableColumnEl from '../elements/TableColumnEl';

type BusyMap = {
    [parentUUID: string]: RowBusy[]
        
}

type RowBusy = {
    xShift: number,
    cols: ColBusy[]

}

type ColBusy = 
    {
        offsetByRowspan: number,
        colIdx: number,
    }

export default class BusyCellPlaceByRowspan {

    public map: BusyMap = {}
    protected table: TableTag

    constructor(tab: TableTag) {
        this.table = tab
    }
    
    buildBusyMap(): number {

        var realCapacityCols = -1
        var realOffsetCols = 0
        this.map = {}

        this.checkAllTableCells((cell: TableCell, colIndex: number, parentArg: TableContainer) => {
            var lenghtColsInRow = cell.parent.children.length
            if (cell.rowspanAttrVal > 1) {
                var offset = 1
                var rowsLengthInParent = parentArg.children.length
                var parentId = parentArg.uuid
                if (cell.colspanAttrVal > 1) {
                    offset = cell.colspanAttrVal
                }
                

                var rowEnd = cell.rowElement.index + cell.rowspanAttrVal - 1
                // console.log('cell.rowIndex', cell.rowIndex);
                // console.log('cell.rowspanAttrVal', cell.rowspanAttrVal);
                // console.log('rowEnd', rowEnd);
                // console.log('currRow', currRow);

                if (rowEnd > rowsLengthInParent - 1) {
                    rowEnd = rowsLengthInParent - 1
                }
                
                
                var currRow = cell.rowElement.index + 1
                while (currRow <= rowEnd) {
                    var colIndexCp = colIndex
                    var xShift = 0
                    if (!this.map[parentId]) {
                        this.map[parentId] = []
                    }
                    if (!this.map[parentId][currRow]) {
                        this.map[parentId][currRow] = {xShift: 0, cols: []}
                        // colIndexCp --
                        
                    } else {
                        this.map[parentId][currRow].xShift ++
                        var l = this.map[parentId][currRow].cols.length
                        // colIndexCp -= this.map[parentId][currRow][l - 1].offsetByRowspan + 1
                        colIndexCp -= this.map[parentId][currRow].xShift
                    }
                    // if (this.map[parentId][currRow]) {
                    // }
                    while (colIndexCp < lenghtColsInRow) {
                        if (!this.map[parentId][currRow].cols[colIndexCp]) {
                            this.map[parentId][currRow].cols[colIndexCp] = {
                                offsetByRowspan: 0,
                                colIdx: null,
                            }
    
                        }
                        this.map[parentId][currRow].cols[colIndexCp].offsetByRowspan += offset
                        this.map[parentId][currRow].cols[colIndexCp].colIdx = colIndexCp
                        colIndexCp++
                    }
                    currRow++
                    
                }

            }
            
        })
        



        return realOffsetCols
    }

    public moveCellsWhereRowspanPlace() {
        if (this.table.hasTrChild()) {
            var mapRowsWithOffset = this.map[this.table.uuid]
            for (const rowIdx in mapRowsWithOffset) {
                if (Object.prototype.hasOwnProperty.call(mapRowsWithOffset, rowIdx)) {
                    const rowCells = mapRowsWithOffset[rowIdx];
                    
                    this.moveFullRowOfCells(rowCells, rowIdx)
                    
                }
            }
        } else {
            for (const parentID in this.map) {
                if (Object.prototype.hasOwnProperty.call(this.map, parentID)) {
                    const element = this.map[parentID];
                    var mapRowsWithOffset = this.map[parentID]

                    for (const child of this.table.children) {
                        if (child.uuid === parentID) {
                            for (const rowIdx in mapRowsWithOffset) {
                                if (Object.prototype.hasOwnProperty.call(mapRowsWithOffset, rowIdx)) {
                                    const rowCells = mapRowsWithOffset[rowIdx];
                                    
                                    this.moveFullRowOfCells(rowCells, rowIdx, child)
                                    
                                }
                            }

                        }
                    }
                    
                }
            }
            
        }
    }

    protected moveFullRowOfCells(cellsarg: RowBusy, rowIdx, parent?: TableContainer) {

        console.log('%c rowIdx', rowIdx, 'background: red;');
        // console.log('parent', parent.getDomainTagName());
        console.log('cells', cellsarg);
        var cells = cellsarg.cols.reverse()
        // console.log('cells', cells);
        for (let i = 0; i < cells.length; i++) {
            const element = cells[i];
            if (!element) {
                continue
            }
            var colIdx = element.colIdx
                  
            // if (Object.prototype.hasOwnProperty.call(cells, colIdx)) {
                // const element = cells[colIdx];
                // console.log('element', element);
                
                var col: TableColumnEl = this.table.columns[colIdx]
                var cellWithRowIndex
                if (parent) {
                    cellWithRowIndex = parent.getCellByRowIndexAndColIdx(rowIdx, Number(colIdx))
                } else {
                    cellWithRowIndex = col.getCellByRowIndex(rowIdx)
                    
                }
                // console.log('cellWithRowIndex', cellWithRowIndex);
                // console.log('cellWithRowIndex', cellWithRowIndex);
                if (!cellWithRowIndex) {
                    continue
                }
                console.log('cellWithRowIndex EL', cellWithRowIndex.getHtmlEl());
                var realOffsetByRowspan = element.offsetByRowspan

                console.log('cellWithRowIndex.colIndex', cellWithRowIndex.colIndex);
                var newIndexCol = cellWithRowIndex.colIndex + realOffsetByRowspan
                // console.log('COL.CHILDREN.LEN BEFORE', col.children.length);
                
                var cellToMove = col.getChildByIDAndRemove(cellWithRowIndex.uuid)
                
                
                if (newIndexCol <= this.table.columns.length - 1) {
                    // console.log(' NEW COL.CHILDREN.LEN BEFORE', this.columns[newIndexCol].children.length);
                    cellToMove.colIndex = newIndexCol
                    console.log('cellWithRowIndex.colIndex NEW', cellToMove.colIndex);
                    cellToMove.columnElement = this.table.columns[newIndexCol]
                    this.table.columns[newIndexCol].replaceChildInRow(cellToMove)
                    // console.log(' NEW COL.CHILDREN.LEN AFTER', this.columns[newIndexCol].children.length);
                    
                }
            // }
        }
    }

    offsetForCell(cell: TableCell): number {
        var parent = cell.parent.parent

        if (!this.map[parent.uuid]) {
            return 0
        }
        
        if (!this.map[parent.uuid][cell.rowElement.index]) {
            return 0
        }
        
        if (!this.map[parent.uuid][cell.rowElement.index].cols[cell.columnElement.index]) {
            return 0
        }


        return Number(this.map[parent.uuid][cell.rowElement.index].cols[cell.columnElement.index].offsetByRowspan)
    }
    
    offsetForRow(row: TableRowEl): number {
        var parent = row.tr.parent

        if (!this.map[parent.uuid]) {
            return 0
        }
        
        if (!this.map[parent.uuid][row.index]) {
            return 0
        }
        
        var maxOffset = 0

        for (const colIdx in this.map[parent.uuid][row.index].cols) {
            if (Object.prototype.hasOwnProperty.call(this.map[parent.uuid][row.index].cols, colIdx)) {
                const element = this.map[parent.uuid][row.index].cols[colIdx];
                if (element.offsetByRowspan > maxOffset) {
                    maxOffset = element.offsetByRowspan
                }
            }
        }

        return maxOffset
    }

    protected checkAllTableCells(arg: Function)
    {
        
        if (this.table.hasTrChild()) {
            var childrenLen = this.table.children.length
            for (var m = 0; m < childrenLen; m++) {
                var tr: TableTr = <TableTr>this.table.children[m]

                for (var i = 0; i < tr.children.length; i++) {
                    var cell = tr.children[i]
                    var colIndex = cell.columnElement.index
                    
                    arg(cell, colIndex, this.table)


                    globalColIndex++

                }
                

                // newRows.push(row)
            }
        } else {
            // console.log('NO hasTrChild')

            var childrenLen = this.table.children.length
            for (var s = 0; s < childrenLen; s++) {
                var cont = this.table.children[s]
                // console.log('cont', cont)

                var childrenChildLen = cont.children.length
                for (var m = 0; m < childrenChildLen; m++) {

                    var tr: TableTr = <TableTr>cont.children[m]
                    // console.log('tr', tr)

                    var globalColIndex = 0

                    for (var i = 0; i < tr.children.length; i++) {
                        var cell = tr.children[i]
                        var colIndex = cell.columnElement.index
                    
                        arg(cell, colIndex, cont)
                        
                        
                        globalColIndex++

                    }

                }
            }
        }
    }
}