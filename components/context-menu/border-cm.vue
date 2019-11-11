<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">
        <div class="context-menu-container">
            <context-menu-item :action="setSolid">Solids</context-menu-item>

            <context-menu-item :action="setDotted">Dotted</context-menu-item>
            <context-menu-item :action="setDashed">Dashed</context-menu-item>
            <context-menu-item :action="setNone">None</context-menu-item>

        </div>
    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import BorderModel from '../../src/Layout/Border/BorderModel'

@Component
export default class HtmlBorderContextMenu extends Vue {
    @Prop({required: true})
    value: BorderModel
    
    setSolid(a)
    {
        
        this.value.setSolid()
    }

    setDotted()
    {
        this.value.setDotted()
    }

    setDashed()
    {
        this.value.setDashed()
    }
    setNone()
    {
        this.value.setNone()
    }

}
</script>

<style scoped>

</style>
