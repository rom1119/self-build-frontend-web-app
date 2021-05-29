import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';


export default class ContentWidthPx {

    protected value: HtmlTag

    constructor(value: HtmlTag) {
        this.value = value
    }
    get contentWidthPx(): number {

        var hasBorderBox = this.checkBorderBox()
        var widthFromTag = this.value.width
        var widthUnitFromTag = this.value.widthUnit
        var width = this.value.getComputedWidth()
        // console.log('tabel contentWidthPx', widthFromTag);
        
        if (!widthFromTag) {
            return null
        }

        if (hasBorderBox) {
            var paddingLeft = this.value.paddingLeft.width
            var paddingRight = this.value.paddingRight.width

            // console.log('paddingLeft', paddingLeft);
            // console.log('paddingRight', paddingRight);


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