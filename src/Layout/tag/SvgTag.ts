import HtmlTagBlock from '../HtmlTagBlock';
import CustomAttr from '../../Attribute/html/CustomAttr';
import { BackgroundColor, BoxSizing, Height, Width } from '~/src/Css';
import { Named } from '~/src/Unit';
export default class SvgTag extends HtmlTagBlock {

    protected _innerText: string = `${this.uuid}  SVG`
    public static TAG_NAME = 'svg'

    isSvg = true
    protected _svgContent = ''

    constructor()
    {
        super()
        this.attributeAccessor.addNewAttribute(new CustomAttr('xmlns', 'http://www.w3.org/2000/svg'))
        this.attributeAccessor.addNewAttribute(new CustomAttr('xmlns:xlink', 'http://www.w3.org/1999/xlink'))
        this.attributeAccessor.addNewAttribute(new CustomAttr('version', '1.1'))
    }

    public injectInitialCssStyles()
    {
        
        let width = new Width(this._width, this.widthUnitCurrent)
        let height = new Height(this._height, this.heightUnitCurrent)
        let boxSizing = new BoxSizing(BoxSizing.CONTENT_BOX, new Named())
        let backgroundColor = new BackgroundColor('#448855', this._initialColorUnit)
        let cssList = [ width, height, boxSizing, backgroundColor]
        
        this.addPropsToAccessor(cssList)
    }

    get svgContent()
    {
        return this._svgContent
    }
    
    set svgContent(arg)
    {
        this._svgContent = arg
    }

    public setSvgContent(val)
    {
        this._svgContent = val
    }


    public getSvgContent(): string
    {
        return this._svgContent

    }

    public getTagName(): string {
        return SvgTag.TAG_NAME
    }

    public getDomainTagName(): string {
        return this.getTagName()
    }
    
    

}