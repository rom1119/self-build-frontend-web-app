<template >

    <div class="abs white">
    
        <header class="headers-selec">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h2 class="title">
                Pseudo selectors
            </h2>
        </header>
        <section class="content">
            <div class="selector" v-for="manager in pseudoClassManagers" :key="manager.pseudoClass.id" 
            @dblclick.stop="addRemovePseudoClass(manager)" 
            
            :class="{'active': isAdded(manager), 'current': manager.pseudoClass.selectedByOwner}">
                <div class="selector-name">
                    {{ manager.pseudoClass.getName() }}
                </div>
                <div class="btn-check">
                    <button @click.stop="toggleManager(manager)" >
                        V
                    </button>
                </div>

            </div>
        </section>
        <footer class="footer">
            <!-- <button class="to-left" @click="restore($event)">
                Przywróć
            </button>
            <button class="to-right">
                Zapisz
            </button> -->
        </footer>
    </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import _ from 'lodash'
    import {Pagination} from "~/types/Pagination";
    import PseudoClass from '~/src/PseudoSelector/PseudoClass';
    import HtmlTag from '~/src/Layout/HtmlTag';
import PseudoClassManager from './computedPropertyManagers/pseudoSelector/PseudoClassManager';
import PseudoSelector from '~/src/PseudoSelector/PseudoSelector';
import BasePseudoSelectorComponent from './BasePseudoSelectorComponent';


    @Component
    export default class PseudoSelectorComponent extends BasePseudoSelectorComponent {
      
        timeout
        @Prop({default: null, required: false})
        value: HtmlTag
        
        
        pseudoClasses: PseudoClass[] = []

        // _paddingLeft: BasePaddingCss

        cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + 'left'
        cmNameRight = Math.floor(Math.random() * 1000000000).toString() + 'right'
        cmNameTop = Math.floor(Math.random() * 1000000000).toString() + 'top'
        cmNameBottom = Math.floor(Math.random() * 1000000000).toString() + 'bottom'


        idName = 'text-property-modal'

        created()
        {
            console.log('created');
            console.log(this.value);
            this.show(this.value)
        }

        isSelected(manager: PseudoClassManager)
        {
            if (!this.value.pseudoClassAccessor.selectedSelector) {
                return false
            }
            return this.value.pseudoClassAccessor.selectedSelector.id === manager.pseudoClass.id
        }
        
        isAdded(manager: PseudoClassManager)
        {
            return this.value.pseudoClassAccessor.getSelectorByName(manager.pseudoClass.getName()) != null
        }

        addRemovePseudoClass(arg: PseudoClassManager){
            var selectorById = this.value.pseudoClassAccessor.getSelectorById(arg.pseudoClass.id)
            if (selectorById) {
                arg.removeSelector()
            } else {
                arg.addSelector()

            }
        }

        toggleManager(arg: PseudoClassManager){
            if (!this.isAdded(arg)) {
                return
            }
            if (!arg.pseudoClass.selectedByOwner) { 
                if (this.value.pseudoClassAccessor.selectedSelector) {
                    this.value.pseudoClassAccessor.selectedSelector.selectedByOwner = false
                    this.value.pseudoClassAccessor.selectedSelector = null
                }

                arg.activateSelector()

                
            } else {
                arg.deactivateSelector()

            }

            this.$emit('selectPseudoSelector', this.value.pseudoClassAccessor.selectedSelector)
        }
        
        mounted()
        {
            console.log('mounted');
            // this.show(this.value)
        }

        public close()
        {
            this.$emit('close')
        }


   

        // *****************************************  LEFT ****************************************************
        
        // get left()
        // {
        //     return  this.hove.getProperty().value
        // }
        
        // set left(newVal: string)
        // {
        //     this.leftManager.getProperty().setValue(newVal)
        //     this.leftManager.updateCssProp(this.leftManager.getProperty())             
        // }

        // get leftUnit()
        // {
        //     return  this.leftManager.getProperty().getUnit()
        // }
        
        // set leftUnit(newVal: UnitSize)
        // {
        //     this.leftManager.getProperty().setUnit(newVal)
        //     this.leftManager.updateCssProp(this.leftManager.getProperty())             
        // }

        // get hasLeft()
        // {
        //     return  this.leftManager.getProperty().active
        // }
        
        // set hasLeft(newVal: boolean)
        // {
        //     if (!newVal) {
        //         this.leftManager.deactivePropCss(this.leftManager.getProperty())
        //     } else {
        //         this.leftManager.activePropCss(this.leftManager.getProperty())
        //     }
        // }
      
        
        
        // get widthUnit()
        // {
        //     return  this.widthManager.getProperty().getUnit()
        // }
        
        // set widthUnit(newVal: UnitSize)
        // {
        //     this.widthManager.getProperty().setUnit(newVal)
        //     this.widthManager.updateCssProp(this.widthManager.getProperty())             
        // }        

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
    .green-bg, .current {
        background-color: greenyellow;

    }

    .title {
        font-size: 1.1em;
    }
    .rel {
        position: relative;
    }
    .abs {
        position: absolute;
    }

    .h-550 {
        height: 550px;
    }
    .w-400 {
        width: 400px;
    }
    
    .w-50-pr {
        width: 50%;
    }
    
    .h-400 {
        height: 400px;
    }

    .white {
        background-color: white;
        left: -300%;
        width: 200px;
    }

    .selector {
        height: 50px;
        text-align: center;
        display: flex;

        &:hover {
            background-color: bisque;
        }
    }

    .close {
        position: abolute;
        top: 0;
        right: 0;
    }

    .selector-name {
        width: 80%;
    }
    .btn-check {
        width: 20%;

    }
</style>
