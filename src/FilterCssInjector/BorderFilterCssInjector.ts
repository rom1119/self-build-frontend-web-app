import FilterCssInjector from '../FilterCssInjector';
import BasePropertyCss from '../Css/BasePropertyCss';
import BorderModel from '../Layout/Border/BorderModel';
import LayoutEl from '../LayoutEl';
import BorderLeft from '../Layout/Border/BorderLeft';
import BorderRight from '../Layout/Border/BorderRight';
import HtmlTag from '../Layout/HtmlTag';
import Width from '../Css/Size/Width';
import Height from '../Css/Size/Height';
import BorderTop from '../Layout/Border/BorderTop';
import BorderBottom from '../Layout/Border/BorderBottom';
import BorderBottomCss from '../Css/Border/Bottom/BorderBottomCss';
import BorderTopCss from '../Css/Border/Top/BorderTopCss';
import BorderRightCss from '../Css/Border/Right/BorderRightCss';
import BorderLeftCss from '../Css/Border/Left/BorderLeftCss';
import BaseBorderCss from '../Css/Border/BaseBorderCss';
import BorderGlobalCss from '../Css/Border/Global/BorderGlobalCss';
import BorderOffsetCalculator from '../Calculator/Offset/BorderOffsetCalculator';
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';
import BorderSizeCalculator from '../Calculator/Size/BorderSizeCalculator';
import SizeCalculator from '../Calculator/SizeCalcCssBuilder';
import OffsetSizeCalcCssBuilder from '../Calculator/OffsetSizeCalcCssBuilder';
import BorderOffsetSizeCalculator from '../Calculator/OffsetSize/BorderOffsetSizeCalculator';
import OffsetCalcCssBuilder from '../Calculator/OffsetCalcCssBuilder';
import { Pixel } from '../Unit';

export default class BorderFilterCssInjector extends FilterCssInjector {
	protected htmlTag: HtmlTag;
	protected offsetCalculator: OffsetCalcCssBuilder<BorderModel>;
	protected offsetSizeCalculator: OffsetSizeCalcCssBuilder<BorderModel>;
	protected sizeCalculator: SizeCalculator<BorderModel>;

	constructor(htmlTag: HtmlTag) {
		super();
		this.htmlTag = htmlTag;
		this.offsetCalculator = new BorderOffsetCalculator(htmlTag);
		this.offsetSizeCalculator = new BorderOffsetSizeCalculator(htmlTag);
		this.sizeCalculator = new BorderSizeCalculator(htmlTag);
	}

	public createDefaultProp(propName: string): BasePropertyCss {
		switch (propName) {
			case BorderLeftCss.PROP_NAME:
				return new BorderLeftCss(this.htmlTag.borderLeft.width, this.htmlTag.borderLeft.widthUnit);
			case BorderRightCss.PROP_NAME:
				return new BorderRightCss(this.htmlTag.borderRight.width, this.htmlTag.borderRight.widthUnit);
			case BorderTopCss.PROP_NAME:
				return new BorderTopCss(this.htmlTag.borderTop.width, this.htmlTag.borderTop.widthUnit);
			case BorderBottomCss.PROP_NAME:
				return new BorderBottomCss(this.htmlTag.borderBottom.width, this.htmlTag.borderBottom.widthUnit);
			case BorderGlobalCss.PROP_NAME:
				return new BorderGlobalCss(this.htmlTag.borderLeft.width, this.htmlTag.borderLeft.widthUnit);
		}

		throw Error(`Can not create Default Border from property name ${propName}`);
	}

	canInjectCssProperty(cssProp: BasePropertyCss): boolean {
		return cssProp instanceof BaseBorderCss;
	}

	public injectCssProperty(cssProp: BasePropertyCss) {
		if (!this.canInjectCssProperty(cssProp)) {
			return;
		}

		if (cssProp instanceof BorderLeftCss) {
			this.updateVal(cssProp, this.htmlTag.borderLeft);
		} else if (cssProp instanceof BorderRightCss) {
			this.updateVal(cssProp, this.htmlTag.borderRight);
		} else if (cssProp instanceof BorderTopCss) {
			this.updateVal(cssProp, this.htmlTag.borderTop);
		} else if (cssProp instanceof BorderBottomCss) {
			this.updateVal(cssProp, this.htmlTag.borderBottom);
		} else if (cssProp instanceof BorderGlobalCss) {
			this.updateAllDirectionsVal(cssProp);
		}
	}

