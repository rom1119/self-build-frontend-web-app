import HtmlTag from '../../Layout/HtmlTag';
import BoxSizing from '../../Css/BoxModel/BoxSizing';
import ContentHeightPx from './ContentHeightPx';
import BorderCollapse from '../../Css/Table/BorderCollapse';
import TableTag from '../../Layout/tag/Table/TableTag';
import ContentWidthPx from './ContentWidthPx';


export default class TableContentWidthPx extends ContentWidthPx {

    constructor(value: HtmlTag) {
        super(value)

    }
    get contentSizePx(): number {

        var baseVal = super.contentSizePx
        var hasBorderCollapse = (<TableTag>this.value).borderCollapse

        if (hasBorderCollapse) {
            var paddingLeft = this.value.paddingLeft.width
            var paddingRight = this.value.paddingRight.width
            
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


            return baseVal + paddingLeft + paddingRight 
        }
        
        return baseVal

    }


}