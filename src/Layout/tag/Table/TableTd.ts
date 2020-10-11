import { BoxSizing, Height, Width, BackgroundColor, MinHeight, PaddingCss } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TextNode from '../../TextNode';
import TableCell from './TableCell';
import FlexGrow from '../../../Css/Display/FlexGrow';
export default class TableTd extends TableCell {

    protected _innerText: string = `${this.uuid}  TableTd`
    public static TAG_NAME = 'td'

    public getTagName(): string {
        return 'div'
    }

    public getDomainTagName(): string {
        return TableTd.TAG_NAME
    }
    
    
    

}