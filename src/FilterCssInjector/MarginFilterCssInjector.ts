import FilterCssInjector from "../FilterCssInjector";
import BasePropertyCss from "../Css/BasePropertyCss";
import MarginModel from '../Layout/Margin/MarginModel';
import LayoutEl from '../LayoutEl';
import MarginLeft from '../Layout/Margin/MarginLeft';
import MarginRight from "../Layout/Margin/MarginRight";
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import BaseMarginCss from '../Css/BoxModel/BaseMarginCss';
import Height from "../Css/Size/Height";
import MarginTop from "../Layout/Margin/MarginTop";
import MarginBottom from '../Layout/Margin/MarginBottom';
import MarginCss from "../Css/BoxModel/Margin/MarginCss";
import MarginBottomCss from "../Css/BoxModel/Margin/MarginBottomCss";
import MarginTopCss from '../Css/BoxModel/Margin/MarginTopCss';
import MarginRightCss from '../Css/BoxModel/Margin/MarginRightCss';
import MarginLeftCss from "../Css/BoxModel/Margin/MarginLeftCss";

export default class MarginFilterCssInjector extends FilterCssInjector
{
    
    protected htmlTag: HtmlTag


    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag

    }

    public createDefaultProp(propName: string): BasePropertyCss {
        switch (propName) {
            case MarginLeftCss.PROP_NAME:
                return new MarginLeftCss(this.htmlTag.marginLeft.width, this.htmlTag.marginLeft.widthUnit)
            case MarginRightCss.PROP_NAME:
                return new MarginRightCss(this.htmlTag.marginRight.width, this.htmlTag.marginRight.widthUnit)
            case MarginTopCss.PROP_NAME:
                return new MarginTopCss(this.htmlTag.marginTop.width, this.htmlTag.marginTop.widthUnit)
            case MarginBottomCss.PROP_NAME:
                return new MarginBottomCss(this.htmlTag.marginBottom.width, this.htmlTag.marginBottom.widthUnit)
            case MarginCss.PROP_NAME:
                return new MarginCss(this.htmlTag.marginLeft.width, this.htmlTag.marginLeft.widthUnit)
        }

        throw Error(`Can not create Default Margin from property name ${propName}`)


    }

    canInjectCssProperty(cssProp: BasePropertyCss): boolean
    {
        return cssProp instanceof BaseMarginCss
    }

    public injectCssProperty(cssProp: BasePropertyCss) {
        if (!this.canInjectCssProperty(cssProp)) {
            return
        }
        
        if (cssProp instanceof MarginLeftCss) {
            this.updateVal(cssProp, this.htmlTag.marginLeft)
        } else if (cssProp instanceof MarginRightCss) {
            this.updateVal(cssProp, this.htmlTag.marginRight)
        } else if (cssProp instanceof MarginTopCss) {
            this.updateVal(cssProp, this.htmlTag.marginTop)
            
        } else if (cssProp instanceof MarginBottomCss) {
            this.updateVal(cssProp, this.htmlTag.marginBottom)
            
        } else if (cssProp instanceof MarginCss) {
            this.updateAllDirectionsVal(cssProp)
        }

    }

    public deactivateProp(cssProp: BasePropertyCss) {
        if (cssProp instanceof MarginLeftCss) {
            this.htmlTag.marginLeft.deactivate()
        } else if (cssProp instanceof MarginRightCss) {
            this.htmlTag.marginRight.deactivate()
        } else if (cssProp instanceof MarginTopCss) {
            this.htmlTag.marginTop.deactivate()
        } else if (cssProp instanceof MarginBottomCss) {
            this.htmlTag.marginBottom.deactivate()
        } else if (cssProp instanceof MarginCss) {
            if (!this.htmlTag.cssAccessor.hasCssProperty(MarginLeftCss.PROP_NAME)) {
                this.htmlTag.marginLeft.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(MarginRightCss.PROP_NAME)) {
                this.htmlTag.marginRight.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(MarginTopCss.PROP_NAME)) {
                this.htmlTag.marginTop.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(MarginBottomCss.PROP_NAME)) {
                this.htmlTag.marginBottom.deactivate()
            }
            // this.htmlTag.marginTop.deactivate()
            // this.htmlTag.marginBottom.deactivate()
        }
        
    }
    public activateProp(cssProp: BaseMarginCss) {
        if (cssProp instanceof MarginLeftCss) {
            this.htmlTag.marginLeft.activate()
        } else if (cssProp instanceof MarginRightCss) {
            this.htmlTag.marginRight.activate()
        } else if (cssProp instanceof MarginTopCss) {
            this.htmlTag.marginTop.activate()
        } else if (cssProp instanceof MarginBottomCss) {
            this.htmlTag.marginBottom.activate()
        } else if (cssProp instanceof MarginCss) {
            this.htmlTag.marginLeft.activate()
            this.htmlTag.marginRight.activate()
            this.htmlTag.marginTop.activate()
            this.htmlTag.marginBottom.activate()
        }
    }

    updateVal(cssProp: BasePropertyCss, marginModel: MarginModel) {
        var prop: BasePropertyCss
        if (marginModel instanceof MarginLeft ||  marginModel instanceof MarginRight) {
            prop = new Width(cssProp.getClearValue(), cssProp.getUnit());
        } else {
            prop = new Height(cssProp.getClearValue(), cssProp.getUnit());

        }
        if (parseInt(prop.getClearValue()) > -1) {
            
            marginModel.width = parseInt(prop.getClearValue())
            marginModel.widthUnit = prop.getUnit()
        }

        // marginModel.updateCssProperty(prop.getName(), prop)
    }
    
    
    updateAllDirectionsVal(cssProp: MarginCss) {
        var top: BasePropertyCss = new Height(cssProp.top, cssProp.getUnit());
        var bottom: BasePropertyCss = new Height(cssProp.bottom, cssProp.getUnit());
        
        var left: BasePropertyCss = new Width(cssProp.left, cssProp.getUnit());
        var right: BasePropertyCss = new Width(cssProp.right, cssProp.getUnit());

        var leftProp = this.htmlTag.cssAccessor.hasCssProperty(MarginLeftCss.PROP_NAME)
        var rightProp = this.htmlTag.cssAccessor.hasCssProperty(MarginRightCss.PROP_NAME)
        var topProp = this.htmlTag.cssAccessor.hasCssProperty(MarginTopCss.PROP_NAME)
        var bottomProp = this.htmlTag.cssAccessor.hasCssProperty(MarginBottomCss.PROP_NAME)
        if (parseInt(right.getClearValue()) > -1 && !rightProp) {

            this.htmlTag.marginRight.width = parseInt(right.getClearValue())
            this.htmlTag.marginRight.widthUnit = right.getUnit()
        }
        
        if (parseInt(left.getClearValue()) > -1 && !leftProp) {

            this.htmlTag.marginLeft.width = parseInt(left.getClearValue())
            this.htmlTag.marginLeft.widthUnit = left.getUnit()
        }
        
        if (parseInt(top.getClearValue()) > -1 && !topProp) {

            this.htmlTag.marginTop.width = parseInt(top.getClearValue())
            this.htmlTag.marginTop.widthUnit = top.getUnit()
        }
        
        if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {

            this.htmlTag.marginBottom.width = parseInt(bottom.getClearValue())
            this.htmlTag.marginBottom.widthUnit = bottom.getUnit()
        }
    }
    
}