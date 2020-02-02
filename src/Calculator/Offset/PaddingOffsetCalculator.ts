import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import PaddingLeft from '~/src/Layout/Padding/PaddingLeft';
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingTop from '~/src/Layout/Padding/PaddingTop';
import PaddingBottom from '~/src/Layout/Padding/PaddingBottom';

export default class PaddingOffsetCalculator implements OffsetCalculator<PaddingModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }

    calculateOffset(el: PaddingModel): number {
        if (el instanceof PaddingLeft) {
            return this.calculateLeftOffset()
        } else if (el instanceof PaddingRight) {
            return this.calculateRightOffset()
        } else if (el instanceof PaddingTop) {
            return this.calculateTopOffset()
            
        } else if (el instanceof PaddingBottom) {
            return this.calculateBottomOffset()
            
        }
        throw Error('Not implemented for ' + el)
    }


    private calculateLeftOffset(): number
    {
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs( paddingLeftWidth)
        return 0
    }
    
    private calculateRightOffset(): number
    {
        let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let borderRightWidth = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let newOff = -Math.abs(this.htmlTag.marginRight.width + paddingRightWidth + borderRightWidth)
        return 0
    }
    
    private calculateTopOffset(): number
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = -Math.abs(this.htmlTag.marginTop.width )
        return 0
    }
    
    private calculateBottomOffset(): number
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = -Math.abs(this.htmlTag.marginBottom.width + paddingBottomWidth + borderBottomWidth)
        return 0
    }

    
}