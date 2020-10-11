import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H2 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H2`
    public static TAG_NAME = 'h2'

    public getTagName(): string {
        return H2.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }

    public injectInitialCssStyles()
    {
        var text = new TextNode()
        
        this.appendChild(text)
        super.injectInitialCssStyles()
        text.text = 'example h2'

    }

}