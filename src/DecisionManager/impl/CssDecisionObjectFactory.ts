import { Switch } from "element-ui";
import CssPropertyFactoryFromName from "~/src/Factory/CssPropertyFactoryFromName";
import CssDecisionObject from '../decisionObjects/CssDecisionObject';
import MarginCss from '../../Css/BoxModel/Margin/MarginCss';
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import MarginObject from '../decisionObjects/MarginObject';
import DefaultCSSObject from "../decisionObjects/DefaultCSSObject";
import ContentSizeCss from '../../Css/Size/ContentSizeCss';
import Width from '../../Css/Size/Width';
import { Height } from "~/src/Css";
import HeightObject from "../decisionObjects/HeightObject";
import WidthObject from "../decisionObjects/WidthObject";

export default class CssDecisionObjectFactory {

    protected cssFactory: CssPropertyFactoryFromName

    constructor() {
        this.cssFactory = new CssPropertyFactoryFromName()
    }

    create(name: string): CssDecisionObject
    {
        var prop = this.cssFactory.create(name)
        if (name.toLowerCase().indexOf(BaseMarginCss.PROP_NAME) > -1) {
            return new MarginObject(prop) 
        } else if (name.toLowerCase().indexOf(Width.PROP_NAME) > -1) {
            return new WidthObject(prop) 
        } else if (name.toLowerCase().indexOf(Height.PROP_NAME) > -1) {
            return new HeightObject(prop) 
        }

        return new DefaultCSSObject(prop)
    }
}