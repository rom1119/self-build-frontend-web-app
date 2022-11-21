import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssThreeAxis from '../CssThreeAxis';
import CssPropertyLimitableNotRequired from '../CssPropertyLimitableNotRequired';
import { Named } from "~/src/Unit";
import Unit from '../../Unit/Unit';
import UnitUrl from '../../Unit/UnitUrl';
import BaseGradientCss from '../Gradient/BaseGradientCss';

export default class ListStyleImage extends CssSimple {
    
    public static PROP_NAME = 'list-style-image'
    gradient: BaseGradientCss

    file: File
    resource: string
    resourceUrl: string

    protected unit: Unit = new UnitUrl();
    public getName(): string {
        return ListStyleImage.PROP_NAME
    }

    get value(): string {
        var res = ''
        if (this.gradient) {
            var grad = this.gradient
            res += grad.getValue()


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
        if (this.gradient) {
            var grad = this.gradient
            res += grad.getValue()


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
        this.resource = val
    }
    getId(): any {
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

    getResourceUrl(): string {
        return this.resourceUrl
    }
    setResourceUrl(val: string) {
        this.resourceUrl = val
    }

}