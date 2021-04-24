import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
import HtmlTag from '~/src/Layout/HtmlTag'
import BasePropertyCss from '~/src/Css/BasePropertyCss'
import _ from 'lodash'
import AbstractModal from './AbstractModal'
import Display from '../src/Css/Display/Display';
import BaseComputedPropertyManager from './computedPropertyManagers/BaseComputedPropertyManager'
import DisplayProperty from './computedPropertyManagers/impl/ComputedProperty/Display/DisplayProperty'
import Hover from '../src/PseudoSelector/PseudoClass/Hover';
import Active from '~/src/PseudoSelector/PseudoClass/Active'
import Visited from '~/src/PseudoSelector/PseudoClass/Visited'
import Focus from '~/src/PseudoSelector/PseudoClass/Focus'
import PseudoClassManager from './computedPropertyManagers/pseudoSelector/PseudoClassManager'
import FirstChild from '../src/PseudoSelector/PseudoClass/FirstChild';
import FirstOfType from '../src/PseudoSelector/PseudoClass/FirstOfType';
import LayoutMode from '../src/Mode/LayoutMode';
import EditMode from '../src/Mode/impl/EditMode';



export default abstract class BaseCreatorInfoComponent extends Vue
{


    active = true;
    // show(val: HtmlTag){
    //     Vue.set(this, 'managers', [])

    //     // this.hoverManager.setHtmlEl(val)
        
     
    // }

   
}