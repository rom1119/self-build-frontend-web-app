import SizeElController from '~/src/SizeElController';
import BorderModel from '../../Layout/Border/BorderModel';
import HeightSizeDetector from '../../SizeDetector/HeightSizeDetector';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '../../Layout/Border/BorderRight';
import WidthSizeDetector from '../../SizeDetector/WidthSizeDetector';
import AxisPositionDetector from '../../AxisSizeDetector';
import PaddingLeft from '../../Layout/Padding/PaddingLeft';
import PaddingRight from '../../Layout/Padding/PaddingRight';
import PaddingModel from '../../Layout/Padding/PaddingModel';
import Pixel from '../../Unit/Size/Pixel';
import OffsetCalcCssBuilder from '../../Calculator/OffsetCalcCssBuilder';
import PaddingOffsetCalculator from '../../Calculator/Offset/PaddingOffsetCalculator';
import HtmlTag from '../../Layout/HtmlTag';
import MarginSizeCalculator from '../../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import BorderSizeCalculator from '../../Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '../../Calculator/OffsetSize/BorderOffsetSizeCalculator';
import PaddingSizeCalculator from '../../Calculator/Size/PaddingSizeCalculator';
import PaddingOffsetSizeCalculator from '../../Calculator/OffsetSize/PaddingOffsetSizeCalculator';
import MarginOffsetCalculator from '../../Calculator/Offset/MarginOffsetCalculator';
import BorderOffsetCalculator from '../../Calculator/Offset/BorderOffsetCalculator';
export default class PaddingElSizeController extends SizeElController {
	protected currentElement: PaddingModel;
	protected mouseDetector: AxisPositionDetector;
	protected offsetCalculator: OffsetCalcCssBuilder<PaddingModel>;

	public hasActiveEl(): boolean {
		return this.mouseDown == true;
	}
	private beforeStartMouseMove(ev: MouseEvent) {
		// console.log('aaa');
		// console.log(this.currentElement);
		// console.log('aaa');
		if (this.currentElement instanceof PaddingLeft || this.currentElement instanceof PaddingRight) {
			this.mouseDetector = new WidthSizeDetector();
			this.mouseDetector.initPosition(ev.clientX);
			this.mouseDetector.initSize(this.currentElement.width);
		} else {
			this.mouseDetector = new HeightSizeDetector();
			this.mouseDetector.initPosition(ev.clientY);
			this.mouseDetector.initSize(this.currentElement.width);
		}
	}

	public mouseDownHandler(source: any) {
		this.mouseDown = true;
		let el = source.target;
		let event: MouseEvent = source.event;
		console.log(el.toString());

		// console.log(el.innerText);

		clearTimeout(this.timeout);
		this.timeout = setTimeout(async () => {
			if (this.mouseDown && el) {
				this.currentElement = el;
				// let compStyles = window.getComputedStyle(el.htmlEl);
				// var comp = compStyles.getPropertyValue('width')
				// console.log('aa');

				this.beforeStartMouseMove(event);
				this.currentElement.changeAsActiveSize();
			}
		}, 400);
	}

	public mouseUpHandler(ev: MouseEvent) {
		this.mouseDown = false;
		if (this.currentElement == null) {
			return;
		}
		this.currentElement.changeAsDeactiveSize();
		this.currentElement = null;
	}
	public mouseMoveHandler(ev: MouseEvent) {
		if (this.currentElement == null) {
			return;
		}
		// console.log(e.clientX);
		this.mouseDetector.setAxisPosition(this.getMouseAxisPosition(ev));
		// this.getMouseDetector().y = e.clientY
		// console.log(this.mouseDetector.computedVal());
		let newVal = this.mouseDetector.computedVal();
		if (newVal > 0) {
			this.currentElement.initSize(newVal);
			this.currentElement.updatePixelPropertyForTag();
			this.offsetCalculator = new PaddingOffsetCalculator(this.currentElement.getHtmlTag());
			this.currentElement.offsetCalc = this.offsetCalculator.build(this.currentElement);
			this.recalculateMargins(this.currentElement, this.currentElement.getHtmlTag());
			this.recalculateBorders(this.currentElement, this.currentElement.getHtmlTag());
			this.recalculatePaddings(this.currentElement, this.currentElement.getHtmlTag());

			// this.currentElement.getHtmlTag().realPositionCalculator.updateRightProps()
			// this.currentElement.getHtmlTag().realPositionCalculator.updateBottomProps()

			this.currentElement.getHtmlTag().notifyPositionalTag()

			// this.currentElement.getHtmlTag().recalculateRealComputedProperties()
		}
	}

