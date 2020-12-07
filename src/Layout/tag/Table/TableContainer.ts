import HtmlTagBlock from '../../HtmlTagBlock';
import Pixel from '../../../Unit/Size/Pixel';
import RGB from '../../../Unit/Color/RGB';
import TableTBody from './TableTBody';
import TableTHead from './TableTHead';
import TableTFoot from './TableTFoot';
import TableCell from './TableCell';
import TableTag from './TableTag';
import TableTr from '~/src/Layout/tag/Table/TableTr';
import Height from '~/src/Css/Size/Height';
import MaxWidth from '~/src/Css/Size/MaxWidth';
import BoxSizing from '~/src/Css/BoxModel/BoxSizing';
import BackgroundColor from '~/src/Css/Background/BackgroundColor';
import Display from '~/src/Css/Display/Display';
import Named from '~/src/Unit/Named';
export default abstract class TableContainer extends HtmlTagBlock {

    public abstract getTable(): TableTag
    public setWidthColumn(index: string, width) {
        
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]

            if (child instanceof TableContainer) {
                child.setWidthColumn(index, width)

            } else if (child instanceof TableCell) {
                if (i === parseInt(index)) {
                    child.initWidth(width)
                    child.turnOffFlexGrow()
                } else {
                    // child.turnOnFlexGrow()
                }
            }


        }

    }

    
    protected recursiveFindTableColumnIndex(shortUUID) : number {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            var res
            if (child instanceof TableCell) {
                // console.log('chi', child);
                
                if (child.shortUUID === shortUUID) {
                    // console.log('child.shortUUID === shortUUID', shortUUID);
                    res = i
                }
            } else {
                // console.log('aaassss',child);
                // @ts-ignore
                res = child.recursiveFindTableColumnIndex(shortUUID)
            }

            if (res !== undefined) {
                return res
            }

        }

    }
    
    
    public initHeight(h)
    {
        this.toInitSizeUnits()  
        // console.log(w);
        // console.log(h);
        this._height = h

        let height = new Height(this._height, this.heightUnitCurrent)
        this.updateCssPropertyWithoutModel(height.getName(), height)

        this.notifyPositionalTag()

    }

    protected recursiveFindTableColumn(index) {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i]
            
            if (child instanceof TableCell) {
                if (i === index) {
                    
                }
            }

        }
    }
    
    public injectInitialCssStyles()
    {

        let width = new MaxWidth(500, new Pixel())
        let minHeight = new Height(300, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 100, g:100, b: 100

        }, new RGB())
        let cssList = [ width, minHeight, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }
    
    get cssList() : any
    {
        var css = super.cssList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()
        
    

        return css

    }

    get cssListOverride() : any
    {
        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssList
            
            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()
            

            return cssSelector
        } 

        return {}

    }


    get cssBoxList() : any
    {
        var css = super.cssBoxList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()

        return css
        
        // return css
    }

    get cssBoxListOverride() : any
    {

        var activeSelector = this.getSelectedSelector()
        
        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()

            return cssSelector
        } 
        
        return {}
    }

}