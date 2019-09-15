<template>
    <object id="layout-object" class="main-object">
        <html>
            <head>

            </head>
            <body v-context-menu="contextMenuName" style="min-height: 100px;">
                    <context-menu
                        shift="both"
                        :ref="contextMenuName">
                        <div class="context-menu-container">
                                <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                                <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

                        </div>
                    </context-menu>
                    <template v-for="htmlTag in htmlTags">
                        <html-component :value="htmlTag" :key="htmlTag.uuid">
                        </html-component>
                    </template>
            </body>
        </html>
    </object>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import HtmlTag from '../../src/Layout/HtmlTag';
import HtmlTagFactory from '../../src/Layout/HtmlTagFactory';

@Component
export default class LayoutCreatorContainer extends Vue {
    contextMenuName = 'cm-create-html-element'
    htmlTags: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    createH1Element(target, cm, a) {
        console.log('asda'
        )

        var el = this.htmlFactory.createH1()

        this.htmlTags.push(el)

    }

    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }
}
</script>
