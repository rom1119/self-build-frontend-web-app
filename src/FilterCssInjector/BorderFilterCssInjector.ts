import FilterCssInjector from "../FilterCssInjector";
import BasePropertyCss from "../Css/BasePropertyCss";
import BorderModel from '../Layout/Border/BorderModel';
import LayoutEl from '../LayoutEl';
import BorderLeft from '../Layout/Border/BorderLeft';
import BorderRight from "../Layout/Border/BorderRight";
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import Height from "../Css/Size/Height";
import BorderTop from "../Layout/Border/BorderTop";
import BorderBottom from '../Layout/Border/BorderBottom';
import BorderBottomCss from "../Css/Border/Bottom/BorderBottomCss";
import BorderTopCss from '../Css/Border/Top/BorderTopCss';
import BorderRightCss from '../Css/Border/Right/BorderRightCss';
import BorderLeftCss from "../Css/Border/Left/BorderLeftCss";
import BaseBorderCss from "../Css/Border/BaseBorderCss";
import BorderGlobalCss from "../Css/Border/Global/BorderGlobalCss";
import OffsetCalculator from "../Calculator/OffsetCalculator";
import BorderOffsetCalculator from "../Calculator/Offset/BorderOffsetCalculator";
import MarginOffsetCalculator from "../Calculator/Offset/MarginOffsetCalculator";
import BorderSizeCalculator from "../Calculator/Size/BorderSizeCalculator";
import SizeCalculator from "../Calculator/SizeCalculator";
import OffsetSizeCalculator from "../Calculator/OffsetSizeCalculator";
import BorderOffsetSizeCalculator from "../Calculator/OffsetSize/BorderOffsetSizeCalculator";

