import FilterCssInjector from '../FilterCssInjector';
import BasePropertyCss from '../Css/BasePropertyCss';
import MarginModel from '../Layout/Margin/MarginModel';
import LayoutEl from '../LayoutEl';
import MarginLeft from '../Layout/Margin/MarginLeft';
import MarginRight from '../Layout/Margin/MarginRight';
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import BaseMarginCss from '../Css/BoxModel/BaseMarginCss';
import Height from '../Css/Size/Height';
import MarginTop from '../Layout/Margin/MarginTop';
import MarginBottom from '../Layout/Margin/MarginBottom';
import MarginCss from '../Css/BoxModel/Margin/MarginCss';
import MarginBottomCss from '../Css/BoxModel/Margin/MarginBottomCss';
import MarginTopCss from '../Css/BoxModel/Margin/MarginTopCss';
import MarginRightCss from '../Css/BoxModel/Margin/MarginRightCss';
import MarginLeftCss from '../Css/BoxModel/Margin/MarginLeftCss';
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';
import SizeCalculator from '../Calculator/SizeCalcCssBuilder';
import MarginSizeCalculator from '../Calculator/Size/MarginSizeCalculator';
import OffsetSizeCalcCssBuilder from '../Calculator/OffsetSizeCalcCssBuilder';
import MarginOffsetSizeCalculator from '../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import OffsetCalcCssBuilder from '../Calculator/OffsetCalcCssBuilder';
import { Pixel } from '../Unit';

export default class MarginFilterCssInjector extends FilterCssInjector {
	protected htmlTag: HtmlTag;
	protected offsetCalculator: OffsetCalcCssBuilder<MarginModel>;
	protected sizeCalculator: SizeCalculator<MarginModel>;
	protected offsetSizeCalculator: OffsetSizeCalcCssBuilder<MarginModel>;

	constructor(htmlTag: HtmlTag) {
		super();
		this.htmlTag = htmlTag;
		this.offsetCalculator = new MarginOffsetCalculator(htmlTag);
		this.sizeCalculator = new MarginSizeCalculator(htmlTag);
		this.offsetSizeCalculator = new MarginOffsetSizeCalculator(htmlTag);
	}

	public createDefaultProp(propName: string): BasePropertyCss {
		switch (propName) {
			case MarginLeftCss.PROP_NAME:
				return new MarginLeftCss(this.htmlTag.marginLeft.width, this.htmlTag.marginLeft.widthUnit);
			case MarginRightCss.PROP_NAME:
				return new MarginRightCss(this.htmlTag.marginRight.width, this.htmlTag.marginRight.widthUnit);
			case MarginTopCss.PROP_NAME:
				return new MarginTopCss(this.htmlTag.marginTop.width, this.htmlTag.marginTop.widthUnit);
			case MarginBottomCss.PROP_NAME:
				return new MarginBottomCss(this.htmlTag.marginBottom.width, this.htmlTag.marginBottom.widthUnit);
			case MarginCss.PROP_NAME:
				return new MarginCss(this.htmlTag.marginLeft.width, this.htmlTag.marginLeft.widthUnit);
		}

		throw Error(`Can not create Default Margin from property name ${propName}`);
	}

	canInjectCssProperty(cssProp: BasePropertyCss): boolean {
		return cssProp instanceof BaseMarginCss;
	}

	public injectCssProperty(cssProp: BasePropertyCss) {
		if (!this.canInjectCssProperty(cssProp)) {
			return;
		}

		if (cssProp instanceof MarginLeftCss) {
			this.updateVal(cssProp, this.htmlTag.marginLeft);
		} else if (cssProp instanceof MarginRightCss) {
			this.updateVal(cssProp, this.htmlTag.marginRight);
		} else if (cssProp instanceof MarginTopCss) {
			this.updateVal(cssProp, this.htmlTag.marginTop);
		} else if (cssProp instanceof MarginBottomCss) {
			this.updateVal(cssProp, this.htmlTag.marginBottom);
		} else if (cssProp instanceof MarginCss) {
			this.updateAllDirectionsVal(cssProp);
		}
	}

	private deactiveProp(cssProp: BasePropertyCss, model: MarginModel) {
		var global: BasePropertyCss = this.htmlTag.cssAccessor.getProperty(MarginCss.PROP_NAME);

		if (global) {
			model.width = global.getClearValue();
			model.widthUnit = global.getUnit();
		} else {
			model.deactivate();
		}
	}

	public deactivateProp(cssProp: BasePropertyCss) {
		if (cssProp instanceof MarginLeftCss) {
			this.deactiveProp(cssProp, this.htmlTag.marginLeft);
		} else if (cssProp instanceof MarginRightCss) {
			this.deactiveProp(cssProp, this.htmlTag.marginRight);
		} else if (cssProp instanceof MarginTopCss) {
			this.deactiveProp(cssProp, this.htmlTag.marginTop);
		} else if (cssProp instanceof MarginBottomCss) {
			this.deactiveProp(cssProp, this.htmlTag.marginBottom);
		} else if (cssProp instanceof MarginCss) {
			if (!this.htmlTag.cssAccessor.hasCssProperty(MarginLeftCss.PROP_NAME)) {
				this.htmlTag.marginLeft.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(MarginRightCss.PROP_NAME)) {
				this.htmlTag.marginRight.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(MarginTopCss.PROP_NAME)) {
				this.htmlTag.marginTop.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(MarginBottomCss.PROP_NAME)) {
				this.htmlTag.marginBottom.deactivate();
			}
			// this.htmlTag.marginTop.deactivate()
			// this.htmlTag.marginBottom.deactivate()
		}
	}
	public activateProp(cssProp: BaseMarginCss) {
		if (cssProp instanceof MarginLeftCss) {
			this.updateVal(cssProp, this.htmlTag.marginLeft);
			this.htmlTag.marginLeft.activate();
		} else if (cssProp instanceof MarginRightCss) {
			this.updateVal(cssProp, this.htmlTag.marginRight);
			this.htmlTag.marginRight.activate();
		} else if (cssProp instanceof MarginTopCss) {
			this.updateVal(cssProp, this.htmlTag.marginTop);
			this.htmlTag.marginTop.activate();
		} else if (cssProp instanceof MarginBottomCss) {
			this.updateVal(cssProp, this.htmlTag.marginBottom);
			this.htmlTag.marginBottom.activate();
		} else if (cssProp instanceof MarginCss) {
			this.updateAllDirectionsVal(cssProp);
			this.htmlTag.marginLeft.activate();
			this.htmlTag.marginRight.activate();
			this.htmlTag.marginTop.activate();
			this.htmlTag.marginBottom.activate();
		}
	}

