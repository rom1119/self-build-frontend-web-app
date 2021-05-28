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
import OffsetCalcCssBuilder from "../Calculator/OffsetCalcCssBuilder";
import PaddingOffsetCalculator from "../Calculator/Offset/PaddingOffsetCalculator";
import MinWidth from '../Css/Size/MinWidth';
import MaxWidth from '../Css/Size/MaxWidth';
import MinHeight from '../Css/Size/MinHeight';
import MaxHeight from '../Css/Size/MaxHeight';
import ContentSizeCss from "../Css/Size/ContentSizeCss";
import Pixel from '../Unit/Size/Pixel';
import TableTag from '../Layout/tag/Table/TableTag';

export default class ContentFilterCssInjector extends FilterCssInjector
{
    protected htmlTag: HtmlTag

    constructor(htmlTag: HtmlTag)
    {
        super()
        this.htmlTag = htmlTag
    }

    public createDefaultProp(propName: string): BasePropertyCss {
        switch (propName) {
            case Width.PROP_NAME:
                return new Width(HtmlTag.INITIAL_WIDTH, HtmlTag.INITIAL_SIZE_UNIT)
            case MinWidth.PROP_NAME:
                return new MinWidth(HtmlTag.INITIAL_WIDTH, HtmlTag.INITIAL_SIZE_UNIT)
            case MaxWidth.PROP_NAME:
                return new MaxWidth(HtmlTag.INITIAL_WIDTH, HtmlTag.INITIAL_SIZE_UNIT)
            case Height.PROP_NAME:
                return new Height(HtmlTag.INITIAL_HEIGHT, HtmlTag.INITIAL_SIZE_UNIT)
            case MinHeight.PROP_NAME:
                return new MinHeight(HtmlTag.INITIAL_HEIGHT, HtmlTag.INITIAL_SIZE_UNIT)
            case MaxHeight.PROP_NAME:
                return new MaxHeight(HtmlTag.INITIAL_HEIGHT, HtmlTag.INITIAL_SIZE_UNIT)
        }

        throw Error(`Can not create Default Content CSS prop from property name ${propName}`)

    }

    canInjectCssProperty(cssProp: BasePropertyCss): boolean
    {
        return cssProp instanceof ContentSizeCss
    }

    public injectCssProperty(cssProp: BasePropertyCss) {
        if (!this.canInjectCssProperty(cssProp)) {
            return
        }
        
        // console.log('WIDTH+++++++WIDTH');
        // console.log(cssProp.getClearValue());
        // console.log(cssProp.getUnit());
        
        if (cssProp instanceof Width) {
            this.htmlTag.setWidthUnit(cssProp.getUnit())
            this.htmlTag.setWidth(parseInt(cssProp.getClearValue()))

            // if (this.htmlTag.isTableTag) {
            //     (<TableTag>this.htmlTag).
            // }
            // var val = this.htmlTag.getComputedCssVal(cssProp)
            // console.log(val);
            // console.log('!@#$');
            
            // this.htmlTag.initWidth(parseInt(val))
            // this.updateVal(cssProp, this.htmlTag.paddingLeft)
        } else if (cssProp instanceof Height) {
            // this.htmlTag.initHeight(parseInt(cssProp.getClearValue()))
            this.htmlTag.setHeightUnit(cssProp.getUnit())
            this.htmlTag.setHeight(parseInt(cssProp.getClearValue()))
        }
        // else if (cssProp instanceof PaddingTopCss) {
        //     this.updateVal(cssProp, this.htmlTag.paddingTop)
            
        // } else if (cssProp instanceof PaddingBottomCss) {
        //     this.updateVal(cssProp, this.htmlTag.paddingBottom)
            
        // } else if (cssProp instanceof PaddingCss) {
        //     this.updateAllDirectionsVal(cssProp)
        // }

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

    updateVal(cssProp: ContentSizeCss) {
        
        if (parseInt(cssProp.getClearValue()) > -1) {
            
            // this.htmlTag.width = parseInt(cssProp.getClearValue())
  
            // paddingModel.activate()
        }

        // paddingModel.updateCssProperty(prop.getName(), prop)
    }
    
    public resetAll() {
		this.htmlTag.setWidthUnit(new Pixel())
        this.htmlTag.setWidth(0)
        
        this.htmlTag.setHeightUnit(new Pixel())
        this.htmlTag.setHeight(0)
		

	}
}