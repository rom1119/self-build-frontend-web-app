import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import MarginModel from '../../Layout/Margin/MarginModel';
import MarginLeft from '~/src/Layout/Margin/MarginLeft';
import MarginRight from '~/src/Layout/Margin/MarginRight';
import MarginTop from '~/src/Layout/Margin/MarginTop';
import MarginBottom from '~/src/Layout/Margin/MarginBottom';
import SizeCalcCssBuilder from '../SizeCalcCssBuilder';
import { Width } from '~/src/Css';
import { Pixel } from '~/src/Unit';

export default class MarginSizeCalculator implements SizeCalcCssBuilder<MarginModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
    }

    build(el: MarginModel): string {
        if (el instanceof MarginLeft) {
            return `calc(${this.left()})`
        } else if (el instanceof MarginRight) {
            return `calc(${this.right()})`
        } else if (el instanceof MarginTop) {
            return `calc(${this.top()})`
            
        } else if (el instanceof MarginBottom) {
            return `calc(${this.bottom() })`
        }
        throw Error('Not implemented for ' + el)
    }

    private left(): string
    {
        // let topWidthMargin = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        var px = new Pixel();
        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let bottomWidthBorder = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  '100%' 
        let newOff = `${px.getValue(topWidthBorder)} + ${px.getValue(bottomWidthBorder)} + ${height}`
        return newOff
    }
    
    private right(): string
    {
        var px = new Pixel();

        let topWidthMargin = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let bottomWidthMargin = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  '100%' 
        let newOff = `${px.getValue(topWidthMargin)} + ${px.getValue(bottomWidthMargin)}  + ${height}`

        return newOff
    }
    
    private top(): string
    {
        var px = new Pixel();

        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width = '100%' 

        let newOff = `${px.getValue(leftWidthBorder)} + ${px.getValue(rightWidthBorder)} + ${px.getValue(leftWidthMargin)} + ${px.getValue(rightWidthMargin)} + ${width}`

        return newOff
    }
    
    private bottom(): string
    {
        var px = new Pixel();


        let leftWidthMargin = this.htmlTag.marginLeft.isActive() ? this.htmlTag.marginLeft.width : 0
        let rightWidthMargin = this.htmlTag.marginRight.isActive() ? this.htmlTag.marginRight.width : 0
        let leftWidthBorder = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let rightWidthBorder = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let leftWidthPadding = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let rightWidthPadding = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let width = '100%' 
        let newOff = `${px.getValue(leftWidthBorder)} + ${px.getValue(rightWidthBorder)} + ${px.getValue(leftWidthMargin)} + ${px.getValue(rightWidthMargin)} + ${width}`

        return newOff
    }

}