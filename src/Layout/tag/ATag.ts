import HtmlAttr from '~/src/Attribute/HtmlAttr';
import { BorderGlobalCss, Width, Height, BoxSizing, BackgroundColor } from '~/src/Css';
import { Pixel, Named } from '~/src/Unit';
import HtmlTagBlock from '../HtmlTagBlock';
export default class ATag extends HtmlTagBlock {


    protected _innerText: string = `${this.uuid}  Atag`
    protected _width = 150
    protected _height = 30
    protected initialBackgroundColor = 'transparent'

    public static TAG_NAME = 'a'


    constructor()
    {
        super()
        this.attributeAccessor.addNewAttribute(new HtmlAttr('href', '#', this))
    }

    public getTagName(): string {
        return ATag.TAG_NAME
    }
    public getDomainTagName(): string {
        return this.getTagName()
    }


    public injectInitialCssStyles()
    {
        let border = new BorderGlobalCss('1', new Pixel())
        border.setType('solid')
        border.setColor('blue', new Named())
        // console.log('PPPP', border.getValue());
        
        let width = new Width(this._width, this.widthUnitCurrent)
        let height = new Height(this._height, this.heightUnitCurrent)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let cssList = [border, width, height, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }
    
    

}