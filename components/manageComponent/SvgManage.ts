import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import AbstractManageComponent from './AbstractManageComponent';
import SvgTag from '~/src/Layout/tag/SvgTag'


export default abstract class SvgManage extends AbstractManageComponent
{
    svgContent: string = ''

    constructor()
    {
        super()
    }

    init(val: HtmlTag){
        super.init(val)

        this.svgContent = (<SvgTag>val).svgContent
        // this.managers = []
        // this.managers.push(this.imgSrcManager)


    }

    // protected init(manager: HtmlAttrManager<any>) {
    //     manager.setHtmlEl(this.value)
    //     manager.init()

    //     this.managers.push(manager)
    // }

    public reinit() {
        this.managers = []
        // this.init(this.imgSrcManager)
        // // this.init(this.customAttrManager)

        // // console.log('ASDASD');
        // // console.log(this.value.attributeAccessor.getAll());
        
        // for (const attr of this.value.attributeAccessor.getAll()) {
        //     if (attr instanceof CustomAttr) {
        //         var c = new CustomAttrManager()
        //         c.attr = attr
        //         this.init(c)

        //     }
        // }
    }
}