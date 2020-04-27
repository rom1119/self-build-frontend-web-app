import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssResource from "../CssResource";
import UnitUrl from '../../Unit/UnitUrl';

export default class BackgroundImage extends CssSimple implements CssResource
{
    file: File
    resource: string

    constructor(val: any, unit: UnitUrl)
    {
        super(val, unit)
        this.resource = val
        this.clearValue()
    }

    getValue(): string
    {
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