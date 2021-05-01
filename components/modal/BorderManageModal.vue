<template >
  <base-modal v-show="active">
    <template slot="header">
      <div class="close">
        <button @click="close($event)">X</button>
      </div>
      <h4>Zarządzaj tekstem</h4>
    </template>
    <template slot="content">
      <border-manage-component ref="manageComponent" :activeTag="value" /> 

    </template>
    <template slot="footer">
      <button class="to-left" @click="restore($event)">Przywróć</button>
      <button class="to-right">Zapisz</button>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import HtmlTag from "../../src/Layout/HtmlTag";
import AbstractModal from "../AbstractModal";
import BorderManageComponent from "../manageComponent/component/BorderManageComponent.vue";

@Component
export default class BorderManageModal extends AbstractModal {
  $refs: {
      manageComponent: BorderManageComponent

  }

  mounted() {
      // this.$refs.manageComponent = null
  }
  onChangePseudoSelector()
  {
      this.$refs.manageComponent.onChangePseudoSelector()
  }

  show(currentActiveTag: HtmlTag){
      super.show(currentActiveTag, this.$refs.manageComponent)
      this.$refs.manageComponent.init(currentActiveTag)
  }
}
</script>

<style lang="scss" scoped>
</style>
