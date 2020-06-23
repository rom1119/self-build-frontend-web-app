import HtmlTagRecalculator from '../HtmlTagRecalculator';
import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderSizeCalculator from '~/src/Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '~/src/Calculator/OffsetSize/BorderOffsetSizeCalculator';
import BorderOffsetCalculator from '~/src/Calculator/Offset/BorderOffsetCalculator';
export default class BorderRecalculate implements HtmlTagRecalculator {
    recalculate(htmlTag: HtmlTag) {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)
        let offsetCalc = new BorderOffsetCalculator(htmlTag)
        
        htmlTag.borderTop.lengthCalc = sizeCalc.build(htmlTag.borderTop)
        htmlTag.borderTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderTop)
        htmlTag.borderTop.offsetCalc = offsetCalc.build(htmlTag.borderTop)

        htmlTag.borderBottom.lengthCalc = sizeCalc.build(htmlTag.borderBottom)
        htmlTag.borderBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderBottom)
        htmlTag.borderBottom.offsetCalc = offsetCalc.build(htmlTag.borderBottom)

        htmlTag.borderLeft.lengthCalc = sizeCalc.build(htmlTag.borderLeft)
        htmlTag.borderLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderLeft)
        htmlTag.borderLeft.offsetCalc = offsetCalc.build(htmlTag.borderLeft)

        htmlTag.borderRight.lengthCalc = sizeCalc.build(htmlTag.borderRight)
        htmlTag.borderRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderRight)
        htmlTag.borderRight.offsetCalc = offsetCalc.build(htmlTag.borderRight)

    }

}