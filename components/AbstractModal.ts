import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'


export default abstract class AbstractModal extends Vue
{
    protected active = false
    protected value: HtmlTag
    copiedCssList: BasePropertyCss[] = []

    restore(e)
    {
        this.value.cssAccessor.replaceAll(this.copiedCssList)
        
        this.close()
    }

    public show(val: HtmlTag)
    {
        if (!val) {
            throw Error('val must not be null')
        }
        this.active = true
        this.value = val
        
        this.copiedCssList = _.cloneDeep(this.value.cssAccessor.getAll())
        
    }

    public close()
    {
        this.active = false
        this.value = null
    }

    protected getPropertyFromModel(prop: string)
    {
        if (!this.value) {
            return ''
        }
        let oldProp = this.value.cssAccessor.getProperty(prop)
        if (oldProp) {
            return oldProp.getValue()
        }
        return ''
    }

    protected setPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return ''
        }
        if (!this.value.cssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.cssAccessor.addNewProperty(newCssProp)

        } else {
            this.value.updateCssProperty(newCssProp.getName(), newCssProp)
            
        }
    }
}