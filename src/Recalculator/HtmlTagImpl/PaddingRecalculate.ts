import HtmlTagRecalculator from '../HtmlTagRecalculator';
import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingSizeCalculator from '~/src/Calculator/Size/PaddingSizeCalculator';
import PaddingOffsetSizeCalculator from '~/src/Calculator/OffsetSize/PaddingOffsetSizeCalculator';
import PaddingOffsetCalculator from '~/src/Calculator/Offset/PaddingOffsetCalculator';
export default class PaddingRecalculate implements HtmlTagRecalculator {
    recalculate(htmlTag: HtmlTag) {
        let sizeCalc = new PaddingSizeCalculator(htmlTag)
        let offsetSizeCalc = new PaddingOffsetSizeCalculator(htmlTag)
        let offsetCalc = new PaddingOffsetCalculator(htmlTag)
        
        htmlTag.paddingTop.lengthCalc = sizeCalc.build(htmlTag.paddingTop)
        htmlTag.paddingTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingTop)
        htmlTag.paddingTop.offsetCalc = offsetCalc.build(htmlTag.paddingTop)
        
        htmlTag.paddingBottom.lengthCalc = sizeCalc.build(htmlTag.paddingBottom)
        htmlTag.paddingBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingBottom)
        htmlTag.paddingBottom.offsetCalc = offsetCalc.build(htmlTag.paddingBottom)
        
        htmlTag.paddingLeft.lengthCalc = sizeCalc.build(htmlTag.paddingLeft)
        htmlTag.paddingLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingLeft)
        htmlTag.paddingLeft.offsetCalc = offsetCalc.build(htmlTag.paddingLeft)
        
        htmlTag.paddingRight.lengthCalc = sizeCalc.build(htmlTag.paddingRight)
        htmlTag.paddingRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingRight)
        htmlTag.paddingRight.offsetCalc = offsetCalc.build(htmlTag.paddingRight)
    }

}