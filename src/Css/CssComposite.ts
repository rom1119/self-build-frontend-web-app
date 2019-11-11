import BasePropertyCss from "./BasePropertyCss";
import CssWithoutValue from "../Errors/CssWithoutValue";

export default abstract class CssComposite extends BasePropertyCss
{

    get value(): string
    {
        if (!this.values[0]) {
            throw new CssWithoutValue(`CSS property ${this.name} not have value` )
        }
        return this.values[0]
    }
}