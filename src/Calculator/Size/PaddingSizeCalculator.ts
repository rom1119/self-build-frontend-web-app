import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import PaddingLeft from '~/src/Layout/Padding/PaddingLeft';
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingTop from '~/src/Layout/Padding/PaddingTop';
import PaddingBottom from '~/src/Layout/Padding/PaddingBottom';
import SizeCalcCssBuilder from '../SizeCalcCssBuilder';
import { Width } from '~/src/Css';
import { Pixel } from '~/src/Unit';

export default class PaddingSizeCalculator implements SizeCalcCssBuilder<PaddingModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
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
        var px = new Pixel();

        // let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        // let bottomWidthBorder = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  '100%'
        let newOff = `${height}`
        return newOff
    }
    
    private right(): string
    {
        var px = new Pixel();

        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  '100%'
        let newOff = `${height}`
        return newOff
    }
    
    private top(): string
    {
        var px = new Pixel();

        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%'
        let newOff = ` ${width}`
        return newOff
    }
    
    private bottom(): string
    {
        var px = new Pixel();

        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width =  '100%' 
        let newOff = ` ${width}`
        
        return newOff
    }

}