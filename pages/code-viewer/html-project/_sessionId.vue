<template>
    <div class="black" v-if="project">
        <div class="review">
            <object >
                <html>
                    <head>
                        <style>
                            table {
                                border-collapse: initial;
                            }
                        </style>
                        <style v-html="cssCode"></style>
                    </head>
                    <body v-html="htmlCode">
                        
                    </body>
                </html>

            </object>
        </div>
        <h1 >
            {{ project.name }}
        </h1>
        <div class="code-types">
            <span class="code-type-el" v-for="codeTypeEl in generateTypes">
                <label>
                    {{ codeTypeEl.label }}
                    <input type="radio" name="code-type" :value="codeTypeEl.key" v-model="selectedCodeType">
                </label>
            </span>
        </div>
        <div class="code-tabs">

            <pre class="left-code code-section" >
                <div>
                    <button @click.stop="copyHtml">COPY HTML</button>
                </div>
<code id="html-code" class="html" v-html="htmlContent">
</code>
            </pre>
            <pre class="right-code code-section" >
                <div>
                    <button @click.stop="copyCss">COPY CSS</button>
                </div>
<code id="css-code" class="css" v-html="cssContent">
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
import SocketApi from '../../../src/Api/SocketApi';
import HtmlSocketApi from '~/src/Api/impl/HtmlSocketApi';
import {css} from 'js-beautify';
import {html} from 'js-beautify';


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
        socketApi: SocketApi = new HtmlSocketApi()
        htmlCode = ''
        cssCode = ''
        public SOCKET_MSG_NAME = `/queue/position-updates-user`
        public SOCKET_MSG_NAME2 = `/user/user_TEST_ASD/queue/position-updates`
        projectId = null

        generateCodeType = {
            'key' : 'normal',
            'label' : 'Kod HTML oddzielnie z CSS'
        }

        generateTypes = {
            'normal' : {
                'key' : 'normal',
                'label' : 'HTML and separate CSS'
            },
            'inline-css' : {
                'key' : 'inline-css',
                'label' : 'HTML with inline CSS'
            },
        }

        mounted() {
            this.projectId = this.$route.query.projectId
            this.socketApi.connect()
            this.socketApi.setCodeType(this.generateCodeType.key)
            this.socketApi.onGetMessage((e) => {
                // console.log('messageAAAAAA++++++');
                // console.log('message', e.data);
                // console.log( e);
                // console.log('messageAAAAAA=====');

                if (e.data.indexOf('content-length') > -1) {

                    this.fetchHtmlContent(e.data)
                    this.fetchCssContent(e.data)
                }
            })
            setTimeout(() => {
                // this.socketApi.subscribeMsg(this.SOCKET_MSG_NAME + this.$route.params.sessionId)
                this.socketApi.subscribeMsg(this.SOCKET_MSG_NAME2)
                this.socketApi.sendMessage(this.projectId)
                this.updateCode()
            }, 2000)

        }

        get selectedCodeType() {
            return this.generateCodeType.key
        }

        set selectedCodeType(arg) {
            this.generateCodeType = this.generateTypes[arg]
            this.socketApi.setCodeType(this.generateCodeType.key)

        }

        updateCode()
        {
            setInterval(() => {
                this.socketApi.sendMessage(this.projectId)

            }, 1000)
        }

        fetchHtmlContent(socketMsgString)
        {
            var html = socketMsgString.split("\n")

            // console.log(html);
            html = html[html.length - 1]
            html = html
            html = html.substr(0, html.length - 1)
            // console.log(html);
            // console.log(html.substr(125));

            var jsonContent = JSON.parse(html.trim().toString())
            this.htmlCode = jsonContent.html
            // this.htmlCode = jsonContent.html.replace(/>/g, '>\n')

        }

        fetchCssContent(socketMsgString)
        {
            var html = socketMsgString.split("\n")

            // console.log(html);
            html = html[html.length - 1]
            html = html
            html = html.substr(0, html.length - 1)
            // console.log(html);
            // console.log(html.substr(125));

            var jsonContent = JSON.parse(html.trim().toString())
            // console.log(jsonContent);
            this.cssCode = jsonContent.css

        }

        // $refs: {
        //     creatorContainer: LayoutCreatorContainer
        // }

        get htmlContent()
        {
          return  hljs.highlight('html', html(this.htmlCode,
          {
            "indent_size": 2,
            "html": {
                    "end_with_newline": true,
                    "js": {
                        "indent_size": 2
                    },
                    "css": {
                        "indent_size": 2
                    }
            }
          }
          )

            ).value
        }

        get cssContent()
        {
          return  hljs.highlight('css',css(this.cssCode)).value
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

        copyHtml() {
            this.CopyToClipboard('html-code')
        }

        copyCss() {
            this.CopyToClipboard('css-code')
        }

        CopyToClipboard(containerid) {
            // @ts-ignore
            if (document.selection) {
                // @ts-ignore
                var range = document.body.createTextRange();
                range.moveToElementText(document.getElementById(containerid));
                range.select().createTextRange();
                document.execCommand("copy");
            } else if (window.getSelection) {
                // var range = document.createRange();
                var a = document.getElementById(containerid)
                window.getSelection().selectAllChildren(a);

                document.execCommand("copy");
                // alert("Text has been copied, now paste in the text-area")
            }
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

        // async mounted()
        // {
        //     hljs.initHighlightingOnLoad();
        //     // console.log(this.htmlContent());

        //     // this.modelToDomainTransformer = new DefaultModelToDomain()

        //     if (this.$route.params.sessionId) {
        //         // this.project = await this.$store.dispatch(this.storeFetchEndpoint, this.$route.params.id)
        //         // for (const tagModel of response.htmlTags) {
        //         //     let tag = this.modelToDomainTransformer.transform(tagModel)
        //         //     tag.setProjectId(this.$route.params.id)
        //         //     // @ts-ignore
        //         //     this.$refs.creatorContainer.addHtmlTag(tag)
        //         // // console.log(tag);
        //         //     // tag.recalculateRealComputedProperties()

        //         // }
        //         // console.log(this.$route.params.id);
        //         // console.log(response);

        //     }
        //     this.$loadingDialog.show()
        //     // let provinces = await this.$axios.$get('/units/provinces')
        //     // this.provinces = provinces
        //     this.$loadingDialog.hide()
        // }


    }

</script>

<style lang="scss" scoped>
    
    .code-types {
        display: flex;
        justify-content: center;
    }
    .code-type-el {
        padding: 5px;

        input {

            width: 20px;
        }
    }
    .black {
        // background-color: black;
        width: 100vw;
        // height: 100vh;
        // color: white;
    }.html {
        // background-color: white;
        height: 100%;
        // color: black;
    }
    .code-tabs {
        overflow: hidden;
        display: flex;
    }
    .code-section {
        width: 50%;
        overflow-x: auto;
        margin: 10px;
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
