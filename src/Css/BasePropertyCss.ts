import CssWithoutValue from '../Errors/CssWithoutValue';
import HtmlTag from '../Layout/HtmlTag';
import Unit from '../Unit/Unit';
import CssOwner from '../CssOwner';
export default abstract class BasePropertyCss
{
    id
    mediaQueryId
    protected values: any[]
    protected unit: Unit
    protected owner: CssOwner
    public active = true
    public injectable = true
    public toSaveInApi = true

    constructor(unit: Unit)
    {
        this.unit = unit
        this.values = []
    }

    getId(): any {
        return this.id
    }

    public initOwner(owner: CssOwner) {
        this.owner = owner
    }

    public synchronize()
    {
        this.owner.synchronize()
    }

    public static canBeManageBy(htmlTag: HtmlTag) {
        return true
    }

    public deepCopyThis() {
        return this.deepCopy(this)
    }
    public deepCopy(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            let clone = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)

            return clone;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    public getUnit(): Unit
    {
        return this.unit
    }

    public setUnit(unit: Unit)
    {
        this.unit = unit
    }

    get value(): any
    {
        return this.unit.getValue(this.values[0])
    }
    
    get blankValue(): any
    {
        return this.values[0]
    }

    getValue(): string
    {
        if (this.values[0] == 'undefined') {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )
        }
        if (this.values[0].toString().length < 1) {
            throw new CssWithoutValue(`CSS property ${this.getName()} not have value` )

        }
        if (!this.unit) {
            throw new Error(`CSS property ${this.getName()} not have set Unit` )
        }
        return this.unit.getValue(this.values[0])
    }


    setValue(val: any)
    {
        this.clearValue()
        this.values.push(val)
        // this.values.push(val)
    }

    public abstract getName(): string

    public getClearValue() {
        return this.values[0]
    }

    public clearValue()
    {
        this.values = []

        return this
    }

    public equals(el: BasePropertyCss): boolean
    {
        return el.getName() === this.getName()
    }

    public clone(): BasePropertyCss {
        var clone = Object.create(this);

        return clone;
    }

    public isActive()
    {
        return this.active === true
    }

    public setActive(val: boolean)
    {
        this.active = val
    }


}
