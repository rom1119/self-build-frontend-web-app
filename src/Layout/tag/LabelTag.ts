import HtmlTagBlock from '../HtmlTagBlock';
export default class LabelTag extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  LabelTag`
    public static TAG_NAME = 'label'

    public getTagName(): string {
        return LabelTag.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}