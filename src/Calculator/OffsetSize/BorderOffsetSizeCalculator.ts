import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import OffsetSizeCalcCssBuilder from '../OffsetSizeCalcCssBuilder';
import { Pixel } from '~/src/Unit';

export default class BorderOffsetSizeCalculator implements OffsetSizeCalcCssBuilder<BorderModel>
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
        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = ` 0px - ${this.px.getValue(topWidthBorder)}`
        return newOff
    }
    
    private right(): string
    {
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = ` 0px - ${this.px.getValue(topWidthBorder)}`
        return newOff
    }
    
    private top(): string
    {
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0

        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = '0px'
        return newOff
    }
    
    private bottom(): string
    {
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0

        // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = '0px'
        return newOff
    }

    
}