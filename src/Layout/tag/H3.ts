import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H3 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H3`
    public static TAG_NAME = 'h3'

    public getTagName(): string {
        return H3.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }

    public injectInitialCssStyles()
    {
        var text = new TextNode()
        
        this.appendChildNotPersist(text)
        super.injectInitialCssStyles()
        text.text = 'example H3'

    }

}