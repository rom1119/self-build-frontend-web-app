import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';
import { Pixel } from '~/src/Unit';
import OffsetCalcCssBuilder from '../OffsetCalcCssBuilder';

export default class MarginOffsetCalculator implements OffsetCalcCssBuilder<MarginModel>
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
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let width =  this.htmlTag.getWidthValue()
        let newOff = `0px - ${this.px.getValue(leftWidthBorder)} - ${this.px.getValue(leftWidthMargin)}`
        return newOff
    }
    
    private right(): string
    {
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let width =  '100%'
        let newOff = `0px - ${this.px.getValue(rightWidthBorder)} - ${this.px.getValue(rightWidthMargin)}`
        return newOff
    }
    
    private top(): string
    {
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let topWidthMargin = this.htmlTag.marginTop.isActive() ? this.htmlTag.marginTop.width : 0
        let width =  this.htmlTag.getWidthValue()
        let newOff = `0px - ${this.px.getValue(topWidthBorder)} - ${this.px.getValue(topWidthMargin)}`
        return newOff
    }
    
    private bottom(): string
    {
        let marginBottomWidth = this.htmlTag.marginBottom.isActive() ? this.htmlTag.marginBottom.width : 0
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = `0px - ${this.px.getValue(marginBottomWidth)} - ${this.px.getValue(borderBottomWidth)}`
        return newOff
    }

    
}