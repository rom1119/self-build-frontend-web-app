import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import OffsetSizeCalculator from '../OffsetSizeCalculator';

export default class BorderOffsetSizeCalculator implements OffsetSizeCalculator<BorderModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }

    calculateOffsetSize(el: BorderModel): number {
        if (el instanceof BorderLeft) {
            return this.calculateLeft()
        } else if (el instanceof BorderRight) {
            return this.calculateRight()
        } else if (el instanceof BorderTop) {
            return this.calculateTop()
            
        } else if (el instanceof BorderBottom) {
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
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderLeftWidth)
        return newOff
    }
    
    private calculateBottom(): number
    {
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(borderLeftWidth)
        return newOff
    }

    
}