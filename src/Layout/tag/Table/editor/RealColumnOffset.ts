import TableRowEl from '../elements/TableRowEl';
import TableCell from '../TableCell';
export default class RealColumnOffset {

    countElementsFrom(row: TableRowEl, colsTotal): number {

        var realCapacityCols = -1
        var realOffsetCols = 0

        var rowChildrenLength = row.children.length
        for (var i = 0; i < rowChildrenLength; i++) {
            var cell = row.children[i]
            // console.log('REAL OFFSET');
            // console.log('row INDEX', cell.rowIndex);
            // console.log('key', i);
            // console.log('row.children.length', row.children.length);
            if (realCapacityCols === colsTotal - 1) {
                break
            }
            realCapacityCols++

            if (cell.colspanAttrVal < 2) {
                // console.log('BREAaaaaK');
                continue
            }

            var maxColspan = colsTotal - Number(i)
            var realColspan = cell.colspanAttrVal
            if (cell.colspanAttrVal > maxColspan) {
                realColspan = maxColspan
            }
            // console.log('cell.colspanAttrVal', cell.colspanAttrVal);
            // console.log('maxColspan', maxColspan);
            // console.log('realCapacityCols', realCapacityCols);
            // console.log('realOffsetCols', realOffsetCols);
            
            realOffsetCols += realColspan - 1
            realCapacityCols += realColspan - 1


            // console.log('realCapacityCols 2', realCapacityCols);
            // console.log('realOffsetCols 2', realOffsetCols);
            // console.log('currColINDEX', currColINDEX);

        }



        return realOffsetCols
    }

    offsetFor(cell: TableCell, colsTotal): number {
        var realOffsetCols = 0


        return realOffsetCols
    }
}