	private deactiveProp(cssProp: BasePropertyCss, model: BorderModel) {
		var global: BorderGlobalCss = <BorderGlobalCss>this.htmlTag.cssAccessor.getProperty(BorderGlobalCss.PROP_NAME);

		if (global) {
			model.width = <number>(<unknown>global.getClearValue());
			model.widthUnit = global.getUnit();
			model.color = global.getClearColor();
			model.colorUnit = global.getColorUnit();
			model.style = global.getClearStyle();
		} else {
			model.deactivate();
		}
	}

	public deactivateProp(cssProp: BasePropertyCss) {
		if (cssProp instanceof BorderLeftCss) {
			// this.htmlTag.borderLeft.deactivate()
			this.deactiveProp(cssProp, this.htmlTag.borderLeft);
		} else if (cssProp instanceof BorderRightCss) {
			// .deactivate()
			this.deactiveProp(cssProp, this.htmlTag.borderRight);
		} else if (cssProp instanceof BorderTopCss) {
			// this.htmlTag.borderTop.deactivate()
			this.deactiveProp(cssProp, this.htmlTag.borderTop);
		} else if (cssProp instanceof BorderBottomCss) {
			// this.htmlTag.borderBottom.deactivate()
			this.deactiveProp(cssProp, this.htmlTag.borderBottom);
		} else if (cssProp instanceof BorderGlobalCss) {
			if (!this.htmlTag.cssAccessor.hasCssProperty(BorderLeftCss.PROP_NAME)) {
				this.htmlTag.borderLeft.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(BorderRightCss.PROP_NAME)) {
				this.htmlTag.borderRight.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(BorderTopCss.PROP_NAME)) {
				this.htmlTag.borderTop.deactivate();
			}
			if (!this.htmlTag.cssAccessor.hasCssProperty(BorderBottomCss.PROP_NAME)) {
				this.htmlTag.borderBottom.deactivate();
			}
			// this.htmlTag.borderTop.deactivate()
			// this.htmlTag.borderBottom.deactivate()
		}
	}
	public activateProp(cssProp: BaseBorderCss) {
		if (cssProp instanceof BorderLeftCss) {
			this.htmlTag.borderLeft.activate();
		} else if (cssProp instanceof BorderRightCss) {
			this.htmlTag.borderRight.activate();
		} else if (cssProp instanceof BorderTopCss) {
			this.htmlTag.borderTop.activate();
		} else if (cssProp instanceof BorderBottomCss) {
			this.htmlTag.borderBottom.activate();
		} else if (cssProp instanceof BorderGlobalCss) {
			this.htmlTag.borderLeft.activate();
			this.htmlTag.borderRight.activate();
			this.htmlTag.borderTop.activate();
			this.htmlTag.borderBottom.activate();
		}
	}

	updateVal(cssProp: BaseBorderCss, model: BorderModel) {
		var prop: BasePropertyCss;
		if (model instanceof BorderLeft || model instanceof BorderRight) {
			prop = new Width(cssProp.getWidth(), cssProp.getWidthUnit());
		} else {
			prop = new Height(cssProp.getWidth(), cssProp.getWidthUnit());
		}
		if (parseInt(prop.getClearValue()) > -1) {
			// console.log('+++++++++');
			// console.log(cssProp);
			// console.log(cssProp.getColor());
			// console.log('+++++++++');
			model.width = parseInt(prop.getClearValue());
			model.widthUnit = prop.getUnit();
			model.style = cssProp.getType();
			model.color = cssProp.getColor();
			model.offsetCalc = this.offsetCalculator.build(model);
			model.lengthCalc = this.sizeCalculator.build(model);
			model.lengthOffsetCalc = this.offsetSizeCalculator.build(model);
			model.activate();
		}

		// borderModel.updateCssProperty(prop.getName(), prop)
	}

