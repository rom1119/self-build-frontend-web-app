<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class=" gray">


        <section class="content">
            <div class="media-query" v-for="manager in managers" :key="manager.property.id"
            @dblclick.stop="addRemovePseudoClass(manager)"

            :class="{ 'current': manager.property.selectedByOwner}">
                <span>{{ manager.property.name }}</span>
                <media-query-value-component
                    v-for="val in manager.property.values"
                    @change="onChange(manager)"
                    :value="val"
                    :index="val.id"
                    :key="val.id"
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
    import MediaQueryFactory from "~/src/MediaQuery/MediaQueryFactory";
    import ModelToMediaQuery from "~/src/Transformer/ModelToMediaQuery";
    import DefaultModelToMediaQuery from "~/src/Transformer/impl/DefaultModelToMediaQuery";


    @Component
    export default class MediaQueryComponent extends BaseMediaQueryComponent {

        timeout

        // @Prop({default: [], required: true})
        // values: MediaQueryCss

        private mediaQueryFactory: MediaQueryFactory

        cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + 'left'
        cmNameRight = Math.floor(Math.random() * 1000000000).toString() + 'right'
        cmNameTop = Math.floor(Math.random() * 1000000000).toString() + 'top'
        cmNameBottom = Math.floor(Math.random() * 1000000000).toString() + 'bottom'

        idName = 'text-property-modal'
        projID
        accessor: MediaQueryAccessor<MediaQueryCss>

        api
        modelToDomain: ModelToMediaQuery

        async mounted()
        {
            console.log('created');
            var projID = this.$route.params.id
            this.projID = projID
            // console.log('created123', projID);
            this.api = new DefaultMediaQueryApiService()
            this.mediaQueryFactory = new MediaQueryFactory(this.api)
            this.modelToDomain =new DefaultModelToMediaQuery(this.mediaQueryFactory)

            var response = await this.$store.dispatch('mediaQuery/findAllByProject', projID)

            for (const tagModel of response.data) {
                let domain = this.modelToDomain.transform(tagModel)

                var manager = new MediaQueryManager(domain)
                manager.property.setApi(this.api)
                manager.init()

                this.addManager(manager)
                // tag.setProjectId(this.$route.params.id)
                // @ts-ignore
                // console.log(tag);
                // tag.recalculateRealComputedProperties()

            }

            // console.log(this.value);
        }

        onChange(manager: MediaQueryManager)
        {
            console.log('change');

            manager.update()

        }

        addNew()
        {
            var manager = new MediaQueryManager(this.mediaQueryFactory.create())
            manager.init()
            manager.property.setApi(this.api)
            manager.property.projectId = this.projID

            this.addManager(manager)
        }

        isSelected(manager: PseudoClassManager)
        {
            if (!this.value.pseudoClassAccessor.selectedSelector) {
                return false
            }
            return this.value.pseudoClassAccessor.selectedSelector.id === manager.pseudoClass.id
        }

        // isAdded(manager: PseudoClassManager)
        // {
        //     return this.value.pseudoClassAccessor.getSelectorByName(manager.pseudoClass.getName()) != null
        // }

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

    .media-query {
        color: white;
        height: 50px;
        text-align: center;
        background-color: blue;
        display: inline-block;
    }

    .selector {
        /*display: flex;*/

        &:hover {
            // background-color: bisque;
        }
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
    }

    .selector-name {
        width: 80%;
    }
    .btn-check {
        width: 20%;
        display: inline-block;
    }
</style>
