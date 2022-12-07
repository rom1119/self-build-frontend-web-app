import HtmlTagBlock from '../HtmlTagBlock';
import TextNode from '../TextNode';
export default class Strong extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Strong`
    public static TAG_NAME = 'strong'

    public getTagName(): string {
        return Strong.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    
    public injectInitialCssStyles()
    {
        super.injectInitialCssStyles()


    }

}