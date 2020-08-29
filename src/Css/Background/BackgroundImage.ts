import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssResource from "../CssResource";
import UnitUrl from '../../Unit/UnitUrl';
import BaseGradientCss from '../Gradient/BaseGradientCss';
import GradientsAware from "../Gradient/GradientsAware";

export default class BackgroundImage extends CssSimple implements CssResource, GradientsAware
{
    file: File
    resource: string
    gradients: BaseGradientCss[] = []

    constructor()
    {
        super("", new UnitUrl())
        this.resource = null
        this.clearValue()
    }

    getGradients(): BaseGradientCss[] {
        return this.gradients
    }

    addGradient(gradient: BaseGradientCss)
    {
        this.gradients.push(gradient)

    }

    getValue(): string
    {
        var res = ''
        if (this.gradients.length > 0) {
            for (var i = 0; i < this.gradients.length; i++) {
                var grad = this.gradients[i]
                res += grad.getValue()
                if (this.gradients.length - 1 > i) {
                    res += ','
                }
            }

            if (this.resource) {
                res += ", " + this.unit.getValue(this.resource)
            }
            console.log('BACK_IMAG' , res);
            
            return res
        }

        if (this.unit) {
            return this.unit.getValue(this.resource)
        }
        return ''
    }

    setValue(val)
    {
        this.resource = val
    }
    getId(): number {
        return this.id
    }
    getResourceFile(): File {
        return this.file
    }

    getResource(): string {
        return this.resource
    }
    setResource(val: string) {
        this.resource = val
    }
    public static PROP_NAME = 'background-image'
    public getName(): string {
        return BackgroundImage.PROP_NAME
    }
}