import CssWithoutValue from '../../../Errors/CssWithoutValue';
import HtmlTag from '../../../Layout/HtmlTag';
import Unit from '../../../Unit/Unit';
import CssOwner from '../../../CssOwner';
import SpecialFunctionOwner from '../SpecialFunctionOwner';
import { UnitUrl } from '~/src/Unit';
import SpecialFunctionComponent from '../SpecialFunctionComponent';
import CssResource from '../../CssResource';
export default class UrlComponent extends SpecialFunctionComponent implements CssResource {

    public static PROP_NAME = 'url-unit'
    file: File
    resource: string
    resourceUrl: string
    owner: SpecialFunctionOwner
    unit: UnitUrl

    constructor(owner?: SpecialFunctionOwner) {
        super()
        this.resource = null
        this.resourceUrl = null
        this.owner = owner
        this.unit = new UnitUrl();
    }
    getId() {
        this.owner.getId()
    }

    public setOwner(arg: SpecialFunctionOwner) {
        this.owner = arg
    }
    get value(): string {

        if (this.resource) {
            return this.unit.getValue(this.resource)
        }

        if (this.resourceUrl) {
            return this.unit.getValue(this.resourceUrl)
        }
        return ''
    }
    getValue(): string {
        if (this.resource) {
            return this.unit.getValue(this.resource)
        }

        if (this.resourceUrl) {
            return this.unit.getValue(this.resourceUrl)
        }
        return ''
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
