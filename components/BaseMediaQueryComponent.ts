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
import MediaQueryManager from './computedPropertyManagers/impl/ComputedProperty/MediaQuery/MediaQueryManager';
import MediaQueryAccessor from '~/src/MediaQuery/MediaQueryAccessor'
import MediaQueryCss from '../src/MediaQuery/MediaQueryCss';



export default abstract class BaseMediaQueryComponent extends Vue
{
    managers: MediaQueryManager[]
    accessor: MediaQueryAccessor<MediaQueryCss>

    constructor()
    {
        super()
        Vue.set(this, 'managers', [])
        this.accessor = new MediaQueryAccessor()
        // this.activeManager = new PseudoSelectoryManager<Active>()
        // this.focusManager = new PseudoSelectoryManager<Focus>()
        // this.visitedManager = new PseudoSelectoryManager<Visited>()


    }


    addManager(manager: MediaQueryManager)
    {
        this.managers.push(manager)
    }


   
}