import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePaddingCss';
import BaseMarginCss from '../BaseMarginCss';

export default class MarginTopCss extends BaseMarginCss
{
    public static PROP_NAME = 'margin-top'
    public getName(): string {
        return MarginTopCss.PROP_NAME
    }

}