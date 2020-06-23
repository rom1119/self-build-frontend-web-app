import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';
import OffsetSizeCalcCssBuilder from '../OffsetSizeCalcCssBuilder';
import { Pixel } from '~/src/Unit';

export default class MarginOffsetSizeCalculator implements OffsetSizeCalcCssBuilder<MarginModel>
{
    protected htmlTag: HtmlTag
    protected px: Pixel

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
        this.px = new Pixel();

    }

    build(el: MarginModel): string {
        if (el instanceof MarginLeft) {
            return `calc(${this.left()})`
        } else if (el instanceof MarginRight) {
            return `calc(${this.right()})`
        } else if (el instanceof MarginTop) {
            return `calc(${this.top()})`
            
        } else if (el instanceof MarginBottom) {
            return `calc(${this.bottom()})`
        }
        throw Error('Not implemented for ' + el)
    }


    private left(): string
    {
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
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0px - ${this.px.getValue(leftWidthBorder)} - ${this.px.getValue(leftWidthMargin)}`
        return newOff
    }
    
    private bottom(): string
    {
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = `0px - ${this.px.getValue(leftWidthBorder)} - ${this.px.getValue(leftWidthMargin)}`
        return newOff
    }

    
}