import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import CustomAttr from '~/src/Attribute/html/CustomAttr';
import HtmlAttrManager from '../HtmlAttrManager';


export default class CustomAttrManager extends HtmlAttrManager{
    protected createInitAttr(): CustomAttr {
        return new CustomAttr(CustomAttr.DEFAULT_ATTR, '')
    }

}
