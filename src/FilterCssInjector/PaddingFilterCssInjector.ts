import FilterCssInjector from "../FilterCssInjector";
import BasePropertyCss from "../Css/BasePropertyCss";
import PaddingModel from '../Layout/Padding/PaddingModel';
import LayoutEl from '../LayoutEl';
import PaddingLeft from '../Layout/Padding/PaddingLeft';
import PaddingRight from "../Layout/Padding/PaddingRight";
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import BasePaddingCss from '../Css/BoxModel/BasePaddingCss';
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
    
    protected htmlTag: HtmlTag


    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag

    }

    public createDefaultProp(propName: string): BasePropertyCss {
        switch (propName) {
            case PaddingLeftCss.PROP_NAME:
                return new PaddingLeftCss(this.htmlTag.paddingLeft.width, this.htmlTag.paddingLeft.widthUnit)
            case PaddingRightCss.PROP_NAME:
                return new PaddingRightCss(this.htmlTag.paddingRight.width, this.htmlTag.paddingRight.widthUnit)
            case PaddingTopCss.PROP_NAME:
                return new PaddingTopCss(this.htmlTag.paddingTop.width, this.htmlTag.paddingTop.widthUnit)
            case PaddingBottomCss.PROP_NAME:
                return new PaddingBottomCss(this.htmlTag.paddingBottom.width, this.htmlTag.paddingBottom.widthUnit)
            case PaddingCss.PROP_NAME:
                return new PaddingCss(this.htmlTag.paddingLeft.width, this.htmlTag.paddingLeft.widthUnit)
        }

        throw Error(`Can not create Default Padding from property name ${propName}`)

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

    public deactivateProp(cssProp: BasePropertyCss) {
        if (cssProp instanceof PaddingLeftCss) {
            this.htmlTag.paddingLeft.deactivate()
        } else if (cssProp instanceof PaddingRightCss) {
            this.htmlTag.paddingRight.deactivate()
        } else if (cssProp instanceof PaddingTopCss) {
            this.htmlTag.paddingTop.deactivate()
        } else if (cssProp instanceof PaddingBottomCss) {
            this.htmlTag.paddingBottom.deactivate()
        } else if (cssProp instanceof PaddingCss) {
            if (!this.htmlTag.cssAccessor.hasCssProperty(PaddingLeftCss.PROP_NAME)) {
                this.htmlTag.paddingLeft.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(PaddingRightCss.PROP_NAME)) {
                this.htmlTag.paddingRight.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(PaddingTopCss.PROP_NAME)) {
                this.htmlTag.paddingTop.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(PaddingBottomCss.PROP_NAME)) {
                this.htmlTag.paddingBottom.deactivate()
            }
            // this.htmlTag.paddingTop.deactivate()
            // this.htmlTag.paddingBottom.deactivate()
        }
        
    }
    public activateProp(cssProp: BasePaddingCss) {
        if (cssProp instanceof PaddingLeftCss) {
            this.htmlTag.paddingLeft.activate()
        } else if (cssProp instanceof PaddingRightCss) {
            this.htmlTag.paddingRight.activate()
        } else if (cssProp instanceof PaddingTopCss) {
            this.htmlTag.paddingTop.activate()
        } else if (cssProp instanceof PaddingBottomCss) {
            this.htmlTag.paddingBottom.activate()
        } else if (cssProp instanceof PaddingCss) {
            this.htmlTag.paddingLeft.activate()
            this.htmlTag.paddingRight.activate()
            this.htmlTag.paddingTop.activate()
            this.htmlTag.paddingBottom.activate()
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

        var leftProp = this.htmlTag.cssAccessor.getProperty(PaddingLeftCss.PROP_NAME)
        var rightProp = this.htmlTag.cssAccessor.getProperty(PaddingRightCss.PROP_NAME)
        var topProp = this.htmlTag.cssAccessor.getProperty(PaddingTopCss.PROP_NAME)
        var bottomProp = this.htmlTag.cssAccessor.getProperty(PaddingBottomCss.PROP_NAME)
        if (parseInt(right.getClearValue()) > -1 && !rightProp) {

            // if (!rightProp.isActive()) {

            this.htmlTag.paddingRight.width = parseInt(right.getClearValue())
            this.htmlTag.paddingRight.widthUnit = right.getUnit()
        }
        
        if (parseInt(left.getClearValue()) > -1 && !leftProp) {

            // if (!leftProp.isActive()) {
            this.htmlTag.paddingLeft.width = parseInt(left.getClearValue())
            this.htmlTag.paddingLeft.widthUnit = left.getUnit()

            // }
        }
        
        if (parseInt(top.getClearValue()) > -1 && !topProp) {

                this.htmlTag.paddingTop.width = parseInt(top.getClearValue())
                this.htmlTag.paddingTop.widthUnit = top.getUnit()
            
        }
        
        if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {

                this.htmlTag.paddingBottom.width = parseInt(bottom.getClearValue())
                this.htmlTag.paddingBottom.widthUnit = bottom.getUnit()
            
        }
    }
    
}