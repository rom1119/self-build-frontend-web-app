import OffsetCalculator from '../OffsetCalculator';
import HtmlTag from '~/src/Layout/HtmlTag';
import BorderModel from '../../Layout/Border/BorderModel';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '~/src/Layout/Border/BorderRight';
import BorderTop from '~/src/Layout/Border/BorderTop';
import BorderBottom from '~/src/Layout/Border/BorderBottom';
import SizeCalculator from '../SizeCalcCssBuilder';
import { Pixel } from '~/src/Unit';

export default class BorderSizeCalculator implements SizeCalculator<BorderModel>
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        this.htmlTag = htmlTag
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

        let topWidthBorder = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let bottomWidthBorder = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let topWidthPadding = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let bottomWidthPadding = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let height =  '100%' 
        let newOff = `${px.getValue(topWidthBorder)} + ${px.getValue(bottomWidthBorder)} + ${height}`
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
        let newOff = `${px.getValue(leftWidthBorder)} + ${px.getValue(rightWidthBorder)} + ${width}`
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
        let newOff = `${px.getValue(leftWidthBorder)} + ${px.getValue(rightWidthBorder)} + ${width}`
        
        return newOff
    }

}