import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePadding';

export default class PaddingBottomCss extends BasePaddingCss
{
    public static PROP_NAME = 'padding-bottom'
    public getName(): string {
        return PaddingBottomCss.PROP_NAME
    }

}