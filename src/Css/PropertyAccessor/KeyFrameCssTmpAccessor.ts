import CssPropertyAccessor from "../CssPropertyAccessor";
import ApiService from "~/src/Api/ApiService";
import HtmlTag from '../../Layout/HtmlTag';
import BasePropertyCss from "../BasePropertyCss";
import HtmlTagSynchronizer from "~/src/Synchronizer/Impl/HtmlTagSynchronizer";
import { PositionCss } from "..";
import LeftCss from '../Display/Direction/LeftCss';
import PseudoSelector from "~/src/PseudoSelector/PseudoSelector";
import KeyFrameSelector from '../../Animation/KeyFrameSelector';
import KeyFrame from '../../Animation/KeyFrame';
import { css } from 'js-beautify';

export default class KeyFrameCssTmpAccessor extends CssPropertyAccessor 
{
    protected keyFrame: KeyFrame
    protected selector: KeyFrameSelector
    protected value: HtmlTag = null

    constructor(tag: KeyFrame, selector: KeyFrameSelector)
    {
        super(null)
        this.selector = selector

    }

    public initTag(tag: HtmlTag) {
        this.value = tag
        for (const css of this.all) {
            // if () {

            // }
        }
    }
    public removePropWithName(name: string) {
        let prop = this.getProperty(name)

        
        let index = this.cssProps.indexOf(prop)

        if (index !== -1) {
            prop.setActive(false)
            this.cssProps.splice(index, 1);
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