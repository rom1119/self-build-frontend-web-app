import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import MoveEventController from '~/src/MoveEventController'
import DefaultMoveEventController from '../src/Controller/DefaultMoveEventController';
import UnitSize from '~/src/Unit/UnitSize'
import Unit from '../src/Unit/Unit';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import PositionCss from '../src/Css/Display/PositionCss';
import AbstractManageComponent from './manageComponent/AbstractManageComponent';


export default abstract class AbstractModal extends Vue
{
    protected active = false
    protected value: HtmlTag = null
    protected manageComponent: AbstractManageComponent = null
  
    constructor()
    {
        super()
    }


    restore(e)
    {
        
        this.manageComponent.restore()
        // this.close()
    }

    public show(val: HtmlTag, manageComponent: AbstractManageComponent)
    {
        if (!val) {
            throw Error('val must not be null')
        }
        this.manageComponent = manageComponent
        this.active = true
        this.value = val
 
    }

    public close()
    {
        this.active = false
        this.value = null
    }

    
}