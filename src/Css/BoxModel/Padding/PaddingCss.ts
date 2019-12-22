import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePaddingCss';

export default class PaddingCss extends BasePaddingCss
{
    public static PROP_NAME = 'padding'
    public getName(): string {
        return PaddingCss.PROP_NAME
    }

}