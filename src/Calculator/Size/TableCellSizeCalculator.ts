import HtmlTag from '~/src/Layout/HtmlTag';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import PaddingLeft from '~/src/Layout/Padding/PaddingLeft';
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingTop from '~/src/Layout/Padding/PaddingTop';
import PaddingBottom from '~/src/Layout/Padding/PaddingBottom';
import SizeCalcCssBuilder from '../SizeCalcCssBuilder';
import { Width } from '~/src/Css';
import { Pixel } from '~/src/Unit';
import ContentSizeCss from '../../Css/Size/ContentSizeCss';
import TableCell from '~/src/Layout/tag/Table/TableCell';

export default class TableCellSizeCalculator implements SizeCalcCssBuilder<ContentSizeCss>
{
    protected htmlTag: TableCell

    constructor(htmlTag: TableCell)
    {
        this.htmlTag = htmlTag
    }

    build(el: ContentSizeCss): string {
        if (el instanceof PaddingLeft) {
            return `calc(${this.left()})`
        } else if (el instanceof PaddingRight) {
            return `calc(${this.right()})`
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
   

}