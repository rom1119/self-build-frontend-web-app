import HtmlTagBlock from '../HtmlTagBlock';
import InputTag from './InputTag';
export default class InputText extends InputTag {

    protected _innerText: string = `${this.uuid}  INPUT-TEXT`
    public static TAG_NAME = 'input'

    protected _text

    constructor()
    {
        super()
        this._isClosingTag = false
    }

    

}