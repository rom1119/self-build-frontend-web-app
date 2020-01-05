import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import MoveEventController from '~/src/MoveEventController'
import DefaultMoveEventController from '../src/Controller/DefaultMoveEventController';
import UnitSize from '~/src/Unit/UnitSize'
import Unit from '../src/Unit/Unit';


export default abstract class AbstractModal extends Vue
{
    protected active = false
    protected value: HtmlTag
    copiedCssList: BasePropertyCss[] = []

    constructor()
    {
        super()
    }

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
        // console.log('oldProp', oldProp);
        if (!this.value) {
            return ''
        }
        console.log('prop', prop);
        let oldProp = this.value.cssAccessor.getProperty(prop)
        
        if (oldProp) {
            return oldProp.getValue()
        }
        return ''
    }
    
    protected getPropertyCssFromModel(prop: string)
    {
        if (!this.value) {
            return null
        }
        return this.value.cssAccessor.getProperty(prop)
    }
    
    protected getPropertyUnitFromModel(prop: string)
    {
        if (!this.value) {
            return null
        }
        let oldProp = this.value.cssAccessor.getProperty(prop)
        if (oldProp) {
            return oldProp.getUnit()
        }
        return null
    }

    protected setPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return false
        }
        if (!this.value.cssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.cssAccessor.addNewProperty(newCssProp)

        } else {
            this.value.updateCssProperty(newCssProp.getName(), newCssProp)
            
        }
        this.value.updateModelComponent()

    }
    
    protected setTmpPropertyToModel(newCssProp: BasePropertyCss)
    {
        if (!this.value) {
            return false
        }
        if (!this.value.tmpCssAccessor.hasCssProperty(newCssProp.getName())) {
            this.value.tmpCssAccessor.addNewProperty(newCssProp)

        } else {
            this.value.tmpCssAccessor.setNewPropertyValue(newCssProp.getName(), newCssProp)
            
        }
        this.value.updateModelComponent()

    }

    protected getUnitByName(units: Unit[],unitName: string): UnitSize
    {
        for (const unit of units) {
            if (unit.name === unitName) {
                return unit
            }
        }

        return null
    }

    protected updateUnitInModel(unit: UnitSize, paddingPropType: string)
    {
        console.log('1111111111');
        let prop = this.getPropertyCssFromModel(paddingPropType)
        if (prop) {
            console.log('222222');
            console.log(unit);
            prop.setUnit(unit)
            this.setPropertyToModel(prop)
        }
    }

    protected getUnitFromPropName(name: string) 
    {
        let prop = this.getPropertyCssFromModel(name)
        if (prop) {
            return <UnitSize>prop.getUnit()
        }
        return null
    }
    
}