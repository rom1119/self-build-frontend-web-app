<template>
    <input type="text" :id="idInputElement" v-model="value.innerText" @blur="setNotEdited()" />

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '../../src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";


@Component
export default class HTMLELEditable extends Vue {
  focus() {
      this.$nextTick(() => {
          this.inputElement = document.getElementById(this.idInputElement)
          this.inputElement.focus()
      })
    // document.activeElement = 
    // console.log(a == document.activeElement);
    // console.log(this.idInputElement);
    // console.log(this.value.uuid);
  }

    @Prop({default:null, required:true})
    value: HtmlTag
    inputElement: any
    idInputElement: string = 'input-editable-'

    setNotEdited() {
        this.value.setNotEdited()

    }


    createPElement(target, cm, a) {
        console.log(
        )
        console.log(this.$children);
        // console.log(cm);
        // other actions...
    }
    onDoubleClick(e) 
    {
        this.value.onDoubleClick(e)
        let compStyles = window.getComputedStyle(e.target);
            var heightTable = compStyles.getPropertyValue('height')

            console.log(heightTable);
            

    }
    created() {
        this.idInputElement = this.idInputElement + this.value.uuid
        
        
        // this.inputElement.focus()
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
