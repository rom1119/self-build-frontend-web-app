import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class H5 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H5`
    public static TAG_NAME = 'h5'

    public getTagName(): string {
        return H5.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }

    public injectInitialCssStyles()
    {
        var text = new TextNode()
        
        this.appendChildNotPersist(text)
        super.injectInitialCssStyles()
        text.text = 'example H5'

    }

}