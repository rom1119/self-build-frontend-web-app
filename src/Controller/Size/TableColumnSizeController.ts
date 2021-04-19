import SizeElController from '~/src/SizeElController';
import HtmlTag from '../../Layout/HtmlTag';
import Size2DDetector from '../../SizeDetector/Size2DDetector';
import BorderSizeCalculator from '../../Calculator/Size/BorderSizeCalculator';
import BorderOffsetSizeCalculator from '../../Calculator/OffsetSize/BorderOffsetSizeCalculator';
import MarginSizeCalculator from '../../Calculator/Size/MarginSizeCalculator';
import MarginOffsetSizeCalculator from '../../Calculator/OffsetSize/MarginOffsetSizeCalculator';
import MarginRecalculate from '../../Recalculator/HtmlTagImpl/MarginRecalculate';
import HtmlTagRecalculator from '../../Recalculator/HtmlTagRecalculator';
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
export default class TableColumnSizeController extends SizeElController
{
    protected currentElement: TableColumnEl
    protected mouseDetector: Size2DDetector

    protected marginRecalculator: HtmlTagRecalculator

    constructor()
    {
        super()
        this.mouseDetector = new Size2DDetector()
        this.marginRecalculator = new MarginRecalculate()
    }

    public hasActiveEl(): boolean {
        return this.mouseDown == true
    }

    public mouseDownHandler(source: any) {
        this.mouseDown = true
        let el: TableColumnEl = source.target
        let event = source.event
        console.log(el.toString());
        // console.log(el.projectId);
        console.log(el.cssAccessor.all);

        // console.log(el.pseudoClassAccessor.all);

        if (!el.decisionCssFacade.canManageContentBoxCss()) {
            return
        }
        // console.log(el.pseudoClassAccessor);
        // console.log(el.pseudoClassAccessor.selectedSelector);
        // @ts-ignore
        // var a = el.realPositionCalculator.getNearPositionalTag()
        // if (a) {
        //     console.log(a.getHtmlEl());
        //
        // } else {
        //     console.log(undefined);
        //
        // }
        // console.log(el.getComputedWidthPixele());
        // console.log(el.paddingRightWidth);

        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown && el) {
                    this.currentElement = el
                    this.mouseDetector.initPosition(event.clientX, event.clientY)

                    this.mouseDetector.initSize(el.getComputedWidth(), el.getComputedHeight())
                    // this.currentElement.changeAsActiveSize()

                }

            }, 400)
    }

    public mouseUpHandler(ev: MouseEvent) {
        this.mouseDown = false
        if (!this.currentElement) {
            return
        }
        this.currentElement.changeAsDeactiveSize()
        this.currentElement = null

    }
    public mouseMoveHandler(ev: MouseEvent) {
        if (!this.currentElement) {
            return
        }
        // console.log(ev.clientX);
        this.mouseDetector.x = ev.clientX
        this.mouseDetector.y = ev.clientY
        let newValWidth = this.mouseDetector.computedWidth

        if (newValWidth > 0) {

            this.currentElement.setWidthColumn(newValWidth)
            // this.recalculateMargins(this.currentElement)
            // this.recalculateBorders(this.currentElement)

            // this.currentElement.realPositionCalculator.updateProps()
            // this.currentElement.notifyPositionalTag()

            // this.currentElement.recalculateRealComputedProperties()
        }
    }

    private recalculateMargins(htmlTag: HtmlTag)
    {
        this.marginRecalculator.recalculate(htmlTag)
        // let sizeCalc = new MarginSizeCalculator(htmlTag)
        // let offsetSizeCalc = new MarginOffsetSizeCalculator(htmlTag)

        // htmlTag.marginTop.lengthCalc = sizeCalc.build(htmlTag.marginTop)
        // htmlTag.marginTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginTop)
        // htmlTag.marginBottom.lengthCalc = sizeCalc.build(htmlTag.marginBottom)
        // htmlTag.marginBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginBottom)
        // htmlTag.marginLeft.lengthCalc = sizeCalc.build(htmlTag.marginLeft)
        // htmlTag.marginLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginLeft)
        // htmlTag.marginRight.lengthCalc = sizeCalc.build(htmlTag.marginRight)
        // htmlTag.marginRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.marginRight)

    }

    private recalculateBorders(htmlTag: HtmlTag)
    {
        let sizeCalc = new BorderSizeCalculator(htmlTag)
        let offsetSizeCalc = new BorderOffsetSizeCalculator(htmlTag)

        htmlTag.borderTop.lengthCalc = sizeCalc.build(htmlTag.borderTop)
        htmlTag.borderTop.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderTop)
        htmlTag.borderBottom.lengthCalc = sizeCalc.build(htmlTag.borderBottom)
        htmlTag.borderBottom.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderBottom)
        htmlTag.borderLeft.lengthCalc = sizeCalc.build(htmlTag.borderLeft)
        htmlTag.borderLeft.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderLeft)
        htmlTag.borderRight.lengthCalc = sizeCalc.build(htmlTag.borderRight)
        htmlTag.borderRight.lengthOffsetCalc = offsetSizeCalc.build(htmlTag.borderRight)

    }



}
