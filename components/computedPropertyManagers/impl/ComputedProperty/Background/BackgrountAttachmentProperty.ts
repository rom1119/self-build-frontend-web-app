import ComputedPropertyManager from "../../../ComputedPropertyManager";
import HtmlTag from "~/src/Layout/HtmlTag";
import BasePropertyCss from "~/src/Css/BasePropertyCss";
import { BackgroundImage, BackgroundPosition, BackgroundSize, BackgroundRepeat, BackgroundAttachment } from '~/src/Css';
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Named } from "~/src/Unit";
import Unit from "~/src/Unit/Unit";

export default class BackgroundAttachmentProperty extends BaseComputedPropertyManager<BackgroundAttachment> {

    protected value: HtmlTag
    DEFAULT_VAL = BackgroundAttachment.INITIAL
    DEFAULT_UNIT = new Named()
    property: BackgroundSize = new BackgroundAttachment(this.DEFAULT_VAL, this.DEFAULT_UNIT)

    getDefaultVal(): any {
        return this.DEFAULT_VAL
    }
    getDefaultUnit(): Unit {
        return this.DEFAULT_UNIT
    }
}