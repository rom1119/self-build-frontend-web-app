import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";

export default abstract class BaseBorderCss extends CssDirectionComposite
{

    public setWidth(val: number, unit: UnitSize)
    {
        if (this.values[0]) {
            this.values[0] = unit.getValue(val)
        } else {
            this.values.push(unit.getValue(val))
        }
    }
    
    public setType(val: string)
    {
        if (this.values[1]) {
            this.values[1] = val
        } else {
            this.values.push(val)
        }
    }
    
    public setColor(val: string, unit: UnitColor)
    {
        if (this.values[2]) {
            this.values[2] = unit.getValue(val)
        } else {
            this.values.push(unit.getValue(val))
        }
    }
}