import CssSimple from '../../CssSimple';

export default class RightCss extends CssSimple 
{
    public static PROP_NAME = 'right'
    public getName(): string {
        return RightCss.PROP_NAME
    }
}