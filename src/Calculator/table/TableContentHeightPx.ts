import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';
import ContentHeightPx from './ContentHeightPx';
import BorderCollapse from '../../Css/Table/BorderCollapse';
import TableTag from '../../Layout/tag/Table/TableTag';


export default class TableContentHeightPx extends ContentHeightPx {

    constructor(value: HtmlTag, returtValIfNotSet?: boolean) {
        super(value, returtValIfNotSet)

    }
    get contentSizePx(): number {

        var baseVal = null
        var hasBorderBox = this.checkBorderBox()
        var heightFromTag = this.value.height
        var widthUnitFromTag = this.value.heightUnit
        var height = this.value.lastSetHeightContentPx
        // console.log('tabel contentHeightPx heightFromTag', this.value.getDomainTagName(),  heightFromTag);
        // console.log('tabel contentHeightPx height', height);
        
        if (!heightFromTag && !this.returtValIfNotSet) {
            return null
        }

        baseVal = height 
        // if (hasBorderBox) {

        //     // return height - paddingTop - paddingBottom - borderTop - borderBottom
        // } else {

        // }
        
        // return height
        var hasBorderCollapse = (<TableTag>this.value).borderCollapse

        if (hasBorderCollapse) {
            var paddingTop = Number(this.value.paddingTop.width)
            var paddingBottom = Number(this.value.paddingBottom.width)
            
            // var borderTop = 0
            // var borderBottom = 0
            // if (this.value.borderTop.isEnabled()) {
            //     borderTop = Number(this.value.borderTop.width)

            // }
            
            // if (this.value.borderBottom.isEnabled()) {
            //     borderBottom = Number(this.value.borderBottom.width)

            // }

            // console.log('paddingLeft', paddingLeft);
            // console.log('paddingRight', paddingRight);


            return baseVal + paddingTop + paddingBottom 
        }
        
        return baseVal

    }


}