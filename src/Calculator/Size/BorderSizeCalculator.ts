import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import SizeCalculator from '../SizeCalculator';

export default class BorderSizeCalculator implements SizeCalculator<BorderModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
    }

    calculateSize(el: BorderModel): number {
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
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let bottomWidthBorder = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  this.htmlTag.height 
        let newOff = topWidthBorder + bottomWidthBorder + topWidthPadding + bottomWidthPadding + height
        return newOff
    }
    
    private calculateRight(): number
    {
        let rightWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let height =  this.htmlTag.height 
        let newOff = rightWidth + height
        return newOff
    }
    
    private calculateTop(): number
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = -Math.abs(borderTopWidth)
        return newOff
    }
    
    private calculateBottom(): number
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = -Math.abs(borderBottomWidth)
        return newOff
    }

    
}