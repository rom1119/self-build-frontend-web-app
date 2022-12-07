import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class P extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  P`
    public static TAG_NAME = 'p'

    public getTagName(): string {
        return P.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()


    }

}