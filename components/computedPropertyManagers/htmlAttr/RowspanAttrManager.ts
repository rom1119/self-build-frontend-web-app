import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import RowspanAttr from '~/src/Attribute/html/RowspanAttr';
import HtmlAttrManager from '../HtmlAttrManager';


export default class RowspanAttrManager extends HtmlAttrManager<RowspanAttr>{

    protected createInitAttr(): RowspanAttr {
        return new RowspanAttr(1)
    }
}
