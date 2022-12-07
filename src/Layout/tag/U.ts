import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class U extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  U`
    public static TAG_NAME = 'u'

    public getTagName(): string {
        return U.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()


    }

}