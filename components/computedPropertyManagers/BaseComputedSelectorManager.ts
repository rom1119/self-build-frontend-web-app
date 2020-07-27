import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage } from "~/src/Css";
import ComputedPropertyManager from "./ComputedPropertyManager";
import FetcherRealCssProp from '../../src/FetcherRealCssProp';
import UnitUrl from '../../src/Unit/UnitUrl';
import _ from 'lodash'
import Unit from '../../src/Unit/Unit';
import CssResource from '../../src/Css/CssResource';
import PseudoSelector from '../../src/PseudoSelector/PseudoSelector';


export default abstract class BaseComputedSelectorManager<T extends PseudoSelector> {

    protected value: HtmlTag
    
    protected selector: T

    abstract getDefaultPseudoSelector(): T;

    constructor(arg: T) {
        
    }

    getSelectors(): T[]
    {
        return []
    }
    

    public getHtmlTag()
    {
        return this.value
    }
    

    public setHtmlEl(val: HtmlTag)
    {
        this.value = val
    }
    
    public addSelector(arg: T)
    {

    }

}