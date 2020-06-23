import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import OffsetSizeCalcCssBuilder from '../OffsetSizeCalcCssBuilder';
import PaddingLeft from '~/src/Layout/Padding/PaddingLeft';
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingTop from '~/src/Layout/Padding/PaddingTop';
import PaddingBottom from '~/src/Layout/Padding/PaddingBottom';
import Pixel from '../../Unit/Size/Pixel';

export default class PaddingOffsetSizeCalculator implements OffsetSizeCalcCssBuilder<PaddingModel>
{
    protected htmlTag: HtmlTag
    protected px: Pixel

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
        this.px = new Pixel();


    }

    build(el: PaddingModel): string {
        if (el instanceof PaddingLeft) {
            return `calc(${this.left()})`
        } else if (el instanceof PaddingRight) {
            return `calc(${this.right()})`
        } else if (el instanceof PaddingTop) {
            return `calc(${this.top()})`
            
        } else if (el instanceof PaddingBottom) {
            return `calc(${this.bottom() })`
        }
        throw Error('Not implemented for ' + el)
    }


    private left(): string
    {
        
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0`
        return newOff
    }
    
    private right(): string
    {
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0`
        return newOff
    }
    
    private top(): string
    {
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0`
        return newOff
    }
    
    private bottom(): string
    {
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0`
        return newOff
    }

    
}