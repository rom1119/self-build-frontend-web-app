<template>
    <div>
        <context-menu
                shift="both"
                :ref="value.uuid">
                <div class="context-menu-container">
                        <context-menu-item :action="createH1Element">Stwórz H1</context-menu-item>

                        <context-menu-item :action="createPElement">Stwórz Paragraf</context-menu-item>

                </div>
            </context-menu>
        <div v-show="value.isEdited" class="wrapper-el-editable" >
            <html-el-editable :value="value" ref="editableEl">
            </html-el-editable>
        </div>
        <html-el v-show="!value.isEdited" 
         @mousedown.native="onMouseDown($event)" 
         @mouseup.native="onMouseUp($event)" 
         @dblclick.native="onDoubleClick($event)" 
         :value="value" v-context-menu="value.uuid">
        </html-el>

        <div class="wrapper-children">
            <template v-for="child in children">
                <html-component :value="child" :key="child.uuid"  >
                </html-component>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '../../src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HTMLELEditable from './HTMLELEditable.vue';


@Component
export default class HTMLWrapper extends Vue {
    @Prop()
    value: HtmlTag
    protected _innerText = 'This is H1 element'
    protected children: HtmlTag[] = []
    htmlFactory: HtmlTagFactory = new HtmlTagFactory()
    timeout
    mouseDown

    $refs: {
        editableEl: any
    }


    contextMenuName = 'cm-create-html-element123'

    createH1Element(target, cm, a) {
        console.log(
        )

        var el = this.htmlFactory.createH1()
        console.log('qqqqq')

        this.children.push(el)

    }

    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }

    onMouseDown(e)
    {
        this.mouseDown = true
        clearTimeout(this.timeout)
            this.timeout = setTimeout(async () => {
                if (this.mouseDown) {
                    this.value.changeAsActiveSize()

                }

            }, 400)
        
    }
    
    onMouseUp(e)
    {
        console.log('qweqrewty');
        
        this.mouseDown = false
        this.value.changeAsDeactiveSize()

        
    }
    onDoubleClick(e) 
    {
        this.value.onDoubleClick(e)
        let compStyles = window.getComputedStyle(e.target);
        var heightTable = compStyles.getPropertyValue('height')

        this.$refs.editableEl.focus()
            

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        console.log(this.contextMenuName)
    }
}
</script>

<style lang="scss">
#loadingDialog {
    .v-dialog {
    width: auto;
    }
}
</style>
