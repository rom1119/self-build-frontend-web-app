import CssSimple from '../../CssSimple';

export default class LeftCss extends CssSimple 
{
    public static PROP_NAME = 'left'
    public getName(): string {
        return LeftCss.PROP_NAME
    }
}