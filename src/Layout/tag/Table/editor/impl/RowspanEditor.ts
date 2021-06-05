import TableColumnEl from "../../elements/TableColumnEl";
import TableRowEl from "../../elements/TableRowEl";
import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import RowspanContainer from '../../RowspanContainer';
import RowspanItem from '../../RowspanItem';
import TableContainer from '../../TableContainer';
import TableTr from '../../TableTr';


export default class RowspanEditor implements TableEditor{

     // protected cellRemover: TableCellRemoverForColspanEditor

     protected columns: TableColumnEl[]
     protected rows: TableRowEl[]
 
     protected table: TableTag
 
     constructor(tab: TableTag) {
     //     this.cellRemover = new TableCellRemoverForColspanEditor(tab.rows, tab.api)
     }
 
 
     editTable(tableTag: TableTag) {
         // this.updateRows(tableTag)
         // return
         // console.trace('PL');
         this.columns = tableTag.columns
         this.rows = tableTag.rows
         this.table = tableTag
         var rowsLength = tableTag.rows.length
         for (var i = 0; i < rowsLength ; i++) {
             break
            }
            var row = tableTag.rows[1]
            this.updateRow()
     }

     protected updateRow() {
         type tableRowspanStruct = {
            tr: TableTr,
            startRowIndex: number,
            rowspanItems: RowspanItem[]
            
         }
         
         type RowspanItem = {
            startRowIndex: number,
            startColIndex: number,
            cells: {[rowIndex: number]: RowspanCell},
            rowspan: number,
        }
        type RowspanCell = {
            rowIndex: number,
            rowspan: number,
            cell: TableCell[],
        }
         
        // var res = row.children.length
        // var colsTotal = row.amountCellsInRow
        
        var structRowspanList: tableRowspanStruct[] = []
        var structRowspan: tableRowspanStruct
        var parent: TableContainer = null
         var rowspanVal = 0
         this.checkAllTableCells((tr: TableTr, parentArg: TableContainer) => {
            
             if (parentArg != parent && parent != null) {
                structRowspanList.push(structRowspan)
                structRowspan = null
             }

             var rowIndex = tr.rowElement.index

             parent = parentArg
             if (rowspanVal > 0) {
                rowspanVal--
             }
             if (!structRowspan) {
                structRowspan = {
                    tr: null,
                    startRowIndex: rowIndex,
                    rowspanItems: []
                }
                
            }
             
             var rowspanItem: RowspanItem = {
                startRowIndex: rowIndex,
                startColIndex: 0,
                cells: {},
                rowspan: 0,
            }
            for (var i = 0; i < tr.children.length; i++) {
                var cell = tr.children[i]

                
                if (cell.rowspanAttrVal > 1 && (cell.rowspanAttrVal - 1 > rowspanVal)) {
                    rowspanVal = cell.rowspanAttrVal - 1
                    rowspanItem.rowspan = cell.rowspanAttrVal
                    
                }

                // if () {
                //     structRowspan.rowspanItems.push()
                // }
            }
             
            if (rowspanVal == 0) {
                structRowspan.tr = tr
            }
            if (rowspanVal == 0) {
                structRowspanList.push(structRowspan)
                structRowspan = null
            }
             
             
        })
        
         
        
  
          // console.log('%c updateRow RowspanEditor', 'background: red;');

        //   var rowChildrenLength = row.children.length
        //   for (var i = 0; i < rowChildrenLength ; i++) {
        //       var cell = row.children[i]
        //       // console.log('key', i);
        //       // console.log('row.children.length', row.children.length);
        //     //   cell.containColumns = []
        //       // if (currColINDEX === colsTotal - 1) {
        //           // console.log('BREAK');
                  
        //           // break
        //       // }

        //       // console.log('cell.colspanAttr', cell.colspanAttr);
              

        //   }
         
         
          var rowspanContainer = new RowspanContainer()

          var rowspanItem = new RowspanItem()
 
          var tr = new TableTr()
          tr.parent = parent
          tr.children.push(this.rows[0].children[0])
          tr.rowElement = this.rows[0]
          tr.containRows.push(this.rows[1])
          tr.containRows.push(this.rows[2])
          
          var trTT = new TableTr()
          trTT.parent = parent
          trTT.rowElement = this.rows[3]
          trTT.children.push(this.rows[3].children[0])
          trTT.children.push(this.rows[3].children[1])
 
          rowspanItem.children.push(tr)
          rowspanItem.children.push(trTT)
 
          rowspanContainer.children.push(rowspanItem)
 
          parent.tableChildren.push(rowspanContainer)
          // console.log('cols 2', this.tabel.columns);
  
  
        //   row.children = newChildrenList
        //   row.tr.children = newChildrenList
     }
    
    protected createConteinersWithPortionItems(arg: Function) {

    }

    protected checkAllTableCells(arg: Function)
    {
        if (this.table.hasTrChild()) {
            var childrenLen = this.table.children.length
            for (var m = 0; m < childrenLen; m++) {
                var tr: TableTr = <TableTr>this.table.children[m]

                // var row = new TableRowEl(this, m)
                // row.tr = tr
                var globalColIndex = 0

                arg(tr, this.table)
                

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
                    arg(tr, cont)

                    var globalColIndex = 0

                    // for (var i = 0; i < tr.children.length; i++) {
                    //     var cell = tr.children[i]

                        
                        
                    //     globalColIndex++

                    // }

                }
            }
        }
    }


}
