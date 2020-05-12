import HtmlTagRecalculator from '../HtmlTagRecalculator';
import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderSizeCalculator from '~/src/Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '~/src/Calculator/OffsetSize/BorderOffsetSizeCalculator';
export default class BorderRecalculate implements HtmlTagRecalculator {
    recalculate(htmlTag: HtmlTag) {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)
        
        htmlTag.borderTop.lengthCalc = sizeCalc.build(htmlTag.borderTop)
        htmlTag.borderTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderTop)
        htmlTag.borderBottom.lengthCalc = sizeCalc.build(htmlTag.borderBottom)
        htmlTag.borderBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderBottom)
        htmlTag.borderLeft.lengthCalc = sizeCalc.build(htmlTag.borderLeft)
        htmlTag.borderLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderLeft)
        htmlTag.borderRight.lengthCalc = sizeCalc.build(htmlTag.borderRight)
        htmlTag.borderRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.borderRight)
    }

}