import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePaddingCss';
import BaseMarginCss from '../BaseMarginCss';

export default class MarginCss extends BaseMarginCss
{
    public static PROP_NAME = 'margin'
    public getName(): string {
        return MarginCss.PROP_NAME
    }

}