import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePadding';

export default class PaddingRightCss extends BasePaddingCss
{
    public static PROP_NAME = 'padding-right'
    public getName(): string {
        return PaddingRightCss.PROP_NAME
    }

}