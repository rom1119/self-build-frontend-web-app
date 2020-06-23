import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import PaddingLeft from '~/src/Layout/Padding/PaddingLeft';
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingTop from '~/src/Layout/Padding/PaddingTop';
import PaddingBottom from '~/src/Layout/Padding/PaddingBottom';
import { Pixel } from '~/src/Unit';
import OffsetCalcCssBuilder from '../OffsetCalcCssBuilder';

export default class PaddingOffsetCalculator implements OffsetCalcCssBuilder<PaddingModel>
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
            return `calc(${this.bottom()})`
            
        }
        throw Error('Not implemented for ' + el)
    }


    private left(): string
    {
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  this.htmlTag.getWidthValue()
        let newOff = `0`
        return newOff
    }
    
    private right(): string
    {
        // let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        // let bottomWidthBorder = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  this.htmlTag.getWidthValue()
        let newOff = `0px`
        return newOff
    }
    
    private top(): string
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = `0px`
        return newOff
    }
    
    private bottom(): string
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = `0px`
        return newOff
    }

    
}