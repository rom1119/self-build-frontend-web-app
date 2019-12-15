import BasePropertyCss from './Css/BasePropertyCss';
import LayoutEl from './LayoutEl';
export default abstract class FilterCssInjector
{
    /**
     * injectCssProperty
     */
    protected abstract canInjectCssProperty(cssProp: BasePropertyCss): boolean

    public abstract injectCssProperty(cssProp: BasePropertyCss)
}