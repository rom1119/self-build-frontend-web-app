import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";
import Selector from "./Selector";

export default class KeyFrame
{
    id
    private _name
    selectors: Selector[]  = []

    constructor()
    {
        
    }

    getName(): string
    {
        return this._name
    }


    getSelectors(): Selector[]
    {
        return this.selectors

    }


}