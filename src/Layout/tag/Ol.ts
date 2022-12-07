import HtmlTagBlock from '../HtmlTagBlock';
export default class Ol extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Ol`
    public static TAG_NAME = 'ol'

    public getTagName(): string {
        return Ol.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}