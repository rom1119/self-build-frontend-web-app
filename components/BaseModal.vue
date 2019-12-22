<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="my-modal" >
        <div class=" my-modal__header">
            <div class="my-modal__move" @mousedown.stop="onMouseDown($event)" ></div>
            <slot name="header" />
        </div>
        <div class="my-modal__content">
            <slot name="content" />
        </div>
        <div class="my-modal__footer">
            
            <slot name="footer" />
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import moment from 'moment'
    import {Pagination} from "~/types/Pagination";
import HtmlTag from '~/src/Layout/HtmlTag';
import AbstractModal from './AbstractModal';
import MoveEventController from '~/src/MoveEventController';
import DefaultMoveEventController from '~/src/Controller/DefaultMoveEventController';


    @Component
    export default class BaseModal extends Vue {
        
        availableItemPerPage = [1,2,5,10,15,20]
        moveController: MoveEventController


        idName = 'base-modal'
        mouseMoveHandler
        mouseUpHandler



        onMouseDown(ev) {
            this.moveController.mouseDownHandler(ev)
            this.mouseMoveHandler = (ev) => {
                this.moveController.mouseMoveHandler(ev)
            }
            
            this.mouseUpHandler = (ev) => {
                this.moveController.mouseUpHandler(ev)
                this.onMouseUp()
            }
            window.document.body.addEventListener('mousemove', this.mouseMoveHandler)
            window.document.body.addEventListener('mouseup', this.mouseUpHandler)
        }

        onMouseUp()
        {
            window.document.body.removeEventListener('mousemove', this.mouseMoveHandler)
            window.document.body.removeEventListener('mouseup', this.mouseUpHandler)
        }

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            this.moveController = new DefaultMoveEventController()

        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }

    }
</script>

<style lang="scss">
    
</style>