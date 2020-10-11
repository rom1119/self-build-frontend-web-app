import HtmlTagBlock from '../HtmlTagBlock';
export default class Div extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Div`
    public static TAG_NAME = 'div'

    public getTagName(): string {
        return Div.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}