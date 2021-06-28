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
import TableTFoot from '../TableTFoot';
import RGBA from '../../../../Unit/Color/RGBA';

export default class NormalTableTag extends TableTag {

   
    
    public injectInitialCssStyles()
    {

        let width = new Width(600, new Pixel())
        let minHeight = new Height(600, new Pixel())
        let p = new PaddingCss(50, new Pixel())
        let boxSizing = new BoxSizing(BoxSizing.BORDER_BOX, new Named())
        let backgroundColor = new BackgroundColor({r: 200, g:200, b: 200

        }, new RGB())
        let cssList = [width, minHeight, boxSizing, backgroundColor, p]
        
        // ========  HEAD ===
        var thead = new TableTHead()
        var trHead  = new TableTr()
        var col = new TableTh('head col 1')
        var colSec = new TableTh('head col 2')
        var colThird = new TableTh('head col 3')
        var colFourth = new TableTh('head col 4')

        trHead.appendChildNotPersist(col)
        trHead.appendChildNotPersist(colSec)
        trHead.appendChildNotPersist(colThird)
        trHead.appendChildNotPersist(colFourth)

        var trSHead  = new TableTr()
        var colS = new TableTh('head col 11')
        var colSecS = new TableTh('head col 22')
        var colThirdS = new TableTh('head col 33')
        var colFourthS = new TableTh('head col 44')

        trSHead.appendChildNotPersist(colS)
        trSHead.appendChildNotPersist(colSecS)
        trSHead.appendChildNotPersist(colThirdS)
        trSHead.appendChildNotPersist(colFourthS)

        thead.appendChildNotPersist(trHead)
        thead.appendChildNotPersist(trSHead)

        // ========  BODY ===

        var tbody = new TableTBody()

        var trbody = new TableTr()
        
        var cell = new TableTd('content col 1')
        var cellsec = new TableTd('content col 2')
        var cellS = new TableTd('content col 3')
        var cellsecS = new TableTd('content col 4')

        trbody.appendChildNotPersist(cell)
        trbody.appendChildNotPersist(cellsec)
        trbody.appendChildNotPersist(cellS)
        trbody.appendChildNotPersist(cellsecS)
        
        var trbodySec = new TableTr()
        
        var cell = new TableTd('content col 1')
        var cellsec = new TableTd('content col 2')
        var cellS = new TableTd('content col 3')
        var cellsecS = new TableTd('content col 4')

        trbodySec.appendChildNotPersist(cell)
        trbodySec.appendChildNotPersist(cellsec)
        trbodySec.appendChildNotPersist(cellS)
        trbodySec.appendChildNotPersist(cellsecS)

        var trbodyThird = new TableTr()
        
        var cell = new TableTd('content col 1')
        var cellsec = new TableTd('content col 2')
        var cellS = new TableTd('content col 3')
        var cellsecS = new TableTd('content col 4')

        trbodyThird.appendChildNotPersist(cell)
        trbodyThird.appendChildNotPersist(cellsec)
        trbodyThird.appendChildNotPersist(cellS)
        trbodyThird.appendChildNotPersist(cellsecS)

        tbody.appendChildNotPersist(trbody)
        tbody.appendChildNotPersist(trbodySec)
        tbody.appendChildNotPersist(trbodyThird)

        // ========  FOOT ===

        var tfoot = new TableTFoot()

        let backgroundColorFoot = new BackgroundColor({ r: 40, g: 40, b: 250, a: 0.4 }, new RGBA())


        var trFoot  = new TableTr()
        var colFoot = new TableTd('foot col 1')
        var colFootSec = new TableTd('foot col 2')
        var colFootThird = new TableTd('foot col 3')
        var colFootFourth = new TableTd('foot col 4')
        
        trFoot.appendChildNotPersist(colFoot)
        trFoot.appendChildNotPersist(colFootSec)
        trFoot.appendChildNotPersist(colFootThird)
        trFoot.appendChildNotPersist(colFootFourth)

        colFoot.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootSec.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootThird.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootFourth.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)

        var trSFoot  = new TableTr()
        var colFootS = new TableTd('foot col 11')
        var colFootSecS = new TableTd('foot col 22')
        var colFootThirdS = new TableTd('foot col 33')
        var colFootFourthS = new TableTd('foot col 44')

        trSFoot.appendChildNotPersist(colFootS)
        trSFoot.appendChildNotPersist(colFootSecS)
        trSFoot.appendChildNotPersist(colFootThirdS)
        trSFoot.appendChildNotPersist(colFootFourthS)

        colFootS.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootSecS.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootThirdS.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)
        colFootFourthS.updateCssPropertyWithoutModel(backgroundColorFoot.getName(), backgroundColorFoot)

        tfoot.appendChildNotPersist(trFoot)
        tfoot.appendChildNotPersist(trSFoot)





        this.appendChildNotPersist(thead)
        this.appendChildNotPersist(tbody)
        this.appendChildNotPersist(tfoot)
        // var tbody = new TableTBody()

        this.addPropsToAccessor(cssList)
    }
    

}