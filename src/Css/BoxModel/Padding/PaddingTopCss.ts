import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePadding';

export default class PaddingTopCss extends BasePaddingCss
{
    public static PROP_NAME = 'padding-top'
    public getName(): string {
        return PaddingTopCss.PROP_NAME
    }

}