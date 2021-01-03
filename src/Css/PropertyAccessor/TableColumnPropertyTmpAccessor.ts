import CssPropertyAccessor from "../CssPropertyAccessor";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';
import BasePropertyCss from "../BasePropertyCss";
import HtmlTagSynchronizer from "~/src/Synchronizer/Impl/HtmlTagSynchronizer";
import { PositionCss } from "..";
import LeftCss from '../Display/Direction/LeftCss';
import TableElementEl from "~/src/Layout/tag/Table/elements/TableElement";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";

export default class TableColumnPropertyTmpAccessor extends CssPropertyAccessor
{
    protected value: TableColumnEl

    constructor(tag: TableColumnEl)
    {
        super(tag)

    }

    public removePropWithName(name: string) {
        let prop = this.getProperty(name)

        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            prop.setActive(false)
            this.cssProps.splice(index, 1);
        }

        for (var i = 0; i < this.value.children.length; i++) {
            var child = this.value.children[i]
            child.removeCssPropertyByName(name)

        }

    }


    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssPropertyAccessor
    {
        super.setNewPropertyValue(propName, newVal)

        for (var i = 0; i < this.value.children.length; i++) {
            var cp = newVal.deepCopy(newVal)
            var child = this.value.children[i]
            child.cssAccessor.setNewPropertyValue(propName, cp)

        }
        return this
    }

    public addNewProperty(newProp: BasePropertyCss): CssPropertyAccessor
    {

        super.addNewProperty(newProp)
        for (var i = 0; i < this.value.children.length; i++) {
            var cp = newProp.deepCopy(newProp)
            var child = this.value.children[i]
            if (child.cssAccessor.hasCssProperty(cp.getName())) {
                continue
            }
            child.cssAccessor.addNewProperty(cp)

        }


        return this
    }


}
