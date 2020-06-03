import HtmlTagBlock from '../HtmlTagBlock';
export default class InputText extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  INPUT-TEXT`

    protected _text

    constructor()
    {
        super()
        this._isClosingTag = false
    }

    public getTagName(): string {
        return 'input'
    }
    
    
    

}