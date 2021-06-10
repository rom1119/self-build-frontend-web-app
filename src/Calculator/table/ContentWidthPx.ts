import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';


export default class ContentWidthPx {

    protected value: HtmlTag

    constructor(value: HtmlTag) {
        this.value = value
    }
    get contentSizePx(): number {

        var hasBorderBox = this.checkBorderBox()
        var widthFromTag = this.value.width
        var widthUnitFromTag = this.value.widthUnit
        var width = this.value.lastSetWidthPx
        // console.log('tabel contentWidthPx', width);
        // console.log(this.value.getDomainTagName());
        
        if (!widthFromTag) {
            return null
        }

        var paddingLeft = this.value.paddingLeft.width
        var paddingRight = this.value.paddingRight.width

        // var borderLeft = 0
        // var borderRight = 0
        // if (this.value.borderLeft.isEnabled()) {
        //     borderLeft = Number(this.value.borderLeft.width)

        // }
        
        // if (this.value.borderRight.isEnabled()) {
        //     borderRight = Number(this.value.borderRight.width)

        // }
        // console.log('paddingLeft', paddingLeft);
        // console.log('paddingRight', paddingRight);


        if (hasBorderBox) {
            return width - paddingLeft - paddingRight
        }
        
        return width

    }

    protected checkBorderBox(): boolean {
        if (this.value.boxSizing) {
            if (this.value.boxSizing.value === BoxSizing.BORDER_BOX) {
                return true
            }
        }

        return false
    }
}