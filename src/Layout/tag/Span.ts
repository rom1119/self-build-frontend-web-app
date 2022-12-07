import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
import HtmlTagLine from '../HtmlTagLine';
export default class Span extends HtmlTagLine {

    protected _innerText: string = `${this.uuid}  span`
    public static TAG_NAME = 'span'

    public getTagName(): string {
        return Span.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()


    }

}