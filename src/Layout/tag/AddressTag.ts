import HtmlTagBlock from '../HtmlTagBlock';
export default class AddressTag extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  AddressTag`
    public static TAG_NAME = 'address'

    public getTagName(): string {
        return AddressTag.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}