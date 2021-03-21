import Unit from '../Unit/Unit';
import CssDoubleValue from './CssDoubleValue';
export default interface DomainResource
{
    resource: string
    file: File
    getId(): any
    getResourceFile(): File
    getResource(): string
    setResource(val: string)
}