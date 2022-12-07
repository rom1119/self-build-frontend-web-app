import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H4 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H4`
    public static TAG_NAME = 'h4'

    public getTagName(): string {
        return H4.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }

    public injectInitialCssStyles()
    {
        var text = new TextNode()
        
        this.appendChildNotPersist(text)
        super.injectInitialCssStyles()
        text.text = 'example H4'

    }

}