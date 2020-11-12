import HtmlTagBlock from "../../HtmlTagBlock"

export default class Input extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  INPUT-TEXT`
    protected _isClosingTag = false
    protected _isInput = true
    public static TAG_NAME = 'input'

    protected _text = ''
    constructor()
    {
        super()
        this._isClosingTag = false
    }
    
    public getTagName(): string {
        return Input.TAG_NAME
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