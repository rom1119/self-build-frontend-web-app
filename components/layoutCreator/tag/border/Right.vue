<template>

    <div class="stretch stretch__flex absolute cursor-resize-to-right"  style="opacity: 0 !important;"
        :style="value.cssList" 
        v-show="value.isActive()"
        @mousedown.stop="onMouseDown($event)"  
        @mouseover.stop="onMouseOver"
        @mouseout.stop="onMouseOut" 
        :key="value.updateComponentKey"
    >
        <!-- <border-html-context-menu :value="value"  :ref="contextMenuName" /> -->
        <div class="stretch" 
           >
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from "~/src/Layout/HtmlTag";
import Right from '~/src/Site/Right';
import BorderRight from '../../../../src/Layout/Border/BorderRight';
import BorderComponent from './Border.vue';


@Component
export default class BorderRightComponent extends BorderComponent {
    
    contextMenuName = 'cm-border-right-component-'
    onMouseOver() {            
        super.onMouseOver(this)
    }

    onMouseOut() {
        super.onMouseOut(this)
    }
    
    onMouseDown(ev) {
        super.onMouseDown(this, ev)
    }
    
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>


<style scoped lang="scss">
    .stretch {
        align-content: stretch;
        &.stretch__flex {
            display: flex;
        }
    }
</style>