import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H1 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H1`
    public static TAG_NAME = 'h1'

    public getTagName(): string {
        return H1.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()
        var text = new TextNode()
        text.text = 'example h1'
        
        this.appendChildDeep(text)

    }

}