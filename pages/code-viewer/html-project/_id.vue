<template>
    <div class="black" v-if="project">
        
        <h1 >
            {{ project.name }}
        </h1>
        <div class="code-tabs">
            <pre class="left-code code-section" >
                <code class="html" v-html="htmlContent">
                </code>
            </pre>
            <pre class="left-code code-section" >
                <code class="html" v-html="cssContent">
                </code>
            </pre>
        </div>
        

    </div>



</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    // import vadin from '@vaadin/vaadin'
import H1 from '../../components/html/H1.vue';
import ModelToDomain from '~/src/Transformer/ModelToDomain';
import DefaultModelToDomain from '~/src/Transformer/impl/DefaultModelToDomain';
import LayoutCreatorContainer from '~/components/layoutCreator/LayoutCreatorContainer.vue';
import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';


    @Component({
        'layout': 'code-viewer-layout',
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class HtmlProjectViewerPage extends Vue {
        storeFetchEndpoint = 'frontendProject/findOne'
        modelToDomainTransformer: ModelToDomain
        project: ProjectFrontendResponse = new ProjectFrontendResponse()

        // $refs: {
        //     creatorContainer: LayoutCreatorContainer
        // }

        get htmlContent()
        {
          return  hljs.highlight('html', `
    <div class="footer__top">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-5">
                    <h3>O nas</h3>
                    <p>Malesuada a nulla a venenatis parturient a malesuada nunc auctor metus consectetur velit dolor eget diam mi condimentum ac ut a tellus vitae.</p>
                    <a href="">Dołącz do nas</a>
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-6">
                            <h3>Generator projektów</h3>
                            <ul class="nav flex-column">
                                <nuxt-link tag="li" class="nav-item" to="/dashboard/layouts" active-class="active" exact>
                                    <a class="nav-link">Layouty</a>
                                </nuxt-link>

                            </ul>
                        </div>
                        <div class="col-6">
                            <h3>Baza wiedzy</h3>
                            <ul class="nav flex-column">
                                <!-- <li class="nav-item"  v-for="cat in faqCategories">
                                    <a class="nav-link active" @click.prevent="$router.push('/faqs-by-category/' + cat.id)">{{ cat.name }}</a>
                                </li> -->

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
           `).value
        }
        
        get cssContent()
        {
          return  hljs.highlight('css', `
            .rst-versions {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 300px;
                color: #fcfcfc;
                background: #1f1d1d;
                font-family: "Lato","proxima-nova","Helvetica Neue",Arial,sans-serif;
                z-index: 400;
            }
           `).value
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
            hljs.initHighlightingOnLoad();
            // console.log(this.htmlContent());
            
            // this.modelToDomainTransformer = new DefaultModelToDomain()

            if (this.$route.params.id) {
                this.project = await this.$store.dispatch(this.storeFetchEndpoint, this.$route.params.id)
                // for (const tagModel of response.htmlTags) {
                //     let tag = this.modelToDomainTransformer.transform(tagModel)
                //     tag.setProjectId(this.$route.params.id)
                //     // @ts-ignore
                //     this.$refs.creatorContainer.addHtmlTag(tag)
                // // console.log(tag);
                //     // tag.recalculateRealComputedProperties()
                    
                // }
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
    .black {
        // background-color: black;
        // width: 100vw;
        // height: 100vh;
        // color: white;
    }.html {
        // background-color: white;
        height: 100vh;
        // color: black;
    }
    .code-tabs {
        overflow: hidden;
    }
    .code-section {
        width: 45%;
        overflow: hidden;
        display: inline-flex;

    }
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
