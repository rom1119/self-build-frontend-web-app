import CssPropertyAccessor from "../CssPropertyAccessor";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';
import BasePropertyCss from "../BasePropertyCss";
import HtmlTagSynchronizer from "~/src/Synchronizer/Impl/HtmlTagSynchronizer";
import { PositionCss } from "..";
import LeftCss from '../Display/Direction/LeftCss';
import PseudoSelector from "~/src/PseudoSelector/PseudoSelector";
import KeyFrameSelector from '../../Animation/KeyFrameSelector';

export default class KeyFrameCssAccessor extends CssPropertyAccessor 
{
    protected value: HtmlTag
    protected selector: KeyFrameSelector

    constructor(tag: HtmlTag, selector: KeyFrameSelector)
    {
        super(tag)
        this.selector = selector

    }

    public removePropWithName(name: string) {
        let prop = this.getProperty(name)

        let index = this.cssProps.indexOf(prop)
        if (index !== -1) {
            prop.setActive(false)
            this.cssProps.splice(index, 1);
        }

        if (prop instanceof PositionCss) {
            this.value.hasPosition = false
        }
    }


    public setNewPropertyValue(propName: string, newVal: BasePropertyCss): CssPropertyAccessor
    {
        super.setNewPropertyValue(propName, newVal)  
        if (this.value) {
            this.value.updateHasPosition(newVal)

        }

        return this
    }

    public addNewProperty(newProp: BasePropertyCss): CssPropertyAccessor
    {

        super.addNewProperty(newProp)
        if (this.value) {

            this.value.updateHasPosition(newProp)

        }


        return this
    }


}