import HtmlTagBlock from "../../HtmlTagBlock"

export default class FormTag extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  FormTag`
    public static TAG_NAME = 'form'

    constructor()
    {
        super()
    }
    
    public getTagName(): string {
        return FormTag.TAG_NAME
    }
    public getDomainTagName(): string {
        return this.getTagName()
    }
    

}