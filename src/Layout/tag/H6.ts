import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H6 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H6`
    public static TAG_NAME = 'h6'

    public getTagName(): string {
        return H6.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }

    public injectInitialCssStyles()
    {
        var text = new TextNode()
        
        this.appendChildNotPersist(text)
        super.injectInitialCssStyles()
        text.text = 'example H6'

    }

}