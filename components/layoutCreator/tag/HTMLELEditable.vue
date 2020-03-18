<template>
    <textarea  :id="idInputElement" ref="textInput" class="text" @input="onChangeText" v-model="value.text" @blur="emitBlur()" >
    </textarea>

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from '../../../src/Layout/HtmlTag';
import TextNode from "../../../src/Layout/TextNode";
import autosize from "autosize";


@Component
export default class HTMLELEditable extends Vue {
    focus() {
        this.$nextTick(() => {
            this.inputElement = document.getElementById(this.idInputElement)
            this.inputElement.focus()
        })
        // console.log(this.value.uuid);
    }

    @Prop({default:null, required:true})
    value: TextNode
    inputElement: any
    idInputElement: string = 'input-editable-'

    emitBlur() {
        this.$emit('blur', this.value)  
    }
    createPElement(target, cm, a) {
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }

    @Watch('value.text')
    onChangeText(e) 
    {
            console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        autosize(this.$refs.textInput)

    }
    created() {
        this.idInputElement = this.idInputElement + this.value.uuid
        // setTimeout(() => {
        //     autosize(this.$refs.textInput)
        //     console.log('$$$$$$$$');
        //     console.log(this.$refs.textInput);
        //     console.log(this.$refs.textInput.value);

        //     autosize.update(this.$refs.textInput)

        //     autosize.update(this.$refs.textInput)
        // }, 1000)
        // this.inputElement.focus()
    }

    mounted()
    {
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>this.$refs.textInput

        console.log(autosize);
        textarea.addEventListener('focus', function(){
            autosize(textarea);
            autosize.update(textarea);
        });
        // autosize(this.$refs.textInput)
        
        
    }
}
</script>

<style lang="scss">
#loadingDialog {
    .v-dialog {
    width: auto;
    }

}
.text {
    // width:100%;
    // box-sizing:border-box;
    // direction:rtl;
    // display:block;
    // max-width:100%;
    // line-height:1.5;
    // padding:15px 15px 30px;
    // border-radius:3px;
    border:0;
    padding:0;
    margin:0;
    outline:0;
    background-color: transparent;
    font-size: 100%;
    font-weight: inherit;
    // font:13px Tahoma, cursive;
    // transition:box-shadow 0.5s ease;
    // box-shadow:0 4px 6px rgba(0,0,0,0.1);
    // background:linear-gradient(#F9EFAF, #F7E98D);
    // background:-o-linear-gradient(#F9EFAF, #F7E98D);
    // background:-ms-linear-gradient(#F9EFAF, #F7E98D);
    // background:-moz-linear-gradient(#F9EFAF, #F7E98D);
    // background:-webkit-linear-gradient(#F9EFAF, #F7E98D);
}
</style>
