import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import AbstractManageComponent from './AbstractManageComponent';
import { ColspanAttr, RowspanAttr, CustomAttr } from '~/src/Attribute'
import ColspanAttrManager from '../computedPropertyManagers/htmlAttr/ColspanAttrManager'
import CustomAttrManager from '../computedPropertyManagers/htmlAttr/CustomAttrManager'
import RowspanAttrManager from '../computedPropertyManagers/htmlAttr/RowspanAttrManager'
import HtmlAttrManager from '../computedPropertyManagers/HtmlAttrManager'
import SrcManager from '../computedPropertyManagers/htmlAttr/SrcManager';


export default abstract class ImgManage extends AbstractManageComponent
{
    imgSrcManager: SrcManager

    constructor()
    {
        super()
        this.imgSrcManager = new SrcManager()
    }

    init(val: HtmlTag){
        super.init(val)

        this.imgSrcManager.setHtmlEl(val)   

        this.managers = []
        this.managers.push(this.imgSrcManager)


    }

    protected initManager(manager: HtmlAttrManager<any>) {
        manager.setHtmlEl(this.value)
        manager.init()

        this.managers.push(manager)
    }

    public reinit() {
        this.managers = []
        this.initManager(this.imgSrcManager)
        // this.init(this.customAttrManager)

        // console.log('ASDASD');
        // console.log(this.value.attributeAccessor.getAll());
        
        for (const attr of this.value.attributeAccessor.getAll()) {
            if (attr instanceof CustomAttr) {
                var c = new CustomAttrManager()
                c.attr = attr
                this.initManager(c)

            }
        }
    }
}