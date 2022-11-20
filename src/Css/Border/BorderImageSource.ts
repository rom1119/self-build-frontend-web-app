import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import UnitSize from '../../Unit/UnitSize';
import UnitColor from '../../Unit/UnitColor';
import CssComposite from '../CssComposite';
import CssDirectionComposite from "../CssDirectionComposite";
import CssWithoutValue from "~/src/Errors/CssWithoutValue";
import Unit from "~/src/Unit/Unit";
import CssTripleValue from "../CssTripleValue";
import Named from '../../Unit/Named';
import Vue from 'vue'
import { UnitUrl } from "~/src/Unit";
import BaseGradientCss from '../Gradient/BaseGradientCss';

export default class BorderImageSource extends CssSimple
{
    public static PROP_NAME = 'border-image-source'
    gradient: BaseGradientCss

    file: File
    resource: string
    resourceUrl: string

    protected unit: Unit = new UnitUrl();
    public getName(): string {
        return BorderImageSource.PROP_NAME
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
    getValue(): string
    {
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

    setValue(val)
    {
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