import TableRowEl from '../elements/TableRowEl';
import TableCell from '../TableCell';
import TableTag from '../TableTag';
import TableTr from '../TableTr';
import TableContainer from '../TableContainer';

type BusyMap = {
    [parentUUID: string]: {
        [rowIndex: number]: RowBusy
    },
}

type RowBusy = {
    [colIndex: number]: {offsetByRowspan: number}
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

                    if (!this.map[parentId]) {
                        this.map[parentId] = {
    
                        }
                    }
                    if (!this.map[parentId][currRow]) {
                        this.map[parentId][currRow] = {
    
                        }
                    }
                    while (colIndexCp < lenghtColsInRow) {
                        if (!this.map[parentId][currRow][colIndexCp]) {
                            this.map[parentId][currRow][colIndexCp] = {
                                offsetByRowspan: 0
                            }
    
                        }
                        this.map[parentId][currRow][colIndexCp].offsetByRowspan += offset
                        colIndexCp++
                    }
                    currRow++
                    
                }

            }
            
        })
        



        return realOffsetCols
    }

    offsetForCell(cell: TableCell): number {
        var parent = cell.parent.parent

        if (!this.map[parent.uuid]) {
            return 0
        }
        
        if (!this.map[parent.uuid][cell.rowElement.index]) {
            return 0
        }
        
        if (!this.map[parent.uuid][cell.rowElement.index][cell.columnElement.index]) {
            return 0
        }


        return Number(this.map[parent.uuid][cell.rowElement.index][cell.columnElement.index].offsetByRowspan)
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

        for (const colIdx in this.map[parent.uuid][row.index]) {
            if (Object.prototype.hasOwnProperty.call(this.map[parent.uuid][row.index], colIdx)) {
                const element = this.map[parent.uuid][row.index][colIdx];
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
                    var colIndex = cell.colIndex
                    
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
                        var colIndex = cell.colIndex
                    
                        arg(cell, colIndex, cont)
                        
                        
                        globalColIndex++

                    }

                }
            }
        }
    }
}