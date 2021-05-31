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

        // console.log('paddingLeft', paddingLeft);
        // console.log('paddingRight', paddingRight);


        return width - paddingLeft - paddingRight
        if (hasBorderBox) {
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