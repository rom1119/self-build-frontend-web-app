import CssComposite from '../../CssComposite';
import CssDirectionComposite from '../../CssDirectionComposite';
import BasePaddingCss from '../BasePaddingCss';

export default class PaddingLeftCss extends BasePaddingCss
{
    public static PROP_NAME = 'padding-left'
    public getName(): string {
        return PaddingLeftCss.PROP_NAME
    }

}