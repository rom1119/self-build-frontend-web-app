import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import { Pixel } from '~/src/Unit';
import OffsetCalcCssBuilder from '../OffsetCalcCssBuilder';

export default class BorderOffsetCalculator implements OffsetCalcCssBuilder<BorderModel>
{
    protected htmlTag: HtmlTag
    protected px: Pixel

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
        this.px = new Pixel();

    }

    build(el: BorderModel): string {
        if (el instanceof BorderLeft) {
            return `calc(${this.left()})`
        } else if (el instanceof BorderRight) {
            return `calc(${this.right()})`
        } else if (el instanceof BorderTop) {
            return `calc(${this.top()})`
            
        } else if (el instanceof BorderBottom) {
            return `calc(${this.bottom()})`
            
        }
        throw Error('Not implemented for ' + el)
    }


    private left(): string
    {
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let newOff = `0px - ${this.px.getValue(leftWidthBorder)}`
        return newOff
    }
    
    private right(): string
    {
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let width =  '100%'
        let newOff = `0px - ${this.px.getValue(rightWidthBorder)}`
        return newOff
    }
    
    private top(): string
    {
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let topWidthMargin = this.htmlTag.marginTop.isActive() ? this.htmlTag.marginTop.width : 0
        let width =  this.htmlTag.getWidthValue()
        let newOff = `0px - ${this.px.getValue(topWidthBorder)}`
        return newOff
    }
    
    private bottom(): string
    {
        let marginBottomWidth = this.htmlTag.marginBottom.isActive() ? this.htmlTag.marginBottom.width : 0
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = `0px - ${this.px.getValue(borderBottomWidth)}`
        return newOff
    }

    
}