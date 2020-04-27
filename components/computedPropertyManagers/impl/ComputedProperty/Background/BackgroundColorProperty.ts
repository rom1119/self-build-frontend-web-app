import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage } from "~/src/Css";
import UnitUrl from "~/src/Unit/UnitUrl";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import Unit from "~/src/Unit/Unit";
import BackgroundColor from '../../../../../src/Css/Background/BackgroundColor';

export default class BackgroundColorProperty extends BaseComputedPropertyManager<BackgroundColor> {
    
    protected value: HtmlTag
    DEFAULT_VAL = 0
    DEFAULT_UNIT: Unit = new UnitUrl()
    property: BackgroundColor = new BackgroundColor(this.DEFAULT_VAL, this.DEFAULT_UNIT)
   
    constructor(  )
    {
        super()
        this.getProperty().setActive(false)

    }

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }

}