	updateAllDirectionsVal(cssProp: BaseBorderCss) {
		var top: BasePropertyCss = new Height(cssProp.getClearWidth(), cssProp.getUnit());
		var bottom: BasePropertyCss = new Height(cssProp.getClearWidth(), cssProp.getUnit());

		var left: BasePropertyCss = new Width(cssProp.getClearWidth(), cssProp.getUnit());
		var right: BasePropertyCss = new Width(cssProp.getClearWidth(), cssProp.getUnit());

		var leftProp = this.htmlTag.cssAccessor.getProperty(BorderLeftCss.PROP_NAME);
		var rightProp = this.htmlTag.cssAccessor.getProperty(BorderRightCss.PROP_NAME);
		var topProp = this.htmlTag.cssAccessor.getProperty(BorderTopCss.PROP_NAME);
		var bottomProp = this.htmlTag.cssAccessor.getProperty(BorderBottomCss.PROP_NAME);
		// console.log(right.getClearValue());
		// console.log(right.getUnit());
		// console.log(cssProp.getType());
		// console.log(cssProp.getColor());
		// console.log('JAN');
		// console.log(cssProp);
		// console.log(right.getClearValue());
		// console.log(right.getUnit());
		// console.log(parseInt(right.getClearValue()))

		if (parseInt(right.getClearValue()) > -1 && !rightProp) {
			// console.log('JAJAJAright9999');
			// console.log(right);
			// if (!rightProp.isActive()) {

			this.htmlTag.borderRight.width = parseInt(right.getClearValue());
			this.htmlTag.borderRight.widthUnit = right.getUnit();
			this.htmlTag.borderRight.offsetCalc = this.offsetCalculator.build(this.htmlTag.borderRight);
			this.htmlTag.borderRight.lengthCalc = this.sizeCalculator.build(this.htmlTag.borderRight);
			this.htmlTag.borderRight.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.borderRight);

			this.htmlTag.borderRight.style = cssProp.getType();
			this.htmlTag.borderRight.color = cssProp.getColor();
			this.htmlTag.borderRight.activate();
			// console.log('=========');
			// console.log(cssProp);
			// console.log(cssProp.getColor());
			// console.log('=========');
		}

		if (parseInt(left.getClearValue()) > -1 && !leftProp) {
			// if (!leftProp.isActive()) {
			this.htmlTag.borderLeft.width = parseInt(left.getClearValue());
			this.htmlTag.borderLeft.widthUnit = left.getUnit();
			this.htmlTag.borderLeft.offsetCalc = this.offsetCalculator.build(this.htmlTag.borderLeft);
			this.htmlTag.borderLeft.lengthCalc = this.sizeCalculator.build(this.htmlTag.borderLeft);
			this.htmlTag.borderLeft.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.borderLeft);

			this.htmlTag.borderLeft.style = cssProp.getType();
			this.htmlTag.borderLeft.color = cssProp.getColor();
			this.htmlTag.borderLeft.activate();
			// }
		}

		if (parseInt(top.getClearValue()) > -1 && !topProp) {
			this.htmlTag.borderTop.width = parseInt(top.getClearValue());
			this.htmlTag.borderTop.widthUnit = top.getUnit();
			this.htmlTag.borderTop.offsetCalc = this.offsetCalculator.build(this.htmlTag.borderTop);
			this.htmlTag.borderTop.lengthCalc = this.sizeCalculator.build(this.htmlTag.borderTop);
			this.htmlTag.borderTop.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.borderTop);

			this.htmlTag.borderTop.style = cssProp.getType();
			this.htmlTag.borderTop.color = cssProp.getColor();
			this.htmlTag.borderTop.activate();
		}

		if (parseInt(bottom.getClearValue()) > -1 && !bottomProp) {
			this.htmlTag.borderBottom.width = parseInt(bottom.getClearValue());
			this.htmlTag.borderBottom.widthUnit = bottom.getUnit();
			this.htmlTag.borderBottom.offsetCalc = this.offsetCalculator.build(this.htmlTag.borderBottom);
			this.htmlTag.borderBottom.lengthCalc = this.sizeCalculator.build(this.htmlTag.borderBottom);
			this.htmlTag.borderBottom.lengthOffsetCalc = this.offsetSizeCalculator.build(this.htmlTag.borderBottom);

			this.htmlTag.borderBottom.style = cssProp.getType();
			this.htmlTag.borderBottom.color = cssProp.getColor();
			this.htmlTag.borderBottom.activate();
		}
	}

	public resetAll() {
		this.htmlTag.borderLeft.width = 0;
		this.htmlTag.borderLeft.widthUnit = new Pixel();
		this.htmlTag.borderLeft.deactivate()
		
		this.htmlTag.borderRight.width = 0;
		this.htmlTag.borderRight.widthUnit = new Pixel();
		this.htmlTag.borderRight.deactivate()
		
		this.htmlTag.borderTop.width = 0;
		this.htmlTag.borderTop.widthUnit = new Pixel();
		this.htmlTag.borderTop.deactivate()
		
		this.htmlTag.borderBottom.width = 0;
		this.htmlTag.borderBottom.widthUnit = new Pixel();
		this.htmlTag.borderBottom.deactivate()
	}
}
