import SizeElController from '~/src/SizeElController';
import BorderModel from '../Layout/Border/BorderModel';
import HeightSizeDetector from '../SizeDetector/HeightSizeDetector';
import WidthSizeDetector from '../SizeDetector/WidthSizeDetector';
import AxisPositionDetector from '../AxisSizeDetector';

import MarginModel from '../Layout/Margin/MarginModel';
import MarginLeft from '../Layout/Margin/MarginLeft';
import MarginRight from '../Layout/Margin/MarginRight';
import OffsetCalcCssBuilder from '../Calculator/OffsetCalcCssBuilder';
import MarginOffsetCalculator from '../Calculator/Offset/MarginOffsetCalculator';
import MarginSizeCalculator from '../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import HtmlTag from '../Layout/HtmlTag';
export default class MarginElSizeController extends SizeElController {
	protected currentElement: MarginModel;
	protected mouseDetector: AxisPositionDetector;
	protected offsetCalculator: OffsetCalcCssBuilder<MarginModel>;

	constructor() {
		super();
	}

	public hasActiveEl(): boolean {
		return this.mouseDown == true;
	}
	private beforeStartMouseMove(ev: MouseEvent) {
		// console.log('aaa');
		// console.log(this.currentElement);
		// console.log('aaa');
		if (this.currentElement instanceof MarginLeft || this.currentElement instanceof MarginRight) {
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
			this.currentElement.updateOpposedProperty();
			this.offsetCalculator = new MarginOffsetCalculator(this.currentElement.getHtmlTag());
			this.currentElement.offsetCalc = this.offsetCalculator.build(this.currentElement);
			this.recalculateMargins(this.currentElement, this.currentElement.getHtmlTag());

			this.currentElement.getHtmlTag().notifyPositionalTag()
			// this.currentElement.getHtmlTag().notifyPositionalTag()

		}
	}

	private recalculateMargins(currentElement, htmlTag: HtmlTag) {
		let sizeCalc = new MarginSizeCalculator(htmlTag);
		let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag);
		if (currentElement instanceof MarginLeft || currentElement instanceof MarginRight) {
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

	private getMouseAxisPosition(ev: MouseEvent): number {
		if (this.currentElement instanceof MarginLeft || this.currentElement instanceof MarginRight) {
			return ev.clientX;
		} else {
			return ev.clientY;
		}
	}
}
