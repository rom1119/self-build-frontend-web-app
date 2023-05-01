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
import SvgTag from './tag/SvgTag';
import Header from './tag/Header';
import Main from './tag/Main';
import Footer from './tag/Footer';
import Section from './tag/Section';
import P from './tag/P';
import Span from './tag/Span';
import U from './tag/U';
import H2 from './tag/H2';
import H3 from './tag/H3';
import H4 from './tag/H4';
import H5 from './tag/H5';
import H6 from './tag/H6';
import Strong from './tag/Strong';
import B from './tag/B';
import Textarea from './tag/Form/Textarea';
import AddressTag from './tag/AddressTag';
import LabelTag from './tag/LabelTag';
import Ol from './tag/Ol';
import ATag from './tag/ATag';
import Ul from './tag/Ul';
import Li from './tag/Li';
import Br from './tag/Br';
import FormTag from './tag/Form/FormTag';
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
            case H2.TAG_NAME:
                return this.htmlTagFactory.createH2()
            case H3.TAG_NAME:
                return this.htmlTagFactory.createH3()
            case H4.TAG_NAME:
                return this.htmlTagFactory.createH4()
            case H5.TAG_NAME:
                return this.htmlTagFactory.createH5()
            case H6.TAG_NAME:
                return this.htmlTagFactory.createH6()
            case P.TAG_NAME:
                return this.htmlTagFactory.createParagraph()
            case U.TAG_NAME:
                return this.htmlTagFactory.createU()
            case Span.TAG_NAME:
                return this.htmlTagFactory.createSpan()
            case Strong.TAG_NAME:
                return this.htmlTagFactory.createStrong()
            case B.TAG_NAME:
                return this.htmlTagFactory.createB()
            case ImgTag.TAG_NAME:
                return this.htmlTagFactory.createImage()
            case ATag.TAG_NAME:
                return this.htmlTagFactory.createATag()
            case Br.TAG_NAME:
                return this.htmlTagFactory.createBr()
            case SvgTag.TAG_NAME:
                return this.htmlTagFactory.createSvg()
            case Div.TAG_NAME:
                return this.htmlTagFactory.createDiv()
            case Ol.TAG_NAME:
                return this.htmlTagFactory.createOl()
            case Ul.TAG_NAME:
                return this.htmlTagFactory.createUl()
            case Li.TAG_NAME:
                return this.htmlTagFactory.createLi()
            case AddressTag.TAG_NAME:
                return this.htmlTagFactory.createAddress()
            case LabelTag.TAG_NAME:
                return this.htmlTagFactory.createLabel()
            case Header.TAG_NAME:
                return this.htmlTagFactory.createHeader()
            case Main.TAG_NAME:
                return this.htmlTagFactory.createMain()
            case Section.TAG_NAME:
                return this.htmlTagFactory.createSection()
            case Footer.TAG_NAME:
                return this.htmlTagFactory.createFooter()
            case 'input-text':
                return this.htmlTagFactory.createInputText()
            case 'input-number':
                return this.htmlTagFactory.createInputNumber()
            case 'button':
                return this.htmlTagFactory.createButton()
            case Textarea.TAG_NAME:
                return this.htmlTagFactory.createTextarea()
            case FormTag.TAG_NAME:
                return this.htmlTagFactory.createFormTag()
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