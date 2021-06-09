import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';


export default class ContentHeightPx {

    protected value: HtmlTag
    protected returtValIfNotSet: boolean = false

    constructor(value: HtmlTag, returtValIfNotSet?: boolean) {
        this.value = value
        this.returtValIfNotSet = returtValIfNotSet
    }
    get contentSizePx(): number {

        var hasBorderBox = this.checkBorderBox()
        var widthFromTag = this.value.height
        var widthUnitFromTag = this.value.heightUnit
        var height = this.value.lastSetHeightPx
        // console.log('tabel contentWidthPx', widthFromTag);
        
        if (!widthFromTag && !this.returtValIfNotSet) {
            return null
        }

        if (hasBorderBox) {
            var paddingTop = Number(this.value.paddingTop.width)
            var paddingBottom = Number(this.value.paddingBottom.width)
            
            var borderTop = 0
            var borderBottom = 0
            if (this.value.borderTop.isEnabled()) {
                borderTop = Number(this.value.borderTop.width)

            }
            
            if (this.value.borderBottom.isEnabled()) {
                borderBottom = Number(this.value.borderBottom.width)

            }

            // console.log('paddingLeft', paddingLeft);
            // console.log('paddingRight', paddingRight);


            return height - paddingTop - paddingBottom - borderTop - borderBottom
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