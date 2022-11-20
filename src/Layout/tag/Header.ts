import HtmlTagBlock from '../HtmlTagBlock';
export default class Header extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Header`
    public static TAG_NAME = 'header'

    public getTagName(): string {
        return Header.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}