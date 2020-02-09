import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';
import OffsetSizeCalculator from '../OffsetSizeCalculator';

export default class MarginOffsetSizeCalculator implements OffsetSizeCalculator<MarginModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }

    calculateOffsetSize(el: MarginModel): number {
        if (el instanceof MarginLeft) {
            return this.calculateLeft()
        } else if (el instanceof MarginRight) {
            return this.calculateRight()
        } else if (el instanceof MarginTop) {
            return this.calculateTop()
            
        } else if (el instanceof MarginBottom) {
            return this.calculateBottom()
        }
        throw Error('Not implemented for ' + el)
    }


    private calculateLeft(): number
    {
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderTopWidth)
        return newOff
    }
    
    private calculateRight(): number
    {
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderTopWidth)
        return newOff
    }
    
    private calculateTop(): number
    {
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let marginLeftWidth = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderLeftWidth + marginLeftWidth)
        return newOff
    }
    
    private calculateBottom(): number
    {
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let marginLeftWidth = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderLeftWidth + marginLeftWidth)
        return newOff
    }

    
}