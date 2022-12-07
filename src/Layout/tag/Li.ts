import HtmlTagBlock from '../HtmlTagBlock';
export default class Li extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Li`
    public static TAG_NAME = 'li'

    public getTagName(): string {
        return Li.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}