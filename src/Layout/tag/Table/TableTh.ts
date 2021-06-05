import { BoxSizing, Height, Width, BackgroundColor, MinHeight } from '~/src/Css';
import { Named } from '~/src/Unit';
import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import Percent from '../../../Unit/Size/Percent';
import TextNode from '../../TextNode';
import TableCell from './TableCell';
import BorderGlobalCss from '../../../Css/Border/Global/BorderGlobalCss';
export default class TableTh extends TableCell {
    
    protected _innerText: string = `${this.uuid}  TableTh`
    public static TAG_NAME = 'th'
    
    public getTagName(): string {
        return 'div'
    }
    public getDomainTagName(): string {
        return TableTh.TAG_NAME
    }

    public injectInitialCssStyles() {
        let border = new BorderGlobalCss('5', new Pixel())
        border.setType('solid')
        border.setColor('green', new Named())

        let width = new Width(20, new Percent())
        let minHeight = new MinHeight(100, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({ r: 200, g: 70, b: 70 }, new RGB())
        // let p = new PaddingCss(10, new Pixel())

        let cssList = [width, minHeight, boxSizing, backgroundColor, border]




        this.addPropsToAccessor(cssList)
    }

}