	private recalculateMargins(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new MarginSizeCalculator(htmlTag);
		let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag);
		let offsetCalc = new MarginOffsetCalculator(htmlTag);
		htmlTag.marginTop.lengthCalc = sizeCalc.build(htmlTag.marginTop);
		htmlTag.marginTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginTop);
		htmlTag.marginTop.offsetCalc = offsetCalc.build(htmlTag.marginTop);

		htmlTag.marginBottom.lengthCalc = sizeCalc.build(htmlTag.marginBottom);
		htmlTag.marginBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginBottom);
		htmlTag.marginBottom.offsetCalc = offsetCalc.build(htmlTag.marginBottom);

		htmlTag.marginLeft.lengthCalc = sizeCalc.build(htmlTag.marginLeft);
		htmlTag.marginLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginLeft);
		htmlTag.marginLeft.offsetCalc = offsetCalc.build(htmlTag.marginLeft);

		htmlTag.marginRight.lengthCalc = sizeCalc.build(htmlTag.marginRight);
		htmlTag.marginRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginRight);
		htmlTag.marginRight.offsetCalc = offsetCalc.build(htmlTag.marginRight);
	}

	private recalculateBorders(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new BorderSizeCalculator(htmlTag);
		let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag);
		let offsetCalc = new BorderOffsetCalculator(htmlTag);

		htmlTag.borderTop.lengthCalc = sizeCalc.build(htmlTag.borderTop);
		htmlTag.borderTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderTop);
		htmlTag.borderTop.offsetCalc = offsetCalc.build(htmlTag.borderTop);

		htmlTag.borderBottom.lengthCalc = sizeCalc.build(htmlTag.borderBottom);
		htmlTag.borderBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderBottom);
		htmlTag.borderBottom.offsetCalc = offsetCalc.build(htmlTag.borderBottom);

		htmlTag.borderLeft.lengthCalc = sizeCalc.build(htmlTag.borderLeft);
		htmlTag.borderLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderLeft);
		htmlTag.borderLeft.offsetCalc = offsetCalc.build(htmlTag.borderLeft);

		htmlTag.borderRight.lengthCalc = sizeCalc.build(htmlTag.borderRight);
		htmlTag.borderRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderRight);
		htmlTag.borderRight.offsetCalc = offsetCalc.build(htmlTag.borderRight);
	}

	private recalculatePaddings(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new PaddingSizeCalculator(htmlTag);
		let offsetSizeCalc = new PaddingOffsetSizeCalculator(htmlTag);
		if (currentElement instanceof PaddingLeft || currentElement instanceof PaddingRight) {
			htmlTag.paddingTop.lengthCalc = sizeCalc.build(htmlTag.paddingTop);
			htmlTag.paddingTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingTop);
			htmlTag.paddingBottom.lengthCalc = sizeCalc.build(htmlTag.paddingBottom);
			htmlTag.paddingBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingBottom);
		} else {
			htmlTag.paddingLeft.lengthCalc = sizeCalc.build(htmlTag.paddingLeft);
			htmlTag.paddingLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingLeft);
			htmlTag.paddingRight.lengthCalc = sizeCalc.build(htmlTag.paddingRight);
			htmlTag.paddingRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.paddingRight);
		}
	}

	private getMouseAxisPosition(ev: MouseEvent): number {
		if (this.currentElement instanceof PaddingLeft || this.currentElement instanceof PaddingRight) {
			return ev.clientX;
		} else {
			return ev.clientY;
		}
	}
}
