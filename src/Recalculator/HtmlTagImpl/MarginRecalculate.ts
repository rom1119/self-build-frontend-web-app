import HtmlTagRecalculator from '../HtmlTagRecalculator';
import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
export default class MarginRecalculate implements HtmlTagRecalculator {
    recalculate(htmlTag: HtmlTag) {
        let sizeCalc = new MarginSizeCalculator(htmlTag)
        let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)
        
        htmlTag.marginTop.lengthCalc = sizeCalc.build(htmlTag.marginTop)
        htmlTag.marginTop.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginTop)
        htmlTag.marginBottom.lengthCalc = sizeCalc.build(htmlTag.marginBottom)
        htmlTag.marginBottom.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginBottom)
        htmlTag.marginLeft.lengthCalc = sizeCalc.build(htmlTag.marginLeft)
        htmlTag.marginLeft.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginLeft)
        htmlTag.marginRight.lengthCalc = sizeCalc.build(htmlTag.marginRight)
        htmlTag.marginRight.lengthOffset = offsetSizeCalc.calculateOffsetSize(htmlTag.marginRight)
    }

}