import Unit from '../Unit/Unit';
import CssDoubleValue from './CssDoubleValue';
export default interface CssResource
{
    resource: string
    file: File
    getId(): number
    getResourceFile(): File
    getResource(): string
    setResource(val: string)
}