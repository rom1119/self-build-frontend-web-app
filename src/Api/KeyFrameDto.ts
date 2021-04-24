import HtmlTag from "../Layout/HtmlTag";
import StyleCssValue from "./StyleCssValue";
import Selector from "./Selector";

export default class KeyFrameDto
{
    id
    projectId
    protected _name
    protected _shortUuid
    protected _version
    selectors: Selector[]  = []

    constructor()
    {
        
    }

    get name() {
        return this._name
    }
    
    set name(arg) {
        this._name = arg
    }
    
    get shortUuid() {
        return this._shortUuid
    }
    
    set shortUuid(arg) {
        this._shortUuid = arg
    }
    
    get version() {
        return this._version
    }
    
    set version(arg) {
        this._version = arg
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