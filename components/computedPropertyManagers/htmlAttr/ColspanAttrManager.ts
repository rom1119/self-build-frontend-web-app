import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import HtmlAttrManager from '../HtmlAttrManager';


export default class ColspanAttrManager extends HtmlAttrManager<ColspanAttr>{
    protected createInitAttr(): ColspanAttr {
        return new ColspanAttr(1)
    }
}
