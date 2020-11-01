
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import BasePropertyCss from '../Css/BasePropertyCss';

export default interface DecisionObject {
    
    // equals(arg: DecisionObject) : boolean
    getName() : string
}