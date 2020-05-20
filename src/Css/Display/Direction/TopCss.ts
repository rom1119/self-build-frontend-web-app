import CssSimple from '../../CssSimple';

export default class TopCss extends CssSimple 
{
    public static PROP_NAME = 'top'
    public getName(): string {
        return TopCss.PROP_NAME
    }
}