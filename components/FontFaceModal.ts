import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import MoveEventController from '~/src/MoveEventController'
import DefaultMoveEventController from '../src/Controller/DefaultMoveEventController';
import UnitSize from '~/src/Unit/UnitSize'
import Unit from '../src/Unit/Unit';
import AbstractModal from './AbstractModal'
import HtmlAttrManager from './computedPropertyManagers/HtmlAttrManager'
import SrcManager from './computedPropertyManagers/htmlAttr/SrcManager'
import { CustomAttr } from '~/src/Attribute'
import CustomAttrManager from './computedPropertyManagers/htmlAttr/CustomAttrManager'
import FontFaceAccessor from '../src/Fonts/FontFaceAccessor';
import FontFace from '../src/Fonts/FontFace';


export default abstract class FontFaceModal extends Vue
{
    active = false

    managers: FontFace[]
    accessor: FontFaceAccessor = null
    public static accessorStatic: FontFaceAccessor


    constructor()
    {
        super()
        Vue.set(this, 'managers', [])
        
    }

    public init(projectId: string)
    {
        this.accessor = FontFaceAccessor.getInstance(projectId)
        FontFaceModal.accessorStatic = this.accessor
    }

    show(){

        this.active = true
    }

    public close()
    {
        this.active = false
    }
    
}