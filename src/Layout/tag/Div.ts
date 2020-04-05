import HtmlTagBlock from '../HtmlTagBlock';
export default class Div extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Div`

    public getTagName(): string {
        return 'div'
    }
    
    
    

}