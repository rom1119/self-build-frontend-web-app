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
import OffsetCalculator from "../Calculator/OffsetCalculator";
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';

export default class MarginFilterCssInjector extends FilterCssInjector
{
    
    protected htmlTag: HtmlTag
    protected offsetCalculator: OffsetCalculator<MarginModel>


    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag
        this.offsetCalculator = new MarginOffsetCalculator(htmlTag)

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

    private updateOffset(cssProp: BaseMarginCss) {
        if (cssProp instanceof MarginLeftCss) {
            this.updateLeftOffset()
        } else if (cssProp instanceof MarginRightCss) {
            this.updateRightOffset()
        } else if (cssProp instanceof MarginTopCss) {
            this.updateTopOffset()
            
        } else if (cssProp instanceof MarginBottomCss) {
            this.updateBottomOffset()
            
        } else if (cssProp instanceof MarginCss) {
            this.updateLeftOffset()
            this.updateRightOffset()
            this.updateTopOffset()
            this.updateBottomOffset()
            
        }
    }

    private updateLeftOffset()
    {
        let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
        let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
        let newOff = -Math.abs(this.htmlTag.marginLeft.width + paddingLeftWidth + borderLeftWidth)
        this.htmlTag.marginLeft.offset =newOff
    }
    
    private updateRightOffset()
    {
        let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
        let borderRightWidth = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
        let newOff = -Math.abs(this.htmlTag.marginRight.width + paddingRightWidth + borderRightWidth)
        this.htmlTag.marginRight.offset =newOff
    }
    
    private updateTopOffset()
    {
        let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
        let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
        let newOff = -Math.abs(this.htmlTag.marginTop.width + paddingTopWidth + borderTopWidth)
        this.htmlTag.marginTop.offset =newOff
    }
    
    private updateBottomOffset()
    {
        let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
        let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
        let newOff = -Math.abs(this.htmlTag.marginBottom.width + paddingBottomWidth + borderBottomWidth)
        this.htmlTag.marginBottom.offset =newOff
    }

    private updateVal(cssProp: BasePropertyCss, marginModel: MarginModel) {
        var prop: BasePropertyCss
        if (marginModel instanceof MarginLeft ||  marginModel instanceof MarginRight) {
            prop = new Width(cssProp.getClearValue(), cssProp.getUnit());
        } else {
            prop = new Height(cssProp.getClearValue(), cssProp.getUnit());

        }
        if (parseInt(prop.getClearValue()) > -1) {
            
            marginModel.width = parseInt(prop.getClearValue())
            marginModel.widthUnit = prop.getUnit()
            marginModel.offset = this.offsetCalculator.calculate(marginModel)
        }
        // marginModel.updateCssProperty(prop.getName(), prop)
    }
    
    
    private updateAllDirectionsVal(cssProp: MarginCss) {
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
            this.htmlTag.marginRight.offset = this.offsetCalculator.calculate(this.htmlTag.marginRight)

        }
        
        if (parseInt(left.getClearValue()) > -1 && !leftProp) {

            this.htmlTag.marginLeft.width = parseInt(left.getClearValue())
            this.htmlTag.marginLeft.widthUnit = left.getUnit()
            this.htmlTag.marginLeft.offset = this.offsetCalculator.calculate(this.htmlTag.marginLeft)

        }
        
        if (parseInt(top.getClearValue()) > -1 && !topProp) {

            this.htmlTag.marginTop.width = parseInt(top.getClearValue())
            this.htmlTag.marginTop.widthUnit = top.getUnit()
            this.htmlTag.marginTop.offset = this.offsetCalculator.calculate(this.htmlTag.marginTop)

        }
        
        if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {

            this.htmlTag.marginBottom.width = parseInt(bottom.getClearValue())
            this.htmlTag.marginBottom.widthUnit = bottom.getUnit()
            this.htmlTag.marginBottom.offset = this.offsetCalculator.calculate(this.htmlTag.marginBottom)

        }
    }
    
}