export default class BorderFilterCssInjector extends FilterCssInjector
{ 
    protected htmlTag: HtmlTag
    protected offsetCalculator: OffsetCalculator<BorderModel>
    protected offsetSizeCalculator: OffsetSizeCalculator<BorderModel>
    protected sizeCalculator: SizeCalculator<BorderModel>

    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag
        this.offsetCalculator = new BorderOffsetCalculator(htmlTag)
        this.offsetSizeCalculator = new BorderOffsetSizeCalculator(htmlTag)
        this.sizeCalculator = new BorderSizeCalculator(htmlTag)

    }

    public createDefaultProp(propName: string): BasePropertyCss {
        switch (propName) {
            case BorderLeftCss.PROP_NAME:
                return new BorderLeftCss(this.htmlTag.borderLeft.width, this.htmlTag.borderLeft.widthUnit)
            case BorderRightCss.PROP_NAME:
                return new BorderRightCss(this.htmlTag.borderRight.width, this.htmlTag.borderRight.widthUnit)
            case BorderTopCss.PROP_NAME:
                return new BorderTopCss(this.htmlTag.borderTop.width, this.htmlTag.borderTop.widthUnit)
            case BorderBottomCss.PROP_NAME:
                return new BorderBottomCss(this.htmlTag.borderBottom.width, this.htmlTag.borderBottom.widthUnit)
            case BorderGlobalCss.PROP_NAME:
                return new BorderGlobalCss(this.htmlTag.borderLeft.width, this.htmlTag.borderLeft.widthUnit)
        }

        throw Error(`Can not create Default Border from property name ${propName}`)

    }

    canInjectCssProperty(cssProp: BasePropertyCss): boolean
    {
        return cssProp instanceof BaseBorderCss
    }

    public injectCssProperty(cssProp: BasePropertyCss) {
        if (!this.canInjectCssProperty(cssProp)) {
            return
        }
        
        if (cssProp instanceof BorderLeftCss) {
            this.updateVal(cssProp, this.htmlTag.borderLeft)
        } else if (cssProp instanceof BorderRightCss) {
            this.updateVal(cssProp, this.htmlTag.borderRight)
            
        } else if (cssProp instanceof BorderTopCss) {
            this.updateVal(cssProp, this.htmlTag.borderTop)
            
        } else if (cssProp instanceof BorderBottomCss) {
            this.updateVal(cssProp, this.htmlTag.borderBottom)
            
        } else if (cssProp instanceof BorderGlobalCss) {
            this.updateAllDirectionsVal(cssProp)
        }

    }

    public deactivateProp(cssProp: BasePropertyCss) {
        if (cssProp instanceof BorderLeftCss) {
            this.htmlTag.borderLeft.deactivate()
        } else if (cssProp instanceof BorderRightCss) {
            this.htmlTag.borderRight.deactivate()
        } else if (cssProp instanceof BorderTopCss) {
            this.htmlTag.borderTop.deactivate()
        } else if (cssProp instanceof BorderBottomCss) {
            this.htmlTag.borderBottom.deactivate()
        } else if (cssProp instanceof BorderGlobalCss) {
            if (!this.htmlTag.cssAccessor.hasCssProperty(BorderLeftCss.PROP_NAME)) {
                this.htmlTag.borderLeft.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(BorderRightCss.PROP_NAME)) {
                this.htmlTag.borderRight.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(BorderTopCss.PROP_NAME)) {
                this.htmlTag.borderTop.deactivate()
            }
            if (!this.htmlTag.cssAccessor.hasCssProperty(BorderBottomCss.PROP_NAME)) {
                this.htmlTag.borderBottom.deactivate()
            }
            // this.htmlTag.borderTop.deactivate()
            // this.htmlTag.borderBottom.deactivate()
        }
        
    }
    public activateProp(cssProp: BaseBorderCss) {
        if (cssProp instanceof BorderLeftCss) {
            this.htmlTag.borderLeft.activate()
        } else if (cssProp instanceof BorderRightCss) {
            this.htmlTag.borderRight.activate()
        } else if (cssProp instanceof BorderTopCss) {
            this.htmlTag.borderTop.activate()
        } else if (cssProp instanceof BorderBottomCss) {
            this.htmlTag.borderBottom.activate()
        } else if (cssProp instanceof BorderGlobalCss) {
            this.htmlTag.borderLeft.activate()
            this.htmlTag.borderRight.activate()
            this.htmlTag.borderTop.activate()
            this.htmlTag.borderBottom.activate()
        }
    }

    // private updateOffset(cssProp: BaseBorderCss) {
    //     if (cssProp instanceof BorderLeftCss) {
    //         this.updateLeftOffset()
    //     } else if (cssProp instanceof BorderRightCss) {
    //         this.updateRightOffset()
    //     } else if (cssProp instanceof BorderTopCss) {
    //         this.updateTopOffset()
            
    //     } else if (cssProp instanceof BorderBottomCss) {
    //         this.updateBottomOffset()
            
    //     } else if (cssProp instanceof BorderGlobalCss) {
    //         this.updateLeftOffset()
    //         this.updateRightOffset()
    //         this.updateTopOffset()
    //         this.updateBottomOffset()
            
    //     }
    // }

    // private updateLeftOffset()
    // {
    //     let paddingLeftWidth = this.htmlTag.paddingLeft.isActive() ? this.htmlTag.paddingLeft.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginLeft.width + paddingLeftWidth + paddingLeftWidth)
    //     this.htmlTag.paddingLeft.offset =newOff
    // }
    
    // private updateRightOffset()
    // {
    //     let paddingRightWidth = this.htmlTag.paddingRight.isActive() ? this.htmlTag.paddingRight.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginRight.width + paddingRightWidth + paddingRightWidth)
    //     this.htmlTag.marginRight.offset =newOff
    // }
    
    // private updateTopOffset()
    // {
    //     let paddingTopWidth = this.htmlTag.paddingTop.isActive() ? this.htmlTag.paddingTop.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginTop.width + paddingTopWidth + paddingTopWidth)
    //     this.htmlTag.marginTop.offset =newOff
    // }
    
    // private updateBottomOffset()
    // {
    //     let paddingBottomWidth = this.htmlTag.paddingBottom.isActive() ? this.htmlTag.paddingBottom.width : 0
    //     let newOff = -Math.abs(this.htmlTag.marginBottom.width + paddingBottomWidth + paddingBottomWidth)
    //     this.htmlTag.marginBottom.offset =newOff
    // }

    updateVal(cssProp: BaseBorderCss, model: BorderModel) {
        var prop: BasePropertyCss
        if (model instanceof BorderLeft ||  model instanceof BorderRight) {
            prop = new Width(cssProp.getWidth(), cssProp.getWidthUnit());
        } else {
            prop = new Height(cssProp.getWidth(), cssProp.getWidthUnit());

        }
        if (parseInt(prop.getClearValue()) > -1) {
            // console.log('+++++++++');
            // console.log(cssProp);
            // console.log(cssProp.getColor());
            // console.log('+++++++++');
            model.width = parseInt(prop.getClearValue())
            model.widthUnit = prop.getUnit()
            model.style = cssProp.getType()
            model.color = cssProp.getColor()
            model.offset = this.offsetCalculator.calculateOffset(model)
            model.length = this.sizeCalculator.calculateSize(model)
            model.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(model)

        }

        // borderModel.updateCssProperty(prop.getName(), prop)
    }
    
    updateAllDirectionsVal(cssProp: BaseBorderCss) {
        var top: BasePropertyCss = new Height(cssProp.getWidth(), cssProp.getUnit());
        var bottom: BasePropertyCss = new Height(cssProp.getWidth(), cssProp.getUnit());
        
        var left: BasePropertyCss = new Width(cssProp.getWidth(), cssProp.getUnit());
        var right: BasePropertyCss = new Width(cssProp.getWidth(), cssProp.getUnit());

        var leftProp = this.htmlTag.cssAccessor.getProperty(BorderLeftCss.PROP_NAME)
        var rightProp = this.htmlTag.cssAccessor.getProperty(BorderRightCss.PROP_NAME)
        var topProp = this.htmlTag.cssAccessor.getProperty(BorderTopCss.PROP_NAME)
        var bottomProp = this.htmlTag.cssAccessor.getProperty(BorderBottomCss.PROP_NAME)
        // console.log(right.getClearValue());
        // console.log(right.getUnit());
        // console.log(cssProp.getType());
        // console.log(cssProp.getColor());
        
        if (parseInt(right.getClearValue()) > -1 && !rightProp) {
            
            console.log('JAJAJA');
            // if (!rightProp.isActive()) {

            this.htmlTag.borderRight.width = parseInt(right.getClearValue())
            this.htmlTag.borderRight.widthUnit = right.getUnit()
            this.htmlTag.borderRight.offset = this.offsetCalculator.calculateOffset(this.htmlTag.borderRight)
            this.htmlTag.borderRight.length = this.sizeCalculator.calculateSize(this.htmlTag.borderRight)
            this.htmlTag.borderRight.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.htmlTag.borderRight)

            this.htmlTag.borderRight.style = cssProp.getType()
            // console.log('=========');
            // console.log(cssProp);
            // console.log(cssProp.getColor());
            // console.log('=========');
            
            this.htmlTag.borderRight.color = cssProp.getColor()
            
        }
        
        if (parseInt(left.getClearValue()) > -1 && !leftProp) {

            // if (!leftProp.isActive()) {
            this.htmlTag.borderLeft.width = parseInt(left.getClearValue())
            this.htmlTag.borderLeft.widthUnit = left.getUnit()
            this.htmlTag.borderLeft.offset = this.offsetCalculator.calculateOffset(this.htmlTag.borderLeft)
            this.htmlTag.borderLeft.length = this.sizeCalculator.calculateSize(this.htmlTag.borderLeft)
            this.htmlTag.borderLeft.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.htmlTag.borderLeft)

            this.htmlTag.borderLeft.style = cssProp.getType()
            this.htmlTag.borderLeft.color = cssProp.getColor()
            // }
        }
        
        if (parseInt(top.getClearValue()) > -1 && !topProp) {

            this.htmlTag.borderTop.width = parseInt(top.getClearValue())
            this.htmlTag.borderTop.widthUnit = top.getUnit()
            this.htmlTag.borderTop.offset = this.offsetCalculator.calculateOffset(this.htmlTag.borderTop)
            this.htmlTag.borderTop.length = this.sizeCalculator.calculateSize(this.htmlTag.borderTop)
            this.htmlTag.borderTop.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.htmlTag.borderTop)


            this.htmlTag.borderTop.style = cssProp.getType()
            this.htmlTag.borderTop.color = cssProp.getColor()
        }
        
        if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {

            this.htmlTag.borderBottom.width = parseInt(bottom.getClearValue())
            this.htmlTag.borderBottom.widthUnit = bottom.getUnit()
            this.htmlTag.borderBottom.offset = this.offsetCalculator.calculateOffset(this.htmlTag.borderBottom)
            this.htmlTag.borderBottom.length = this.sizeCalculator.calculateSize(this.htmlTag.borderBottom)
            this.htmlTag.borderBottom.lengthOffset = this.offsetSizeCalculator.calculateOffsetSize(this.htmlTag.borderBottom)

            this.htmlTag.borderBottom.style = cssProp.getType()
            this.htmlTag.borderBottom.color = cssProp.getColor()
        }
    }
    
}