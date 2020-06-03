import HtmlTagBlock from "../../HtmlTagBlock"

export default class Input extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  INPUT-TEXT`
    protected _isClosingTag = false
    protected _isInput = true

    protected _text = ''

    constructor()
    {
        super()
        this._isClosingTag = false
    }

    public getTagName(): string {
        return 'input'
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