import HtmlTag from "./../HtmlTag"

export default class Br extends HtmlTag {

    protected _innerText: string = `${this.uuid}  BR`
    protected _isClosingTag = false
    protected _isInput = false
    public static TAG_NAME = 'br'

    protected _text = ''
    constructor()
    {
        super()
        this._isClosingTag = false
    }
    
    public getTagName(): string {
        return Br.TAG_NAME
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