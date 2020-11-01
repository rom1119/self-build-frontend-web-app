
import UnableCreateCssPropertyFromName from '../Errors/UnableCreateCssPropertyFromName';
import * as libCss from "~/src/Css/";
import BasePropertyCss from '../Css/BasePropertyCss';
import DecisionObject from './DecisionObject';

export default interface DecisionManager<T extends DecisionObject> {
    
    canManage(arg: T)
}