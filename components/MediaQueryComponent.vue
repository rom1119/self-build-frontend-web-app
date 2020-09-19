<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class=" gray">
    

        <section class="content">
            <div class="selector" v-for="manager in managers" :key="manager.domain.id" 
            @dblclick.stop="addRemovePseudoClass(manager)" 
            
            :class="{'active': isAdded(manager), 'current': manager.domain.selectedByOwner}">
                <media-query-value-component @change="onChange(manager)" 
                :tag="value" 
                :value="manager.getProperty()"
                />
                <div class="btn-check">
                    <button @click.stop="toggleManager(manager)" >
                        V
                    </button>
                </div>

            </div>
            <div class="selector">
                <div class="selector-name">
                    <button @click.stop="addNew" >
                        Add Media Query
                    </button>
                </div>
            </div>
        </section>

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
import MediaQueryCss from '~/src/MediaQuery/MediaQueryCss';
import MediaQueryOperator from '~/src/MediaQuery/MediaQueryOperator';
import MediaType from '~/src/MediaQuery/MediaType';
import MediaFeature from '~/src/MediaQuery/MediaFeature';
import MediaOrientation from '~/src/MediaQuery/MediaOrientation';
import BaseMediaQueryComponent from './BaseMediaQueryComponent';
import MediaQueryManager from './computedPropertyManagers/impl/ComputedProperty/MediaQuery/MediaQueryManager';
import DefaultMediaQueryApiService from '~/src/Api/impl/DefaultMediaQueryApiService';
import MediaQueryAccessor from '~/src/MediaQuery/MediaQueryAccessor';


    @Component
    export default class MediaQueryComponent extends BaseMediaQueryComponent {
      
        timeout

        // @Prop({default: [], required: true})
        // values: MediaQueryCss
        


        // _paddingLeft: BasePaddingCss

        cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + 'left'
        cmNameRight = Math.floor(Math.random() * 1000000000).toString() + 'right'
        cmNameTop = Math.floor(Math.random() * 1000000000).toString() + 'top'
        cmNameBottom = Math.floor(Math.random() * 1000000000).toString() + 'bottom'


        idName = 'text-property-modal'
        accessor: MediaQueryAccessor<MediaQueryCss>



        mounted()
        {
            console.log('created');
            var projID = this.$route.params['p']
            
            this.accessor.getApi().getAllForProject(projID).then(
                () => {

                },
                () => {

                }
             ) 
            // console.log(this.value);
        }

        addNew()
        {
            var manager = new MediaQueryManager()
            manager.init()
            manager.property.setApi(this.api)

            this.addManager(manager)
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

        addRemoveMediaQuery(arg: PseudoClassManager){
            var selectorById = this.value.pseudoClassAccessor.getSelectorById(arg.pseudoClass.id)
            if (selectorById) {
                arg.removeSelector()
            } else {
                arg.addSelector()

            }
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

    .gray {
        background-color: gray;

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
            // background-color: bisque;
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
