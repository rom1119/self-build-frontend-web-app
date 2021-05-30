import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import UnitSize from "~/src/Unit/UnitSize";
import TableTag from '../../../Layout/tag/Table/TableTag';
import ContentWidthPx from '../ContentWidthPx';

class ColumnWidth {

    percentValueOfTabel: number
    percentValueOfAlColumns: number
    pixelValue: number
    col: TableColumnEl
}

export default class TabelColumnsCalculator
{
    protected tabelContent: ContentWidthPx
    protected tabel: TableTag
    protected _columnTotalSize: number
    protected tabelWidth: number

    constructor(tabel: TableTag) {
        this.tabel = tabel
        this.tabelContent = new ContentWidthPx(tabel)
    }


    get calculated() {
        // console.log('calculate START');
        if (!this.tabel.getHtmlElHidden()) {
            return 0
        }
        
        
        // console.time()
        this.tabelWidth = this.tabelContent.contentWidthPx
        var colSizes = this.columnSizes
        var columns = this.tabel.columns
        var columnTotalWidth = this._columnTotalSize
        // console.log('tabelWidth', tabelWidth);
        // console.log('columnTotalWidth', columnTotalWidth);
        
        if (!this.tabelWidth) {
            this.setNormalWidthColumn(colSizes)
            return 1
        }
        
        this.calculateWidthColumns(colSizes, this.tabelWidth)
        // console.timeEnd()
        // var width: UnitSize = column.getWidthValue()
        // console.log('calculate END ');

        return 2

    }

    protected calculateWidthColumns(arg: ColumnWidth[], tabelWidth) {
        // console.log('calculateWidthColumns');
        
        var colLenth = arg.length
        for (var i = 0; i < colLenth; i++) {
            var el = arg[i]
            var widthFromTag = el.col.width
            var widthUnitFromTag = el.col.widthUnit
            var width = el.pixelValue

            // var el = new ColumnWidth()
            el.percentValueOfAlColumns = el.pixelValue / this._columnTotalSize * 100
            // console.log(el);
            
            var newVal = el.percentValueOfAlColumns * tabelWidth / 100
            // console.log(newVal);
            
            el.col.widthToRealInject = this.roundUp(newVal)
            
        }
        // console.log(arg);
    }

    protected setNormalWidthColumn(arg: ColumnWidth[]) {
        // console.log('setNormalWidthColumn');
        
        for (const el of arg) {
            var widthFromTag = el.col.width
            var widthUnitFromTag = el.col.widthUnit
            var width = el.pixelValue

            // var el = new ColumnWidth()
            el.col.widthToRealInject = width
        }
    }

    get columnTotalSize() {
        return this._columnTotalSize
    }

    get columnSizes(): ColumnWidth[] {
        // console.log('get columnSizes()');
        var res = []
        var columnTotalSize = 0
        var tabelWidth = this.tabelWidth

        var colLenth = this.tabel.columns.length
        for (var i = 0; i < colLenth; i++) {
            var col = this.tabel.columns[i]
            var widthFromTag = col.width
            var widthUnitFromTag = col.widthUnit
            var widthPx = col.getComputedOffsetWidth()

            var el = new ColumnWidth()
            el.col = col
            el.pixelValue = widthPx
            el.percentValueOfTabel = widthPx / tabelWidth * 100

            columnTotalSize += widthPx

            res.push(el)

        }

        this._columnTotalSize = 0
        this._columnTotalSize = columnTotalSize

        return res
    }

    protected roundUp(arg: number) {
        return Math.round(arg)
    }


}
