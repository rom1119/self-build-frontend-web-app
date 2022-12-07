import HtmlTagBlock from "../../HtmlTagBlock"

export default class Textarea extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Textarea`
    protected _isClosingTag = true
    protected _isInput = true
    public static TAG_NAME = 'textarea'

    protected _text = ''
    constructor()
    {
        super()
        this._isClosingTag = false
    }
    
    public getTagName(): string {
        return Textarea.TAG_NAME
    }
    public getDomainTagName(): string {
        return this.getTagName()
    }


    set text(arg)
    {
        this._text = arg
        console.log('QQQQ');
        
        this.synchronizer.synchronize()

    }
    
    get text()
    {
        return this._text
    }
    
    
    

}