import HtmlTagBlock from '../HtmlTagBlock';
import { BoxSizing, Height, Width, BackgroundColor } from '~/src/Css';
import { Named } from '~/src/Unit';
import Pixel from '../../Unit/Size/Pixel';
import TextNode from '../TextNode';
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

        let width = new Width(100, new Pixel())
        let height = new Height(30, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor(this.initialBackgroundColor, this._initialColorUnit)
        let cssList = [width, height, boxSizing, backgroundColor]
        
        var text = new TextNode()
        text.text = 'example btn'
        
        this.appendChildNotPersist(text)

        this.addPropsToAccessor(cssList)
    }
    

}