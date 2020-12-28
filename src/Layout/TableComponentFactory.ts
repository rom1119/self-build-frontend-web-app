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
export default class TableComponentFactory {

    api: ApiService

    constructor(api: ApiService)
    {
        this.api = api;
    }

    createrSynchronizer(){

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

    createExampleTr() {

        var trbody  = new TableTr()
        // var cell = new TableTd('content example')
        // var cellsec = new TableTd('content example')
        // trbody.appendChild(cell)
        // trbody.appendChild(cellsec)

        trbody.setApi(this.api)

        return trbody
    }

    createExampleTd() {

        var cell = new TableTd('content example')
        cell.setApi(this.api)

        return cell
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
