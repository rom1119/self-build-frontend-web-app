import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';
import SizeCalculator from '../SizeCalculator';

export default class MarginSizeCalculator implements SizeCalculator<MarginModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
    }

    calculateSize(el: MarginModel): number {
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
        // let topWidthMargin = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
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
        let topWidthMargin = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let bottomWidthMargin = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  this.htmlTag.height 
        let newOff = topWidthMargin + bottomWidthMargin + topWidthPadding + bottomWidthPadding + height
        return newOff
    }
    
    private calculateTop(): number
    {
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  this.htmlTag.width 
        let newOff = leftWidthBorder + rightWidthBorder + leftWidthPadding + rightWidthPadding + leftWidthMargin + rightWidthMargin + width
        return newOff
    }
    
    private calculateBottom(): number
    {
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  this.htmlTag.width 
        let newOff = leftWidthBorder + rightWidthBorder + leftWidthPadding + rightWidthPadding + leftWidthMargin + rightWidthMargin + width
        return newOff
    }

}