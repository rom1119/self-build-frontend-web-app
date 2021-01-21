<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class=" gray">
        <section class="content">
            <div class="media-query" @click="toggleManager(manager)" v-for="(manager, key) in managers" :key="manager.property.id"

            :class="{ 'active': manager.property.isSelected}">

                <input @dblclick.stop="manager.toggleEditName" v-if="manager.nameEditActive" type="text" v-model="manager.property.name" @input="onChange(manager)">
                <span @dblclick.stop="manager.toggleEditName" v-else>{{ manager.property.name }}</span>

                <span class="remove-btn" @click="remove(manager, key)">
                    X
                </span>

                <div class="content-item__elem content rel">
                    <div class="color-picker-box" @dblclick.stop.prevent="">
                        <label @dblclick.stop.prevent="" style="margin-bottom: 20px;">
                            <div @dblclick.stop.prevent=""
                                 :style="{'background-color': manager.cssBackgroundColor }"
                                 class="color-picker-btn" @click.stop="manager.toggleColorPicker()">
                            </div>
                        </label>

                        <!-- <span>
                            INSET
                            <input type="checkbox" @change="change" v-model="value.inset">
                        </span> -->
                        <div class="color-picker" style="right: -260px !important; left: unset; top: 30px; "   v-show="manager.pickerActive">
                            <Chrome v-model="manager.color" :color="manager.color" label="Color" />
                            <div class="color-picker-nav">
                                <button @click="manager.cancelColor()">Anuluj</button>
                                <button @click="manager.saveColor()">Zapisz</button>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="media-query-values">
                    <media-query-value-component
                    v-for="val in manager.property.values"
                    @change="onChange(manager)"
                    :value="val"
                    :index="val.id"
                    :key="val.id"
                    />

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

    import MediaQueryCss from '~/src/MediaQuery/MediaQueryCss';

    import BaseMediaQueryComponent from './BaseMediaQueryComponent';
    import MediaQueryManager from './computedPropertyManagers/impl/ComputedProperty/MediaQuery/MediaQueryManager';
    import DefaultMediaQueryApiService from '~/src/Api/impl/DefaultMediaQueryApiService';
    import MediaQueryAccessor from '~/src/MediaQuery/MediaQueryAccessor';
    import MediaQueryFactory from "~/src/MediaQuery/MediaQueryFactory";
    import ModelToMediaQuery from "~/src/Transformer/ModelToMediaQuery";
    import DefaultModelToMediaQuery from "~/src/Transformer/impl/DefaultModelToMediaQuery";
    import { Chrome }  from '~/node_modules/vue-color';


    @Component({
        components: {
            Chrome
        }
    })
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
            console.log('created mediq QQQ');
            console.log(this.accessor);
            var projID = this.$route.params.id
            this.projID = projID
            // console.log('created123', projID);
            this.api = new DefaultMediaQueryApiService()
            this.mediaQueryFactory = new MediaQueryFactory(this.api)
            this.modelToDomain =new DefaultModelToMediaQuery(this.mediaQueryFactory)

            // var response = await this.$store.dispatch('mediaQuery/findAllByProject', projID)



            // console.log(this.value);
        }

        isSelected(manager: MediaQueryManager)
        {
            if (!this.accessor.selectedMediaQuery) {
                return false
            }
            return this.accessor.selectedMediaQuery.id == manager.property.id
        }

        onChange(manager: MediaQueryManager)
        {
            console.log('change');

            manager.update()

            if (this.accessor.selectedMediaQuery ) {
                if (this.accessor.selectedMediaQuery.id == manager.property.id) {
                    this.$emit('changeThisMedia', manager.property)
                }
            }

        }

        addNew()
        {
            var manager = new MediaQueryManager(this.mediaQueryFactory.create())
            manager.init()
            manager.property.setApi(this.api)
            manager.property.projectId = this.projID

            this.addManager(manager)
        }

        // isAdded(manager: PseudoClassManager)
        // {
        //     return this.value.pseudoClassAccessor.getSelectorByName(manager.pseudoClass.getName()) != null
        // }
        //
        // offMedia(manager: MediaQueryManager){
        //     this.accessor.selectedMediaQuery = null
        //     this.$emit('selectMediaQuery', null)
        //
        // }
        //
        // onMedia(manager: MediaQueryManager){
        //     this.accessor.selectedMediaQuery = manager.property
        //
        //     this.$emit('selectMediaQuery', null)
        //
        // }

        toggleManager(arg: MediaQueryManager){
            // if (!this.isAdded(arg)) {
            //     return
            // }

            if (!arg.property.isSelected) {
                if (this.accessor.selectedMediaQuery) {
                    this.accessor.selectedMediaQuery.deactivate()
                    this.accessor.selectedMediaQuery = null
                }
                this.accessor.selectedMediaQuery = arg.property
                arg.property.activate()


            } else {
                arg.property.deactivate()
                this.accessor.selectedMediaQuery = null

            }

            this.$emit('selectMediaQuery', this.accessor.selectedMediaQuery)
        }



        remove(arg: MediaQueryManager, index)
        {
            arg.property.api.deleteMedia(arg.property).then(
                () => {
                    this.removeManager(arg, index)
                },
                () => {
                    alert('server error')
                }
            )
        }



        onDblClick(arg: MediaQueryManager) {

            arg.toggleEditName()
        }

        onClick(arg: MediaQueryManager) {
            console.log(arg.property)
            console.log(arg)
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
        border: 3px solid greenyellow;
    }
    .green-bg, .current {
        background-color: greenyellow;

    }

    .remove-btn {
        position: absolute;
        font-weight: bold;
        left: 0;
        top: 0;
        width: 25px;
        color: red;
        padding: 1px 5px;
        font-size: 1em;
        cursor: pointer;
        border: 2px solid red;
        border-radius: 20px;
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
        /*height: 50px;*/
        text-align: center;
        background-color: blue;
        display: inline-block;
        position: relative;
        padding: 5px;
        width: 300px;

        &:hover {
            .media-query-values {
                display: block;

            }
        }
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

    .media-query-values {
        display: block;
    }

    .selector-name {
        width: 80%;
    }
    .btn-check {
        width: 20%;
        display: inline-block;
    }
</style>
