<template>

    <div class="stretch stretch__flex cursor-resize-to-right absolute padding-right" 
        :style="value.cssList" 
        v-show="value.isActive()"
        @mousedown.stop="onMouseDown($event)"  
        @mouseover.stop="onMouseOver"
        @mouseout.stop="onMouseOut" 
        :key="value.updateComponentKey"
            >
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
import PaddingRight from '~/src/Layout/Padding/PaddingRight';
import PaddingComponent from './Padding.vue';


@Component
export default class PaddingRightComponent extends PaddingComponent {
    
    contextMenuName = 'cm-create-html-element123'

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