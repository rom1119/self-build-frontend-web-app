import HtmlTag from '~/src/Layout/HtmlTag'
import _ from 'lodash'
import AbstractManageComponent from './AbstractManageComponent';
import { ColspanAttr, RowspanAttr, CustomAttr } from '~/src/Attribute'
import ColspanAttrManager from '../computedPropertyManagers/htmlAttr/ColspanAttrManager'
import CustomAttrManager from '../computedPropertyManagers/htmlAttr/CustomAttrManager'
import RowspanAttrManager from '../computedPropertyManagers/htmlAttr/RowspanAttrManager'
import HtmlAttrManager from '../computedPropertyManagers/HtmlAttrManager'


export default abstract class HtmlAttrManage extends AbstractManageComponent
{
    colspanManager: HtmlAttrManager<ColspanAttr>
    rowspanManager: HtmlAttrManager<RowspanAttr>
    customManagerList: HtmlAttrManager<CustomAttr>[]
    customAttrManager: HtmlAttrManager<CustomAttr>

    constructor()
    {
        super()
        this.colspanManager = new ColspanAttrManager()
        this.rowspanManager = new RowspanAttrManager()
        this.customAttrManager = new CustomAttrManager()
        this.customManagerList = []
    }

    init(val: HtmlTag){
        super.init(val)
        this.reinit()
    }

    protected initManager(manager: HtmlAttrManager<any>) {
        manager.setHtmlEl(this.value)
        manager.init()

        this.managers.push(manager)
    }

    public reinit() {
        this.managers = []
        this.initManager(this.colspanManager)
        this.initManager(this.rowspanManager)
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

    addCustomAttr(): CustomAttrManager {
        var man = new CustomAttrManager()
        this.initManager(man)

        // this.customManagerList.push(man)

        return man
    }
}