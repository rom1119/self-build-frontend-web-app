<template>
    <div class="">

        <layout-creator-container ref="creatorContainer" :fontFaceAccesor="fontFaceAccesor" :keyFrameAccessor="keyFrameAccessor">

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
    import ModelToMediaQuery from "~/src/Transformer/ModelToMediaQuery";
    import DefaultModelToMediaQuery from "~/src/Transformer/impl/DefaultModelToMediaQuery";
    import MediaQueryManager
        from "~/components/computedPropertyManagers/impl/ComputedProperty/MediaQuery/MediaQueryManager";
    import DefaultMediaQueryApiService from "~/src/Api/impl/DefaultMediaQueryApiService";
    import MediaQueryFactory from "~/src/MediaQuery/MediaQueryFactory";
import DefaultModelToFontFace from '~/src/Transformer/impl/DefaultModelToFontFace';
import DefaultFontFaceApiService from '~/src/Api/impl/DefaultFontFaceApiService';
import FontFaceAccessor from '~/src/Fonts/FontFaceAccessor';
import FontFaceManageModal from '../../../components/modal/FontFaceManageModal.vue';
import DefaultModelToKeyFrame from '~/src/Transformer/impl/DefaultModelToKeyFrame';
import KeyFrameAccessor from '~/src/Animation/KeyFrameAccessor';


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
        // storeFetchKeyFramesEndpoint = 'frontendProject/findKeyFramesByProject'
        modelToDomainTransformer: ModelToDomain

        $refs: {
            creatorContainer: LayoutCreatorContainer
        }

        modelToDomain: ModelToMediaQuery
        fontFaceAccesor: FontFaceAccessor = null
        keyFrameAccessor: KeyFrameAccessor = null


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

        // created()
        // {
        //     console.log('ID created', this.$route.params.id);

        // }
        async mounted()
        {
            var apiMediaQuery = new DefaultMediaQueryApiService()
            var apiFontFace = new DefaultFontFaceApiService()
            var mediaQueryFactory = new MediaQueryFactory(apiMediaQuery)

            this.$fontFaceManageModal.init(this.$route.params.id)
            this.fontFaceAccesor = FontFaceAccessor.getInstance()

            KeyFrameAccessor.createInstance(this.$route.params.id)
            this.keyFrameAccessor = KeyFrameAccessor.getInstance()
            // console.log('mmmmmmmm');
            // console.log(this.fontFaceAccesor);
            this.modelToDomainTransformer = new DefaultModelToDomain()

            var modelToDomainMediaQuery = new DefaultModelToMediaQuery(mediaQueryFactory)

            var modelToDomainFontFace = new DefaultModelToFontFace()

            var modelToDomainKeyFrame = new DefaultModelToKeyFrame()


            if (this.$route.params.id) {
                let response = await this.$store.dispatch(this.storeFetchEndpoint, this.$route.params.id)

                for (const medQ of response.mediaQueryList) {
                    let domain = modelToDomainMediaQuery.transform(medQ)

                    var manager = new MediaQueryManager(domain)
                    manager.property.setApi(apiMediaQuery)
                    manager.init()

                    // @ts-ignore
                    this.$refs.creatorContainer.mediaQueryComponent.addManager(manager)
                }

                for (const ff of response.fontFaceList) {
                    let domainFF = modelToDomainFontFace.transform(ff)
                    // @ts-ignore
                    this.$fontFaceManageModal.addFont(domainFF)
                }

                for (const keyFrameRes of response.keyFrameList) {
                    let keyFrameDomain = modelToDomainKeyFrame.transform(keyFrameRes)
                    // @ts-ignore
                    this.keyFrameAccessor.addKeyFrame(keyFrameDomain)
                }

                for (const tagModel of response.model.htmlTags) {
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
