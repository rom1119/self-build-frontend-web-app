import HtmlTagBlock from '../HtmlTagBlock';
export default class H2 extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  H2`

    public getTagName(): string {
        return 'h2'
    }
    
    
    

}