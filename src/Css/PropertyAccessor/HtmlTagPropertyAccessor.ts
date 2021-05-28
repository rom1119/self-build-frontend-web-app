import CssPropertyAccessor from "../CssPropertyAccessor";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';
import BasePropertyCss from "../BasePropertyCss";
import HtmlTagSynchronizer from "~/src/Synchronizer/Impl/HtmlTagSynchronizer";
import { PositionCss } from "..";
import LeftCss from '../Display/Direction/LeftCss';
import BoxSizing from '../BoxModel/BoxSizing';

export default class HtmlTagPropertyAccessor extends CssPropertyAccessor 
{
    protected value: HtmlTag

    constructor(tag: HtmlTag)
    {
        super(tag)

    }

    public removePropWithName(name: string) {
        let prop = this.getProperty(name)

        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            prop.setActive(false)
            this.cssProps.splice(index, 1);

            if (prop instanceof BoxSizing) {
                this.value.boxSizing = null
            }
        }

        if (prop instanceof PositionCss) {
            this.value.hasPosition = false
        }
    }


    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssPropertyAccessor
    {
        super.setNewPropertyValue(propName, newVal)        
        this.value.updateHasPosition(newVal)

        return this
    }

    public addNewProperty(newProp: BasePropertyCss): CssPropertyAccessor
    {

        super.addNewProperty(newProp)
        this.value.updateHasPosition(newProp)



        return this
    }


}