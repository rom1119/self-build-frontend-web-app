import BasePropertyCss from './Css/BasePropertyCss';
import LayoutEl from './LayoutEl';
import BasePaddingCss from './Css/BoxModel/BasePaddingCss';
export default abstract class FilterCssInjector
{
  public abstract createDefaultProp(PROP_NAME: string): BasePropertyCss 
  public abstract deactivateProp(prop: BasePropertyCss)
  public abstract resetAll()
  public abstract activateProp(prop: BasePropertyCss)
    /**
     * injectCssProperty
     */
    protected abstract canInjectCssProperty(cssProp: BasePropertyCss): boolean

    public abstract injectCssProperty(cssProp: BasePropertyCss)
}