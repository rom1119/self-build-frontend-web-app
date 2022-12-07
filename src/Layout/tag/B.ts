import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class B extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  B`
    public static TAG_NAME = 'b'

    public getTagName(): string {
        return B.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()


    }

}