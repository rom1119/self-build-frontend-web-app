import HtmlTagBlock from '../HtmlTagBlock';
export default abstract class  InputTag extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  INPUT-TEXT`
    public static TAG_NAME = 'input'

    protected _text

    constructor()
    {
        super()
        this._isClosingTag = false
    }

    public getTagName(): string {
        return InputTag.TAG_NAME
    }
    
    public getDomainTagName(): string {
        return this.getTagName()
    }
    

}