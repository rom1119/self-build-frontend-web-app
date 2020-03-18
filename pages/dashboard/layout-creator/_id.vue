<template>
    <div class="">
        
        
        <layout-creator-container ref="creatorContainer">

        </layout-creator-container>
           


    </div>



</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    // import vadin from '@vaadin/vaadin'
import H1 from '../../components/html/H1.vue';
import ModelToDomain from '~/src/Transformer/ModelToDomain';
import DefaultModelToDomain from '~/src/Transformer/impl/DefaultModelToDomain';
import LayoutCreatorContainer from '~/components/layoutCreator/LayoutCreatorContainer.vue';


    @Component({
        'layout': 'dashboard-layout',
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class LayoutCreatorPage extends Vue {
        storeFetchEndpoint = 'frontendProject/findOne'
        modelToDomainTransformer: ModelToDomain

        $refs: {
            creatorContainer: LayoutCreatorContainer
        }
        

        createPElement(target, cm) {
            console.log(target, cm);
            // other actions...
        }

        open(target, cm) {
            console.log(target, cm);
            // other actions...
        }

        close(target, cm) {
            console.log(target, cm);
            // other actions...
        }

        // @Watch('currentProvince')
        async onCurrentProvince() {
            this.$loadingDialog.show()
            try {
                // this.communities = (await this.$axios.$get(`/units/province/${this.currentProvince.id}/communes/all`))
            } catch (e) {
                alert('Błąd pobierania')
            }
            this.$loadingDialog.hide()
        }

        async mounted()
        {
            this.modelToDomainTransformer = new DefaultModelToDomain()

            if (this.$route.params.id) {
                let response = await this.$store.dispatch(this.storeFetchEndpoint, this.$route.params.id)
                for (const tagModel of response.htmlTags) {
                    let tag = this.modelToDomainTransformer.transform(tagModel)
                    // tag.setProjectId(this.$route.params.id)
                    // @ts-ignore
                    this.$refs.creatorContainer.addHtmlTag(tag)
                // console.log(tag);
                    // tag.recalculateRealComputedProperties()
                    
                }
                // console.log(this.$route.params.id);
                // console.log(response);
                
            }
            this.$loadingDialog.show()
            // let provinces = await this.$axios.$get('/units/provinces')
            // this.provinces = provinces
            this.$loadingDialog.hide()
        }


    }

</script>

<style lang="scss" scoped>
    .context-menu-overlay {
        position: fixed; /* position overlays relative to the viewport */
        top: 0;
        left: 0;
        display: block;
        width: 100%; /* occupy the full width/height of the vieport */
        height: 100%;
        overflow: hidden;

        /* z-index - 100000 by default and is auto-incremented for each Context Menu opened as a nested one */
    }

    .context-menu-overlay.root {
        /* these - only for overlays of the Context Menus that are opened NOT as nested ones */
    }

    .context-menu-container {
        list-style-type: none;
        background-color: #d0d4de;
        padding: 0;
        margin: 0;
        /* these - only for overlays of the Context Menus that are opened NOT as nested ones */
    }

    .context-menu-item {
        padding: 5px;
        /* these - only for overlays of the Context Menus that are opened NOT as nested ones */
        &:hover {
            background-color: #b9bcc5;
        }
    }

    .context-menu-overlay.nested {

        pointer-events: none; /* overlays for nested Context Menus can be clicked-through */
    }

    .context-menu-wrapper {

        position: absolute; /* absolute relative to the viewport */
        pointer-events: initial; /* so that items don't ignore mouse events */
        /* height - is calculated and set automatically */
    }

    .context-menu {

        box-sizing: border-box;
        height: 100%;
        overflow: auto; /* so that the context can be scrolled if the Context Menu is overflowed with items */
    }
</style>
