import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';

export default class BorderOffsetCalculator implements OffsetCalculator<BorderModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag

    }

    calculateOffset(el: BorderModel): number {
        if (el instanceof BorderLeft) {
            return this.calculateLeftOffset()
        } else if (el instanceof BorderRight) {
            return this.calculateRightOffset()
        } else if (el instanceof BorderTop) {
            return this.calculateTopOffset()
            
        } else if (el instanceof BorderBottom) {
            return this.calculateBottomOffset()
            
        }
        throw Error('Not implemented for ' + el)
    }


    private calculateLeftOffset(): number
    {
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs( borderLeftWidth)
        return newOff
    }
    
    private calculateRightOffset(): number
    {
        let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let borderRightWidth = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let newOff = -Math.abs(borderRightWidth)
        return newOff
    }
    
    private calculateTopOffset(): number
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = -Math.abs(borderTopWidth)
        return newOff
    }
    
    private calculateBottomOffset(): number
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = -Math.abs(borderBottomWidth)
        return newOff
    }

    
}