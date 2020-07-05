import SizeElController from '~/src/SizeElController';
import BorderModel from '../Layout/Border/BorderModel';
import HeightSizeDetector from '../SizeDetector/HeightSizeDetector';
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderRight from '../Layout/Border/BorderRight';
import WidthSizeDetector from '../SizeDetector/WidthSizeDetector';
import AxisPositionDetector from '../AxisSizeDetector';
import OffsetCalcCssBuilder from '../Calculator/OffsetCalcCssBuilder';
import BorderOffsetCalculator from '../Calculator/Offset/BorderOffsetCalculator';
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';
import MarginSizeCalculator from '../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '../Layout/HtmlTag';
import BorderSizeCalculator from '../Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '../Calculator/OffsetSize/BorderOffsetSizeCalculator';
export default class BorderElSizeController extends SizeElController {
	protected currentElement: BorderModel;
	protected mouseDetector: AxisPositionDetector;
	protected offsetCalculator: OffsetCalcCssBuilder<BorderModel>;

	public hasActiveEl(): boolean {
		return this.mouseDown == true;
	}
	private beforeStartMouseMove(ev: MouseEvent) {
		if (this.currentElement instanceof BorderLeft || this.currentElement instanceof BorderRight) {
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
		let newVal = this.mouseDetector.computedVal();
		// console.log(this.mouseDetector.computedVal());
		// console.log(this.currentElement);
		if (newVal > 0) {
			this.currentElement.initSize(newVal);
			this.currentElement.updatePixelPropertyForTag();
			this.offsetCalculator = new BorderOffsetCalculator(this.currentElement.getHtmlTag());
			this.currentElement.offsetCalc = this.offsetCalculator.build(this.currentElement);
			this.recalculateMargins(this.currentElement, this.currentElement.getHtmlTag());
			this.recalculateBorders(this.currentElement, this.currentElement.getHtmlTag());

			this.currentElement.getHtmlTag().notifyPositionalTag()

			// this.currentElement.getHtmlTag().recalculateRealComputedProperties()
		}
	}

	private recalculateMargins(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new MarginSizeCalculator(htmlTag);
		let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag);
		if (currentElement instanceof BorderLeft || currentElement instanceof BorderRight) {
			htmlTag.marginTop.lengthCalc = sizeCalc.build(htmlTag.marginTop);
			htmlTag.marginTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginTop);
			htmlTag.marginBottom.lengthCalc = sizeCalc.build(htmlTag.marginBottom);
			htmlTag.marginBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginBottom);
		} else {
			htmlTag.marginLeft.lengthCalc = sizeCalc.build(htmlTag.marginLeft);
			htmlTag.marginLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginLeft);
			htmlTag.marginRight.lengthCalc = sizeCalc.build(htmlTag.marginRight);
			htmlTag.marginRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginRight);
		}
	}

	private recalculateBorders(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new BorderSizeCalculator(htmlTag);
		let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag);
		if (currentElement instanceof BorderLeft || currentElement instanceof BorderRight) {
			htmlTag.borderTop.lengthCalc = sizeCalc.build(htmlTag.borderTop);
			htmlTag.borderTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderTop);
			htmlTag.borderBottom.lengthCalc = sizeCalc.build(htmlTag.borderBottom);
			htmlTag.borderBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderBottom);
		} else {
			htmlTag.borderLeft.lengthCalc = sizeCalc.build(htmlTag.borderLeft);
			htmlTag.borderLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderLeft);
			htmlTag.borderRight.lengthCalc = sizeCalc.build(htmlTag.borderRight);
			htmlTag.borderRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderRight);
		}
	}

	private getMouseAxisPosition(ev: MouseEvent): number {
		if (this.currentElement instanceof BorderLeft || this.currentElement instanceof BorderRight) {
			return ev.clientX;
		} else {
			return ev.clientY;
		}
	}
}
