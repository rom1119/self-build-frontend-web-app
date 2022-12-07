import HtmlTagBlock from '../HtmlTagBlock';
export default class Ul extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Ul`
    public static TAG_NAME = 'ul'

    public getTagName(): string {
        return Ul.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}