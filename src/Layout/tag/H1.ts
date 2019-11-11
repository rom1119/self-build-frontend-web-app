import HtmlTagBlock from '../HtmlTagBlock';
export default class H1 extends HtmlTagBlock {

    protected _innerText: string = '  H1'

    protected getTagName(): string {
        return 'h1'
    }
    get innerText(): string {
        return `${this.uuid} ${this._innerText}`
    }
    
    

}