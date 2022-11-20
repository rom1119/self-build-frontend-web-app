import HtmlTagBlock from '../HtmlTagBlock';
export default class Section extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  Section`
    public static TAG_NAME = 'section'

    public getTagName(): string {
        return Section.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}