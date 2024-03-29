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
import TableColumnEl from './elements/TableColumnEl';
import Table from '../../../../components/tables/Table';
import BorderSpacing from '../../../Css/Table/BorderSpacing';
export default abstract class TableContainer extends HtmlTagBlock {
    
    protected _borderXSpacing: BorderSpacing = null
    protected _borderYSpacing: BorderSpacing = null
    protected _borderXSpacingDefault: boolean = false
    protected _borderYSpacingDefault: boolean = false
    
    get borderXSpacing() {
        
        if (this._borderXSpacing) {
            return this._borderXSpacing.getValue()
        }

        return null
    }
    
    get borderYSpacing() {
        
        if (this._borderYSpacing) {
            return this._borderYSpacing.getValue()
        }

        return null
    }

    setBorderXSpacing(spacing: BorderSpacing, isDefault?: boolean) {
        this._borderXSpacing = spacing
        this._borderXSpacingDefault = isDefault
    }
    
    setBorderYSpacing(spacing: BorderSpacing, isDefault?: boolean) {
        this._borderYSpacing = spacing
        this._borderYSpacingDefault = isDefault
    }

    
    getCellByRowIndexAndColIdx(rowIndex: number, colIdx: number): TableCell {
        var k = this.findChildIndexByRowIndex(rowIndex)

        if (k > -1) {
            for (let i = 0; i < this.children[k].children.length; i++) {
                const el: TableCell = <TableCell>this.children[k].children[i];
                if (el.columnElement.index == colIdx) {
                    return el
                }
            }
            // return <TableCell>this.children[k]
        }

        return null
    }
    
    protected findChildIndexByRowIndex(index: number): number {
        var k = -1
        for (let i = 0; i < this.children.length; i++) {
            const el: TableTr = <TableTr>this.children[i];
            if (el.rowElement.index == index) {
                k = i
                break
            }
        }

        return k
    }

    get childrenCells(): TableCell[]
    {

        var res = []
        var leng = this.children.length
        for (let m = 0; m < leng; m++) {
            // const tr = this.children[i];
            var tr = this.children[m]
                    // console.log('tr', tr)
            // @ts-ignore
            for (var i = 0; i < tr.allChildren.length; i++) {
                // @ts-ignore
                var cell = tr.allChildren[i]
                res.push(cell)
            }
            
        }

        return res
    }

    get gridTemplateColumns() {
        var str = ''
        // console.error('gridTemplateColumns');
        var table: TableTag
        if (this instanceof TableTag) {
            table = this
        } else {
            table = <TableTag>this.parent
        }
        
        var colLength = table.columns.length
        for (let i = 0; i < colLength; i++) {
            const col = table.columns[i];
            str += 'minmax(0px, ' + col.widthToRealInject + 'px) '
            
        }

        // console.error('str COLS' , str);

        return str
    }
    
    get gridTemplateRows() {
        var str = ''
        // console.error('gridTemplateColumns');
        var table: TableTag
        if (this instanceof TableTag) {
            table = this
        } else {
            table = <TableTag>this.parent
        }
        
        var colLength = table.rows.length
        for (let i = 0; i < colLength; i++) {
            const row = table.rows[i];
            str += 'minmax(0px, ' + row.heightToRealInject + 'px) '

            // if (this instanceof TableTag) {
                
            // } else {
            //     if (this.children.indexOf(row.tr) > -1) {
            //         str += row.heightToRealInject + 'px '

            //     }
            // }
            
        }

        // console.error('str ROWS' , str);

        return str
    }

    

    public abstract getTable(): TableTag


    public updateWidthStylesForColumn(tabCol: TableColumnEl, width) {
        var childrenList
        // @ts-ignore
        if (this.allChildren) {
            // @ts-ignore
            childrenList = this.allChildren
        } else {
            childrenList = this.children
            
        }
        var hasSetMinMaxGridColumn = false
        for (var i = 0; i < childrenList.length; i++) {
            var child = childrenList[i]

            if (child instanceof TableContainer) {
                child.updateWidthStylesForColumn(tabCol, width)

            } else if (child instanceof TableCell) {

                // if (i === 0) {
                //     if (!hasSetMinMaxGridColumn) {
                //     }
                
                // } else {
                    
                // }
                // if(tabCol.addCellChild)
                if (tabCol.index === child.colIndex) {
                    // child.initWidth(width)
                    // child.turnOffFlexGrow()
                    // child.turnOffMinMaxGridColumn()
                } else {
                    // child.turnOnFlexGrow()
                    // child.turnOnMinMaxGridColumn()
                }
            }


        }

    }


    public recursiveFindTableColumnIndex(shortUUID): number {
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




    public initHeight(h) {
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

    public injectInitialCssStyles() {

        let width = new MaxWidth(500, new Pixel())
        let minHeight = new Height(300, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({
            r: 100, g: 100, b: 100

        }, new RGB())
        let cssList = [width, minHeight, boxSizing, backgroundColor]

        this.addPropsToAccessor(cssList)
    }

    get cssList(): any {
        var css = super.cssList
        var flex = new Display(Display.GRID, new Named())
        css[flex.getName()] = flex.getValue()

        if (this.borderXSpacing) {
            css['rowGap'] = this.borderXSpacing
        }
        
        if (this.borderYSpacing) {
            css['columnGap'] = this.borderYSpacing
        }


        return css

    }

    get cssListOverride(): any {
        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssList

            var flex = new Display(Display.GRID, new Named())
            cssSelector[flex.getName()] = flex.getValue()


            return cssSelector
        }

        return {}

    }


    get cssBoxList(): any {
        var css = super.cssBoxList
        var flex = new Display(Display.FLEX, new Named())
        css[flex.getName()] = flex.getValue()

        return css

        // return css
    }

    get cssBoxListOverride(): any {

        var activeSelector = this.selectedSelector

        if (activeSelector) {
            var cssSelector = activeSelector.cssBoxList

            var flex = new Display(Display.FLEX, new Named())
            cssSelector[flex.getName()] = flex.getValue()

            return cssSelector
        }

        return {}
    }

}
