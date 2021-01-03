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

import * as libCss from "~/src/DecisionManager/cssIndex";


export default class CssDecisionObjectFactory {

    protected cssFactory: CssPropertyFactoryFromName

    constructor() {
        this.cssFactory = new CssPropertyFactoryFromName()
    }

    create(name: string): CssDecisionObject
    {
        var prop = this.cssFactory.create(name)
        var cssProps = libCss;
        var name = name.replace(/\.?([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "")

        // console.log(name);

        for (const cssPropClass in cssProps) {
            // console.log(cssProps[cssPropClass].PROP_NAME);

            if (cssProps[cssPropClass].NAME === name) {
                return new cssProps[cssPropClass]
            }
        }

        return new DefaultCSSObject(prop)
    }
}
