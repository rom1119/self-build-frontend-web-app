<template>
    <context-menu :ref="propRef">

        <base-block>
            <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>
        </base-block>

        <base-block>
            <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>
        </base-block>
    </context-menu>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

    export default class HtmlElementContextMenu extends Vue {

        @Prop({required: true})
        propRef: string

        createH1Element(target, cm) {
            console.log(target, cm);
            // other actions...
        }

        createPElement(target, cm) {
            console.log(target, cm);
            // other actions...
        }
    }
</script>

<style scoped>

</style>
