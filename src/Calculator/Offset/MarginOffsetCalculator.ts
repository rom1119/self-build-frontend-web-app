import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';

export default class MarginOffsetCalculator implements OffsetCalculator<MarginModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }

    calculate(el: MarginModel): number {
        if (el instanceof MarginLeft) {
            return this.calculateLeftOffset()
        } else if (el instanceof MarginRight) {
            return this.calculateRightOffset()
        } else if (el instanceof MarginTop) {
            return this.calculateTopOffset()
            
        } else if (el instanceof MarginBottom) {
            return this.calculateBottomOffset()
            
        }
        throw Error('Not implemented for ' + el)
    }


    private calculateLeftOffset(): number
    {
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(this.htmlTag.marginLeft.width + paddingLeftWidth + borderLeftWidth)
        return newOff
    }
    
    private calculateRightOffset(): number
    {
        let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let borderRightWidth = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let newOff = -Math.abs(this.htmlTag.marginRight.width + paddingRightWidth + borderRightWidth)
        return newOff
    }
    
    private calculateTopOffset(): number
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = -Math.abs(this.htmlTag.marginTop.width )
        return newOff
    }
    
    private calculateBottomOffset(): number
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = -Math.abs(this.htmlTag.marginBottom.width + paddingBottomWidth + borderBottomWidth)
        return newOff
    }

    
}