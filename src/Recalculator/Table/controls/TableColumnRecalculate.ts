import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingSizeCalculator from '~/src/Calculator/Size/PaddingSizeCalculator';
import PaddingOffsetSizeCalculator from '~/src/Calculator/OffsetSize/PaddingOffsetSizeCalculator';
import PaddingOffsetCalculator from '~/src/Calculator/Offset/PaddingOffsetCalculator';
import TableElementRecalculator from "~/src/Recalculator/TableElementRecalculator";
import TableTag from "~/src/Layout/tag/Table/TableTag";
export default class TableColumnRecalculate implements TableElementRecalculator {
    recalculate(htmlTag: TableTag) {
        let offsetSizeCalc = new PaddingOffsetSizeCalculator(htmlTag)

        var colIndex =

        htmlTag.paddingTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingTop)

    }

}
