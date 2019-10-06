<template>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Left from '~/src/Site/Left';
import BorderModel from '../../../../src/Layout/Border/BorderModel';

@Component
export default class BorderComponent extends Vue {

    $refs: {

    }
    @Prop()
    value: BorderModel

    contextMenuName = 'cm-border'

    setSolid()
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

    onDoubleClick(e) 
    {
        // this.value.onDoubleClick(e)
        let compStyles = window.getComputedStyle(e.target);
        var heightTable = compStyles.getPropertyValue('height')

        // console.log(heightTable);     

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>

<style lang="scss">

</style>
