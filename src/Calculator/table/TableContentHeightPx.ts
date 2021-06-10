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

        var baseVal = super.contentSizePx
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