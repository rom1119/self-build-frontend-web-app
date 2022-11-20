import HtmlTagBlock from '../HtmlTagBlock';
export default class Footer extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Footer`
    public static TAG_NAME = 'footer'

    public getTagName(): string {
        return Footer.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}