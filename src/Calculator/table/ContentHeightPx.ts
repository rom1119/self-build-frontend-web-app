import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';


export default class ContentHeightPx {

    protected value: HtmlTag

    constructor(value: HtmlTag) {
        this.value = value
    }
    get contentSizePx(): number {

        var hasBorderBox = this.checkBorderBox()
        var widthFromTag = this.value.height
        var widthUnitFromTag = this.value.heightUnit
        var height = this.value.lastSetHeightPx
        // console.log('tabel contentWidthPx', widthFromTag);
        
        if (!widthFromTag) {
            return null
        }

        if (hasBorderBox) {
            var paddingTop = this.value.paddingTop.width
            var paddingBottom = this.value.paddingBottom.width

            // console.log('paddingLeft', paddingLeft);
            // console.log('paddingRight', paddingRight);


            return height - paddingTop - paddingBottom
        }
        
        return height

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