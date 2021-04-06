import Unit from './Unit/Unit';
import CssDoubleValue from './Css/CssDoubleValue';
export default interface DomainResource
{
    resource: string
    file: File
    getId(): any
    getResourceFile(): File
    getResource(): string
    setResource(val: string)
}