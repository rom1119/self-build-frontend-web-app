import Input from './Input';
import HtmlAttr from '~/src/Attribute/HtmlAttr';
import { BorderGlobalCss, Width, Height, BoxSizing, BackgroundColor } from '~/src/Css';
import { Pixel, Named } from '~/src/Unit';
export default class InputNumber extends Input {
    protected _width = 150
    protected _height = 30
    protected initialBackgroundColor = 'transparent'

    constructor()
    {
        super()
        this.attributeAccessor.addNewAttribute(new HtmlAttr('type', 'number', this))
        this.attributeAccessor.addNewAttribute(new HtmlAttr('value', this._text, this))
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