import HtmlTagBlock from '../HtmlTagBlock';
export default class H1 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H1`

    public getTagName(): string {
        return 'h1'
    }
    
    
    

}