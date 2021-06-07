import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import UnitSize from "~/src/Unit/UnitSize";
import TableTag from '../../../Layout/tag/Table/TableTag';
import ContentWidthPx from '../ContentWidthPx';
import TableRowEl from '../../../Layout/tag/Table/elements/TableRowEl';
import ContentHeightPx from '../ContentHeightPx';

class RowHeight {

    percentValueOfTabel: number
    percentValueOfAlRows: number
    pixelValue: number
    row: TableRowEl
}

export default class TabelRowsCalculator
{
    protected tabelContent: ContentHeightPx
    protected tabel: TableTag
    protected _rowTotalSize: number
    protected tabelHeight: number

    constructor(tabel: TableTag) {
        this.tabel = tabel
        this.tabelContent = new ContentHeightPx(tabel)
    }


    get calculated() {
        // console.log('ROW calculate START');
        // console.time()
        if (!this.tabel.getHtmlElHidden()) {
            return 0
        }
        
        
        this.tabelHeight = this.tabelContent.contentSizePx
        var colSizes = this.rowSizes
        var columns = this.tabel.rows
        var columnTotalWidth = this._rowTotalSize
        // console.log('tabelHeight', this.tabelHeight);
        // console.log('columnTotalHeight', columnTotalWidth);
        
        if (!this.tabelHeight) {
            this.setNormalWidthColumn(colSizes)
            return 1
        }
        
        // console.log('this.tabelHeight', this.tabelHeight);
        // console.log('this._rowTotalSize', this._rowTotalSize);
        // console.log(this.tabelHeight < this._rowTotalSize);

        if (this.tabelHeight < this._rowTotalSize) {
            if (this.tabel.heightIsInjectable) {
                this.tabel.heightIsInjectable = false

            }

            this.setNormalWidthColumn(colSizes)
            return 3
        }

        this.tabel.heightIsInjectable = true
        
        this.calculateWidthColumns(colSizes, this.tabelHeight)
        // var width: UnitSize = column.getWidthValue()
        // console.timeEnd()
        // console.log('ROW calculate END ');

        return 2

    }

    protected calculateWidthColumns(arg: RowHeight[], tabelHeight) {
        // console.log('calculateWidthColumns');
        
        var colLenth = arg.length
        for (var i = 0; i < colLenth; i++) {
            var el = arg[i]
            var widthFromTag = el.row.height
            var widthUnitFromTag = el.row.heightUnit
            var width = el.pixelValue

            // var el = new ColumnWidth()
            el.percentValueOfAlRows = el.pixelValue / this._rowTotalSize * 100
            // console.log(el);
            
            var newVal = el.percentValueOfAlRows * tabelHeight / 100
            // console.log(newVal);
            
            el.row.heightToRealInject = this.roundUp(newVal)
            
        }
        // console.log(arg);
    }

    protected setNormalWidthColumn(arg: RowHeight[]) {
        // console.log('setNormalWidthColumn');
        
        for (const el of arg) {
            var widthFromTag = el.row.width
            var widthUnitFromTag = el.row.widthUnit
            var pixelValue = el.pixelValue

            // var el = new ColumnWidth()
            el.row.heightToRealInject = pixelValue
        }
    }

    get rowTotalSize() {
        return this._rowTotalSize
    }

    get rowSizes(): RowHeight[] {
        // console.log('get columnSizes()');
        var res = []
        var columnTotalSize = 0
        var tabelHeight = this.tabelHeight

        var colLenth = this.tabel.rows.length
        for (var i = 0; i < colLenth; i++) {
            var row = this.tabel.rows[i]
            var widthFromTag = row.height
            var widthUnitFromTag = row.heightUnit
            var pixelValue = row.getComputedOffsetHeight()

            var el = new RowHeight()
            el.row = row
            el.pixelValue = pixelValue
            el.percentValueOfTabel = pixelValue / tabelHeight * 100

            columnTotalSize += pixelValue
            // console.log('get rowSizes el', pixelValue);

            res.push(el)

        }
        // console.log('get rowSizes');
        // console.log(res);
        

        this._rowTotalSize = 0
        this._rowTotalSize = columnTotalSize

        return res
    }

    protected roundUp(arg: number) {
        return Math.round(arg)
    }


}
