import H1 from './tag/H1';
import ApiService from '../Api/ApiService';
import DefaultApiService from '../Api/impl/DefaultApiService';
import TextNode from './TextNode';
import Div from './tag/Div';
import InputText from './tag/Form/InputText';
import Button from './tag/Button';
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
    
    createButton() {
        let el = new Button()
        el.setApi(this.api)

        return el
    }
    
    createText() {
        let el = new TextNode()
        el.setApi(this.api)

        return el
    }
    
}