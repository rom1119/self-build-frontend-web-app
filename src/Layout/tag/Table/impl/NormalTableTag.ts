import { BoxSizing, Height, Width, BackgroundColor, MinHeight } from '~/src/Css';
import { Named, Pixel } from '~/src/Unit';
import RGB from '~/src/Unit/Color/RGB';
import TableTag from '../TableTag';
import TableTBody from '../TableTBody';
import TableTHead from '../TableTHead';
import TableTh from '../TableTh';
import TableTr from '../TableTr';
import TableTd from '../TableTd';
import PaddingCss from '../../../../Css/BoxModel/Padding/PaddingCss';

export default class NormalTableTag extends TableTag {

   
    
    public injectInitialCssStyles()
    {

        let width = new Width(500, new Pixel())
        let minHeight = new Height(600, new Pixel())
        let p = new PaddingCss(50, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 200, g:200, b: 200

        }, new RGB())
        let cssList = [width, minHeight, boxSizing, backgroundColor, p]
        
        var thead = new TableTHead()
        var trHead  = new TableTr()
        var col = new TableTh('head col 1')
        var colSec = new TableTh('head col 2')

        trHead.appendChild(col)
        trHead.appendChild(colSec)

        thead.appendChild(trHead)

        var tbody = new TableTBody()

        var trbody  = new TableTr()
        var cell = new TableTd('content col 1')
        var cellsec = new TableTd('content col 2')

        trbody.appendChild(cell)
        trbody.appendChild(cellsec)
        
        var trbodySec = new TableTr()
        var cellS = new TableTd('content col 3')
        var cellsecS = new TableTd('content col 4')

        trbodySec.appendChild(cellS)
        trbodySec.appendChild(cellsecS)

        tbody.appendChild(trbody)
        tbody.appendChild(trbodySec)

        this.appendChild(thead)
        this.appendChild(tbody)
        // var tbody = new TableTBody()

        this.addPropsToAccessor(cssList)
    }
    

}