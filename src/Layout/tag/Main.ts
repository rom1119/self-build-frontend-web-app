import HtmlTagBlock from '../HtmlTagBlock';
export default class Main extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Main`
    public static TAG_NAME = 'main'

    public getTagName(): string {
        return Main.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}