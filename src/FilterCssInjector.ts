import BasePropertyCss from './Css/BasePropertyCss';
import LayoutEl from './LayoutEl';
import BasePaddingCss from './Css/BoxModel/BasePaddingCss';
export default abstract class FilterCssInjector
{
  public abstract deactivateProp(prop: BasePropertyCss)
  public abstract activateProp(prop: BasePropertyCss)
    /**
     * injectCssProperty
     */
    protected abstract canInjectCssProperty(cssProp: BasePropertyCss): boolean

    public abstract injectCssProperty(cssProp: BasePropertyCss)
}