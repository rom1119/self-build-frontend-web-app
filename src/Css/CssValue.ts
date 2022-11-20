import Unit from '../Unit/Unit';
import CssWithTwoValues from './MultiValuesCss/CssWithTwoValues';
export default interface CssValue {
    getFullValue(): string
    getId(): number

}