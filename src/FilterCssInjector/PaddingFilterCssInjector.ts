import FilterCssInjector from "../FilterCssInjector";
import BasePropertyCss from "../Css/BasePropertyCss";
import PaddingModel from '../Layout/Padding/PaddingModel';
import LayoutEl from '../LayoutEl';
import PaddingLeft from '../Layout/Padding/PaddingLeft';
import PaddingRight from "../Layout/Padding/PaddingRight";
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import BasePaddingCss from '../Css/BoxModel/BasePadding';
import Height from "../Css/Size/Height";
import PaddingTop from "../Layout/Padding/PaddingTop";
import PaddingBottom from '../Layout/Padding/PaddingBottom';
import PaddingCss from "../Css/BoxModel/Padding/PaddingCss";
import PaddingBottomCss from "../Css/BoxModel/Padding/PaddingBottomCss";
import PaddingTopCss from '../Css/BoxModel/Padding/PaddingTopCss';
import PaddingRightCss from '../Css/BoxModel/Padding/PaddingRightCss';
import PaddingLeftCss from "../Css/BoxModel/Padding/PaddingLeftCss";

export default class PaddingFilterCssInjector extends FilterCssInjector
{
    protected left: PaddingModel
    protected right: PaddingModel
    protected top: PaddingModel
    protected bottom: PaddingModel
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag

    }

    canInjectCssProperty(cssProp: BasePropertyCss): boolean
    {
        return cssProp instanceof BasePaddingCss
    }

    public injectCssProperty(cssProp: BasePropertyCss) {
        if (!this.canInjectCssProperty(cssProp)) {
            return
        }

        
        
        if (cssProp instanceof PaddingLeftCss) {
            this.updateVal(cssProp, this.htmlTag.paddingLeft)
        } else if (cssProp instanceof PaddingRightCss) {
            this.updateVal(cssProp, this.htmlTag.paddingRight)
        } else if (cssProp instanceof PaddingTopCss) {
            this.updateVal(cssProp, this.htmlTag.paddingTop)
            
        } else if (cssProp instanceof PaddingBottomCss) {
            this.updateVal(cssProp, this.htmlTag.paddingBottom)
            
        } else if (cssProp instanceof PaddingCss) {
            this.updateAllDirectionsVal(cssProp)
        }

    }
    updateVal(cssProp: BasePropertyCss, paddingModel: PaddingModel) {
        var prop: BasePropertyCss
        if (paddingModel instanceof PaddingLeft ||  paddingModel instanceof PaddingRight) {
            prop = new Width(cssProp.getClearValue(), cssProp.getUnit());
        } else {
            prop = new Height(cssProp.getClearValue(), cssProp.getUnit());

        }
        if (parseInt(prop.getClearValue()) > -1) {
            
            paddingModel.width = parseInt(prop.getClearValue())
            paddingModel.widthUnit = prop.getUnit()
        }

        // paddingModel.updateCssProperty(prop.getName(), prop)
    }
    
    
    updateAllDirectionsVal(cssProp: PaddingCss) {
        var top: BasePropertyCss = new Height(cssProp.top, cssProp.getUnit());
        var bottom: BasePropertyCss = new Height(cssProp.bottom, cssProp.getUnit());
        
        var left: BasePropertyCss = new Width(cssProp.left, cssProp.getUnit());
        var right: BasePropertyCss = new Width(cssProp.right, cssProp.getUnit());
        if (parseInt(right.getClearValue()) > -1) {

            this.htmlTag.paddingRight.width = parseInt(right.getClearValue())
            this.htmlTag.paddingRight.widthUnit = right.getUnit()
        }

        // console.log(parseInt(right.getClearValue()));
        // console.log(right.getUnit());
        
        // this.htmlTag.paddingLeft.updateCssProperty(left.getName(), left)
        // this.htmlTag.paddingTop.updateCssProperty(top.getName(), top)
        // this.htmlTag.paddingBottom.updateCssProperty(bottom.getName(), bottom)
    }
    
}