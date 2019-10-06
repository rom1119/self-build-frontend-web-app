import HtmlTagBlock from '../HtmlTagBlock';
export default class H1 extends HtmlTagBlock {

    protected _innerText: string = 'Example text H1'

    protected getTag(): string {
        return 'h1'
    }
    getInnerText(): string {
        return 'This is H1 element HTML'
    }
    
    

}