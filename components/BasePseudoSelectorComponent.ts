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



export default abstract class BasePseudoSelectorComponent extends Vue
{
    pseudoClassManagers: PseudoClassManager[] = []
    value: HtmlTag
    // hoverManager: PseudoSelectoryManager<Hover>
    // activeManager: PseudoSelectoryManager<Active>
    // focusManager: PseudoSelectoryManager<Focus>
    // visitedManager: PseudoSelectoryManager<Visited>
    // visitedManager: PseudoSelectoryManager<Visited>


    show(val: HtmlTag){
        // super.show(val)
        Vue.set(this, 'pseudoClassManagers', [])
        this.pseudoClassManagers.push(new PseudoClassManager(new Active(val)))
        this.pseudoClassManagers.push(new PseudoClassManager(new Hover(val)))
        this.pseudoClassManagers.push(new PseudoClassManager(new Visited(val)))
        this.pseudoClassManagers.push(new PseudoClassManager(new Focus(val)))
        this.pseudoClassManagers.push(new PseudoClassManager(new FirstChild(val)))
        this.pseudoClassManagers.push(new PseudoClassManager(new FirstOfType(val)))
        this.value = val

        // this.hoverManager.setHtmlEl(val)


        // this.paddingManager.setFetcher(this.paddingRealFetcher)
        // this.marginManager.setFetcher(this.marginRealFetcher)
        // this.borderManager.setFetcher(this.borderRealFetcher)

        // this.hoverManager.init()
        this.initPseudoClasses()
        console.log('POPOPOPO');


    }

    protected initPseudoClasses()
    {

        for (const manager of this.pseudoClassManagers) {
            var selector = this.value.currentPseudoClassAccessor.getSelectorByName(manager.pseudoClass.getName())
            if (selector)  {
                // console.log('DONE');
                // console.log(manager.pseudoClass);
                // console.log(selector);
                manager.pseudoClass = selector
                if (this.value.currentPseudoClassAccessor.selectedSelector) {
                    if (selector.id === this.value.currentPseudoClassAccessor.selectedSelector.id) {
                        manager.pseudoClass.selectedByOwner = true
                    }

                }
            }
        }
    }
}
