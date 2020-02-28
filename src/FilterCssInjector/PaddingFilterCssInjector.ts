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
import OffsetCalculator from "../Calculator/OffsetCalculator";
import PaddingOffsetCalculator from "../Calculator/Offset/PaddingOffsetCalculator";

export default class PaddingFilterCssInjector extends FilterCssInjector
{
    protected htmlTag: HtmlTag
    protected offsetCalculator: OffsetCalculator<PaddingModel>

    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag
        this.offsetCalculator = new PaddingOffsetCalculator(htmlTag)
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

    // private updateOffset(cssProp: BasePaddingCss) {
    //     if (cssProp instanceof PaddingLeftCss) {
    //         this.updateLeftOffset()
    //     } else if (cssProp instanceof PaddingRightCss) {
    //         this.updateRightOffset()
    //     } else if (cssProp instanceof PaddingTopCss) {
    //         this.updateTopOffset()
            
    //     } else if (cssProp instanceof PaddingBottomCss) {
    //         this.updateBottomOffset()
            
    //     } else if (cssProp instanceof PaddingCss) {
    //         this.updateLeftOffset()
    //         this.updateRightOffset()
    //         this.updateTopOffset()
    //         this.updateBottomOffset()
            
    //     }
    // }

    // private updateLeftOffset()
    // {
    //     // let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
    //     // let borderLeftWidth = this.htmlTag.borderLeft.isActive() ? this.htmlTag.borderLeft.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginLeft.width )
    //     this.htmlTag.paddingLeft.offset =newOff
    // }
    
    // private updateRightOffset()
    // {
    //     // let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
    //     // let borderRightWidth = this.htmlTag.borderRight.isActive() ? this.htmlTag.borderRight.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginRight.width)
    //     this.htmlTag.marginRight.offset =newOff
    // }
    
    // private updateTopOffset()
    // {
    //     // let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
    //     // let borderTopWidth = this.htmlTag.borderTop.isActive() ? this.htmlTag.borderTop.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginTop.width)
    //     this.htmlTag.marginTop.offset =newOff
    // }
    
    // private updateBottomOffset()
    // {
    //     // let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
    //     // let borderBottomWidth = this.htmlTag.borderBottom.isActive() ? this.htmlTag.borderBottom.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginBottom.width)
    //     this.htmlTag.marginBottom.offset =newOff
    // }


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
            paddingModel.offset = this.offsetCalculator.calculateOffset(paddingModel)
            paddingModel.activate()
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
            this.htmlTag.paddingRight.offset = this.offsetCalculator.calculateOffset(this.htmlTag.paddingRight)
            this.htmlTag.paddingRight.activate()
        }
        
        if (parseInt(left.getClearValue()) > -1 && !leftProp) {

            // if (!leftProp.isActive()) {
            this.htmlTag.paddingLeft.width = parseInt(left.getClearValue())
            this.htmlTag.paddingLeft.widthUnit = left.getUnit()
            this.htmlTag.paddingLeft.offset = this.offsetCalculator.calculateOffset(this.htmlTag.paddingLeft)
            this.htmlTag.paddingLeft.activate()

            // }
        }
        
        if (parseInt(top.getClearValue()) > -1 && !topProp) {

            this.htmlTag.paddingTop.width = parseInt(top.getClearValue())
            this.htmlTag.paddingTop.widthUnit = top.getUnit()
            this.htmlTag.paddingTop.offset = this.offsetCalculator.calculateOffset(this.htmlTag.paddingTop)
            this.htmlTag.paddingTop.activate()

        }
        
        if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {

            this.htmlTag.paddingBottom.width = parseInt(bottom.getClearValue())
            this.htmlTag.paddingBottom.widthUnit = bottom.getUnit()
            this.htmlTag.paddingBottom.offset = this.offsetCalculator.calculateOffset(this.htmlTag.paddingBottom)
            this.htmlTag.paddingBottom.activate()

        }
    }
    
}