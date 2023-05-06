import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssResource from "../CssResource";
import UnitUrl from '../../Unit/UnitUrl';
import BaseGradientCss from '../Gradient/BaseGradientCss';
import GradientsAware from "../Gradient/GradientsAware";
import UrlComponent from "../SpecialFunction/impl/UrlComponent";
import SpecialFunctionOwner from "../SpecialFunction/SpecialFunctionOwner";

export default class BackgroundImage extends CssSimple
    implements CssResource, GradientsAware, SpecialFunctionOwner {
    gradients: BaseGradientCss[] = []

    constructor() {
        super("", new UnitUrl())
        this.clearValue()
        this.values[0] = new UrlComponent(this)
    }

    private setUrlComponent(arg: UrlComponent) {
        arg.setOwner(this)
        this.values[0] = arg
    }

    get resourceUrl() {
        return this.values[0].resourceUrl
    }

    set resourceUrl(arg) {
        this.values[0].resourceUrl = arg
    }

    get resource() {
        return this.values[0].resource
    }

    set resource(arg) {
        this.values[0].resource = arg
    }

    get file() {
        return this.values[0].file
    }

    set file(arg) {
        this.values[0].file = arg
    }

    getGradients(): BaseGradientCss[] {
        return this.gradients
    }

    addGradient(gradient: BaseGradientCss) {
        this.gradients.push(gradient)

    }

    get value(): string {
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

            if (this.resourceUrl) {
                res += ", " + this.unit.getValue(this.resourceUrl)
            }
            // console.log('BACK_IMAG' , res);

            return res
        }

        if (this.resource) {
            return this.unit.getValue(this.resource)
        }

        if (this.resourceUrl) {
            return this.unit.getValue(this.resourceUrl)
        }
        return ''
    }
    getValue(): string {
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

            if (this.resourceUrl) {
                res += ", " + this.unit.getValue(this.resourceUrl)
            }
            // console.log('BACK_IMAG' , res);

            return res
        }

        if (this.resource) {
            return this.unit.getValue(this.resource)
        }

        if (this.resourceUrl) {
            return this.unit.getValue(this.resourceUrl)
        }
        return ''
    }

    setValue(val) {
        if (val instanceof UrlComponent) {
            this.setUrlComponent(val)

        } else {
            this.values[0] = val
        }
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

    getResourceUrl(): string {
        return this.resourceUrl
    }
    setResourceUrl(val: string) {
        this.resourceUrl = val
    }
    public static PROP_NAME = 'background-image'
    public getName(): string {
        return BackgroundImage.PROP_NAME
    }
}