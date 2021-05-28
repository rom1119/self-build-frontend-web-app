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
    protected _columnTotalSize: number = 0

    constructor(tabel: TableTag) {
        this.tabel = tabel
        this.tabelContent = new ContentWidthPx(tabel)
    }


    get calculated() {
        console.log('calculate START');
        if (!this.tabel.getHtmlElHidden()) {
            return 0
        }
        var colSizes = this.columnSizes

        var columns = this.tabel.columns
        var tabelWidth = this.tabelContent.contentWidthPx
        var columnTotalWidth = this._columnTotalSize
        console.log('tabelWidth', tabelWidth);
        console.log('columnTotalWidth', columnTotalWidth);

        if (!tabelWidth) {
            this.setNormalWidthColumn(colSizes)
            return 1
        }

        this.calculateWidthColumns(colSizes, tabelWidth)
        // var width: UnitSize = column.getWidthValue()

        return 2

    }

    protected calculateWidthColumns(arg: ColumnWidth[], tabelWidth) {
        console.log('calculateWidthColumns');
        
        for (const el of arg) {
            var widthFromTag = el.col.width
            var widthUnitFromTag = el.col.widthUnit
            var width = el.pixelValue

            // var el = new ColumnWidth()
            el.percentValueOfAlColumns = el.pixelValue / this._columnTotalSize * 100
            console.log(el);
            
            var newVal = el.percentValueOfAlColumns * tabelWidth / 100
            // console.log(newVal);
            console.log(this.roundUp(newVal));

            el.col.widthToRealInject = this.roundUp(newVal)
            
        }
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
        var tabelWidth = this.tabelContent.contentWidthPx

        for (const col of this.tabel.columns) {
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

        this._columnTotalSize = columnTotalSize

        return res
    }

    protected roundUp(arg: number) {
        return Math.round(arg)
    }


}
