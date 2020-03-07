import CssPropertyAccessor from "../CssPropertyAccessor";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';
import BasePropertyCss from "../BasePropertyCss";
import HtmlTagSynchronizer from "~/src/Synchronizer/Impl/HtmlTagSynchronizer";

export default class HtmlTagPropertyAccessor extends CssPropertyAccessor 
{
    protected value: HtmlTag

    constructor(tag: HtmlTag)
    {
        super(tag)

    }




    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssPropertyAccessor
    {
        super.setNewPropertyValue(propName, newVal)        

        return this
    }

    public addNewProperty(newProp: BasePropertyCss): CssPropertyAccessor
    {
        super.addNewProperty(newProp)


        return this
    }


}