import DecisionObject from "../DecisionObject";
import BasePropertyCss from '../../Css/BasePropertyCss';

export default class CssDecisionObject implements DecisionObject{
    
    protected css: BasePropertyCss

    constructor(css: BasePropertyCss) {
        this.css = css
    }
    getName(): string {
        return this.css.getName()
    }

}