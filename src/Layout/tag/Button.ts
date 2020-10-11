import HtmlTagBlock from '../HtmlTagBlock';
import { BoxSizing, Height, Width, BackgroundColor } from '~/src/Css';
import { Named } from '~/src/Unit';
export default class Button extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  BUTTON`
    public static TAG_NAME = 'button'


    public getTagName(): string {
        return Button.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    public injectInitialCssStyles()
    {

        let width = new Width(this._width, this.widthUnitCurrent)
        let height = new Height(this._height, this.heightUnitCurrent)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let cssList = [ width, height, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }
    

}