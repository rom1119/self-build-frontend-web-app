import { BoxSizing, Height, Width, BackgroundColor, MinHeight } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TextNode from '../../TextNode';
import TableCell from './TableCell';
export default class TableTh extends TableCell {
    
    protected _innerText: string = `${this.uuid}  TableTh`
    public static TAG_NAME = 'th'
    
    public getTagName(): string {
        return 'div'
    }
    public getDomainTagName(): string {
        return TableTh.TAG_NAME
    }

}