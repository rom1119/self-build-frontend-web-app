import H1 from './tag/H1';
import ApiService from '../Api/ApiService';
import DefaultApiService from '../Api/impl/DefaultApiService';
import TextNode from './TextNode';
export default class HtmlTagFactory {

    api: ApiService

    constructor()
    {
        this.api = new DefaultApiService();

    }

    createH1() {
        let el = new H1()
        el.setApi(this.api)

        return el
    }
    
    createText() {
        let el = new TextNode()
        el.setApi(this.api)

        return el
    }
    
}