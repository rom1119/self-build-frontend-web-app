import HtmlTagRecalculator from '../HtmlTagRecalculator';
import MarginSizeCalculator from '~/src/Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '~/src/Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import MarginOffsetCalculator from '~/src/Calculator/Offset/MarginOffsetCalculator';
export default class MarginRecalculate implements HtmlTagRecalculator {
    recalculate(htmlTag: HtmlTag) {
        let sizeCalc = new MarginSizeCalculator(htmlTag)
        let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)
        let offsetCalc = new MarginOffsetCalculator(htmlTag)
        
        htmlTag.marginTop.lengthCalc = sizeCalc.build(htmlTag.marginTop)
        htmlTag.marginTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginTop)
        htmlTag.marginTop.offsetCalc = offsetCalc.build(htmlTag.marginTop)

        htmlTag.marginBottom.lengthCalc = sizeCalc.build(htmlTag.marginBottom)
        htmlTag.marginBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginBottom)
        htmlTag.marginBottom.offsetCalc = offsetCalc.build(htmlTag.marginBottom)

        htmlTag.marginLeft.lengthCalc = sizeCalc.build(htmlTag.marginLeft)
        htmlTag.marginLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginLeft)
        htmlTag.marginLeft.offsetCalc = offsetCalc.build(htmlTag.marginLeft)

        htmlTag.marginRight.lengthCalc = sizeCalc.build(htmlTag.marginRight)
        htmlTag.marginRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginRight)
        htmlTag.marginRight.offsetCalc = offsetCalc.build(htmlTag.marginRight)

    }

}