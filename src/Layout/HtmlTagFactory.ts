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
    
    createDiv() {
        let el = new Div()
        el.setApi(this.api)

        return el
    }
    
    createInputText() {
        let el = new InputText()
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
    
}