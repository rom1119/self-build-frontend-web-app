import H1 from './tag/H1';
import HtmlTagFactory from './HtmlTagFactory';
import HtmlTag from './HtmlTag';
import UnableCreateDomainTagFromName from '../Errors/UnableCreateDomainTagFromName';
import TextNode from './TextNode';
import Div from './tag/Div';
import TableTag from './tag/Table/TableTag';
import TableTBody from './tag/Table/TableTBody';
import TableTHead from './tag/Table/TableTHead';
import TableTr from './tag/Table/TableTr';
import TableTd from './tag/Table/TableTd';
import TableTh from './tag/Table/TableTh';
import TableTFoot from './tag/Table/TableTFoot';
import ImgTag from './tag/ImgTag';
export default class HtmlTagFactoryFromName {

    private htmlTagFactory: HtmlTagFactory

    constructor()
    {
        this.htmlTagFactory = new HtmlTagFactory()
    }

    createText(): TextNode {
        return this.htmlTagFactory.createText()
    }
    
    create(name: string) : HtmlTag {

        switch (name) {
            case H1.TAG_NAME:
                return this.htmlTagFactory.createH1()
            case ImgTag.TAG_NAME:
                return this.htmlTagFactory.createImage()
            case Div.TAG_NAME:
                return this.htmlTagFactory.createDiv()
            case 'input-text':
                return this.htmlTagFactory.createInputText()
            case 'button':
                return this.htmlTagFactory.createButton()
            case TableTag.TAG_NAME:
                return this.htmlTagFactory.createTable()
            case TableTBody.TAG_NAME:
                return this.htmlTagFactory.createTableTBody()
            case TableTHead.TAG_NAME:
                return this.htmlTagFactory.createTableTHead()
            case TableTFoot.TAG_NAME:
                return this.htmlTagFactory.createTableTFoot()
            case TableTr.TAG_NAME:
                return this.htmlTagFactory.createTableTr()
            case TableTh.TAG_NAME:
                return this.htmlTagFactory.createTableTh()
            case TableTd.TAG_NAME:
                return this.htmlTagFactory.createTableTd()
        }
        throw new UnableCreateDomainTagFromName(`Can not create tag from name ${name}`)
    }
    
}