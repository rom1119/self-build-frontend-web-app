import TableCell from "../../TableCell";
import TableTag from "../../TableTag";
import TableEditor from "../TableEditor";
import TableColumnEl from '../../elements/TableColumnEl';


export default class ColspanEditor implements TableEditor{



     editTable(tableTag: TableTag) {
          this.updateColspans(tableTag.columns)
     }

     protected updateColspans(cols: TableColumnEl[]) {
          for (const col of cols) {
               for (const cell of col.children) {
                    if (cell.colspanAttr) {

                    }
               }
          }
     }


}



