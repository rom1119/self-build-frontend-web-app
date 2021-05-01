<template >
  <base-modal v-show="active">
    <template slot="header">
      <div class="close">
        <button @click="close($event)">X</button>
      </div>
      <h4>Cienie elementu</h4>
    </template>
    <template slot="content">
      <!-- <select-unit-context-menu :propertyUnit="val.offsetXUnit" @changePropUnit="val.offsetXUnit = $event" :ref="cmNameTextShadowOffX" /> -->
      <shadow-manage-component ref="manageComponent" :activeTag="value" /> 

      
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
import _ from "lodash";
import HtmlTag from "../../src/Layout/HtmlTag";
import AbstractModal from "../AbstractModal";
import ShadowManageComponent from "../manageComponent/component/ShadowManageComponent.vue";

@Component
export default class ShadowModalComponent extends AbstractModal {
    $refs: {
      manageComponent: ShadowManageComponent

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
.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
}
.green-bg {
  background-color: greenyellow;
}
.rel {
  position: relative;
}

.h-550 {
  height: 550px;
}
.w-400 {
  width: 400px;
}

.w-50-pr {
  width: 50%;
}

.h-400 {
  height: 400px;
}
</style>
