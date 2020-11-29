import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import HtmlAttrManager from './computedPropertyManagers/HtmlAttrManager'
import ColspanAttr from '~/src/Attribute/html/ColspanAttr'
import RowspanAttr from '~/src/Attribute/html/RowspanAttr'
import CustomAttr from '../src/Attribute/html/CustomAttr';
import ColspanAttrManager from './computedPropertyManagers/htmlAttr/ColspanAttrManager'
import CustomAttrManager from './computedPropertyManagers/htmlAttr/CustomAttrManager'
import RowspanAttrManager from './computedPropertyManagers/htmlAttr/RowspanAttrManager'



export default abstract class HtmlAttrManageModal extends AbstractModal
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

    show(val: HtmlTag){
        super.show(val)
        // this.paddingRealFetcher = this.value.paddingRealFetcher
        // this.marginRealFetcher = this.value.marginRealFetcher
        // this.borderRealFetcher = this.value.borderRealFetcher
        
        this.reinit()
    }

    protected init(manager: HtmlAttrManager<any>) {
        manager.setHtmlEl(this.value)
        manager.init()

        this.managers.push(manager)
    }

    public reinit() {
        this.managers = []
        this.init(this.colspanManager)
        this.init(this.rowspanManager)
        // this.init(this.customAttrManager)

        console.log('ASDASD');
        console.log(this.value.attributeAccessor.getAll());
        
        for (const attr of this.value.attributeAccessor.getAll()) {
            if (attr instanceof CustomAttr) {
                var c = new CustomAttrManager()
                c.attr = attr
                this.init(c)

            }
        }
    }

    addCustomAttr(): CustomAttrManager {
        var man = new CustomAttrManager()
        this.init(man)

        // this.customManagerList.push(man)

        return man
    }
}