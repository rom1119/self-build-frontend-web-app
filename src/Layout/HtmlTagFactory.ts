import H1 from './tag/H1';
import ApiService from '../Api/ApiService';
import DefaultApiService from '../Api/impl/DefaultApiService';
import TextNode from './TextNode';
import Div from './tag/Div';
import InputText from './tag/Form/InputText';
import Button from './tag/Button';
import TableTag from './tag/Table/TableTag';
import TableTHead from './tag/Table/TableTHead';
import TableTBody from './tag/Table/TableTBody';
import TableTd from './tag/Table/TableTd';
import TableTFoot from './tag/Table/TableTFoot';
import TableTh from './tag/Table/TableTh';
import TableTr from './tag/Table/TableTr';
import NormalTableTag from './tag/Table/impl/NormalTableTag';
import ImgTag from './tag/ImgTag';
import SvgTag from './tag/SvgTag';
import InputNumber from './tag/Form/InputNumber';
import Header from './tag/Header';
import Footer from './tag/Footer';
import Main from './tag/Main';
import Section from './tag/Section';
import P from './tag/P';
import Span from './tag/Span';
import U from './tag/U';
import Ul from './tag/Ul';
import Ol from './tag/Ol';
import Li from './tag/Li';
import H2 from './tag/H2';
import H3 from './tag/H3';
import H4 from './tag/H4';
import H5 from './tag/H5';
import H6 from './tag/H6';
import B from './tag/B';
import Strong from './tag/Strong';
import LabelTag from './tag/LabelTag';
import AddressTag from './tag/AddressTag';
import Textarea from './tag/Form/Textarea';
import ATag from './tag/ATag';
import Br from './tag/Br';
import FormTag from './tag/Form/FormTag';
export default class HtmlTagFactory {

    api: ApiService


    constructor()
    {
        this.api = new DefaultApiService();
    }

    createrSynchronizer(){

    }

    createH1() {
        let el = new H1()
        el.setApi(this.api)

        return el
    }
    
    createH2() {
        let el = new H2()
        el.setApi(this.api)

        return el
    }
    
    createH3() {
        let el = new H3()
        el.setApi(this.api)

        return el
    }
    
    createH4() {
        let el = new H4()
        el.setApi(this.api)

        return el
    }
    
    createH5() {
        let el = new H5()
        el.setApi(this.api)

        return el
    }
    
    createH6() {
        let el = new H6()
        el.setApi(this.api)

        return el
    }
    
    createDiv() {
        let el = new Div()
        el.setApi(this.api)

        return el
    }
    
    createLabel() {
        let el = new LabelTag()
        el.setApi(this.api)

        return el
    }
    
    createAddress() {
        let el = new AddressTag()
        el.setApi(this.api)

        return el
    }
    
    createParagraph() {
        let el = new P()
        el.setApi(this.api)

        return el
    }
    
    createSpan() {
        let el = new Span()
        el.setApi(this.api)

        return el
    }
    
    createStrong() {
        let el = new Strong()
        el.setApi(this.api)

        return el
    }
    
    createB() {
        let el = new B()
        el.setApi(this.api)

        return el
    }
    
    createU() {
        let el = new U()
        el.setApi(this.api)

        return el
    }
    
    createUl() {
        let el = new Ul()
        el.setApi(this.api)

        return el
    }
    
    createOl() {
        let el = new Ol()
        el.setApi(this.api)

        return el
    }
    
    
    createLi() {
        let el = new Li()
        el.setApi(this.api)

        return el
    }
    

    createHeader() {
        let el = new Header()
        el.setApi(this.api)

        return el
    }
    
    createFooter() {
        let el = new Footer()
        el.setApi(this.api)

        return el
    }
    
    createMain() {
        let el = new Main()
        el.setApi(this.api)

        return el
    }

    createSection() {
        let el = new Section()
        el.setApi(this.api)

        return el
    }
    
    createInputText() {
        let el = new InputText()
        el.setApi(this.api)

        return el
    }
    
    createTextarea() {
        let el = new Textarea()
        el.setApi(this.api)

        return el
    }
    
    createFormTag() {
        let el = new FormTag()
        el.setApi(this.api)

        return el
    }
    
    createInputNumber() {
        let el = new InputNumber()
        el.setApi(this.api)

        return el
    }
    
    createButton() {
        let el = new Button()
        el.setApi(this.api)

        return el
    }
    
    createImage() {
        let el = new ImgTag()
        el.setApi(this.api)

        return el
    }
    
    createATag() {
        let el = new ATag()
        el.setApi(this.api)

        return el
    }
    
    createSvg() {
        let el = new SvgTag()
        el.setApi(this.api)

        return el
    }
    
    createText() {
        let el = new TextNode()
        el.setApi(this.api)

        return el
    }
    
    createNormalTable() {
        let el = new NormalTableTag()
        el.setApi(this.api)

        return el
    }
    
    createTable() {
        let el = new TableTag()
        el.setApi(this.api)

        return el
    }
    
    createTableTHead() {
        let el = new TableTHead()
        el.setApi(this.api)

        return el
    }
    
    createTableTBody() {
        let el = new TableTBody()
        el.setApi(this.api)

        return el
    }
    
    createTableTFoot() {
        let el = new TableTFoot()
        el.setApi(this.api)

        return el
    }
    
    createTableTr() {
        let el = new TableTr()
        el.setApi(this.api)

        return el
    }
    
    createTableTh() {
        let el = new TableTh()
        el.setApi(this.api)

        return el
    }
    
    createTableTd() {
        let el = new TableTd()
        el.setApi(this.api)

        return el
    }
    
    createBr() {
        let el = new Br()
        el.setApi(this.api)

        return el
    }
    
}