	private updateVal(cssProp: BasePropertyCss, marginModel: MarginModel) {
		var prop: BasePropertyCss;
		if (marginModel instanceof MarginLeft || marginModel instanceof MarginRight) {
			prop = new Width(cssProp.getClearValue(), cssProp.getUnit());
		} else {
			prop = new Height(cssProp.getClearValue(), cssProp.getUnit());
		}
		if (parseInt(prop.getClearValue()) > -1) {
			marginModel.width = parseInt(prop.getClearValue());
			marginModel.widthUnit = prop.getUnit();
			marginModel.offsetCalc = this.offsetCalculator.build(marginModel);
			marginModel.lengthCalc = this.sizeCalculator.build(marginModel);
			marginModel.lengthOffsetCalc = this.offsetSizeCalculator.build(marginModel);
			marginModel.activate();
		}
		// marginModel.updateCssProperty(prop.getName(), prop)
	}

	private updateAllDirectionsVal(cssProp: MarginCss) {
		var top: BasePropertyCss = new Height(cssProp.top, cssProp.getUnit());
		var bottom: BasePropertyCss = new Height(cssProp.bottom, cssProp.getUnit());

		var left: BasePropertyCss = new Width(cssProp.left, cssProp.getUnit());
		var right: BasePropertyCss = new Width(cssProp.right, cssProp.getUnit());

		var leftProp = this.htmlTag.cssAccessor.hasCssProperty(MarginLeftCss.PROP_NAME);
		var rightProp = this.htmlTag.cssAccessor.hasCssProperty(MarginRightCss.PROP_NAME);
		var topProp = this.htmlTag.cssAccessor.hasCssProperty(MarginTopCss.PROP_NAME);
		var bottomProp = this.htmlTag.cssAccessor.hasCssProperty(MarginBottomCss.PROP_NAME);

		if (parseInt(right.getClearValue()) > -1 && !rightProp) {
			this.htmlTag.marginRight.width = parseInt(right.getClearValue());
			this.htmlTag.marginRight.widthUnit = right.getUnit();
			this.htmlTag.marginRight.offsetCalc = this.offsetCalculator.build(this.htmlTag.marginRight);
			this.htmlTag.marginRight.lengthCalc = this.sizeCalculator.build(this.htmlTag.marginRight);
			this.htmlTag.marginRight.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.marginRight);
			this.htmlTag.marginRight.activate();
		}

		if (parseInt(left.getClearValue()) > -1 && !leftProp) {
			this.htmlTag.marginLeft.width = parseInt(left.getClearValue());
			this.htmlTag.marginLeft.widthUnit = left.getUnit();
			this.htmlTag.marginLeft.offsetCalc = this.offsetCalculator.build(this.htmlTag.marginLeft);
			this.htmlTag.marginLeft.lengthCalc = this.sizeCalculator.build(this.htmlTag.marginLeft);
			this.htmlTag.marginLeft.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.marginLeft);
			this.htmlTag.marginLeft.activate();
		}

		if (parseInt(top.getClearValue()) > -1 && !topProp) {
			this.htmlTag.marginTop.width = parseInt(top.getClearValue());
			this.htmlTag.marginTop.widthUnit = top.getUnit();
			this.htmlTag.marginTop.offsetCalc = this.offsetCalculator.build(this.htmlTag.marginTop);
			this.htmlTag.marginTop.lengthCalc = this.sizeCalculator.build(this.htmlTag.marginTop);
			this.htmlTag.marginTop.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.marginTop);
			this.htmlTag.marginTop.activate();
		}

		if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {
			this.htmlTag.marginBottom.width = parseInt(bottom.getClearValue());
			this.htmlTag.marginBottom.widthUnit = bottom.getUnit();
			this.htmlTag.marginBottom.offsetCalc = this.offsetCalculator.build(this.htmlTag.marginBottom);
			this.htmlTag.marginBottom.lengthCalc = this.sizeCalculator.build(this.htmlTag.marginBottom);
			this.htmlTag.marginBottom.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.marginBottom);
			this.htmlTag.marginBottom.activate();
		}
	}

	public resetAll() {
		this.htmlTag.marginLeft.width = 0;
		this.htmlTag.marginLeft.widthUnit = new Pixel();
		this.htmlTag.marginLeft.deactivate()
		
		this.htmlTag.marginRight.width = 0;
		this.htmlTag.marginRight.widthUnit = new Pixel();
		this.htmlTag.marginRight.deactivate()
		
		this.htmlTag.marginTop.width = 0;
		this.htmlTag.marginTop.widthUnit = new Pixel();
		this.htmlTag.marginTop.deactivate()
		
		this.htmlTag.marginBottom.width = 0;
		this.htmlTag.marginBottom.widthUnit = new Pixel();
		this.htmlTag.marginBottom.deactivate()
	}
}
