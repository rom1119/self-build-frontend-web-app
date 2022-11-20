import Unit from './Unit/Unit';
import CssWithTwoValues from './Css/MultiValuesCss/CssWithTwoValues';
export default interface DomainResource {
    resource: string
    file: File
    getId(): any
    getResourceFile(): File
    getResource(): string
    setResource(val: string)
}