import HtmlTagBlock from '../HtmlTagBlock';
import { BoxSizing, Height, Width, BackgroundColor } from '~/src/Css';
import { Named } from '~/src/Unit';
import TagResource from '../../Css/TagResource';
import SrcAttr from '~/src/Attribute/html/SrcAttr';
export default class ImgTag extends HtmlTagBlock  {
    
    protected _innerText: string = `${this.uuid}  IMAGE TAG`
    public static TAG_NAME = 'img'

    protected _isClosingTag = false
    
    srcAttr: SrcAttr

    constructor()
    {
        super()
        this.srcAttr = new SrcAttr('', this)
        this.attributeAccessor.addNewAttribute(this.srcAttr)
    }
    
    
    public getTagName(): string {
        return ImgTag.TAG_NAME
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

    public setHtmlEl(htmlEl)
    {
        super.setHtmlEl(htmlEl)
        
        document.getElementById(this.shortUUID + '-content').setAttribute('draggable', 'false');
    }
    // getId(): any {
    //     return this.uuid
    // }
    // getResourceFile(): File {
    //     var attr: SrcAttr = <SrcAttr>this.attributeAccessor.getAttribute(SrcAttr.NAME)
    //     return attr.file
    // }
    
    // getResource(): string {
    //     var attr: SrcAttr = <SrcAttr>this.attributeAccessor.getAttribute(SrcAttr.NAME)
    //     return attr.resource
    // }
    // setResource(val: string) {
    //     var attr: SrcAttr = <SrcAttr>this.attributeAccessor.getAttribute(SrcAttr.NAME)
    //     attr.resource = val
    // }
    
    // getResourceUrl(): string {
    //     var attr: SrcAttr = <SrcAttr>this.attributeAccessor.getAttribute(SrcAttr.NAME)
    //     return attr.resourceUrl
    // }
    // setResourceUrl(val: string) {
    //     var attr: SrcAttr = <SrcAttr>this.attributeAccessor.getAttribute(SrcAttr.NAME)
    //     attr.resourceUrl = val
    // }
    
    
}