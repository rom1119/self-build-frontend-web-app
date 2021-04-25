<template >

    <base-modal v-show="active" @changePseudoSelector="onChangePseudoSelector" :tag="value">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4 v-if="value">
                Zarządzaj box modelem Tag {{ value.toString() }}
            </h4>
            
        </template>
        <template slot="content">
            <box-model-manage-component ref="manageComponent" :activeTag="value" /> 

        </template>
        <template slot="footer">
            <button class="to-left" @click="restore($event)">
                Przywróć
            </button>
            <button class="to-right">
                Zapisz
            </button>
        </template>
    </base-modal>

</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import _ from "lodash";
import HtmlTag from "../../src/Layout/HtmlTag";
import AbstractModal from "../AbstractModal";
import BoxModelManageComponent from "../manageComponent/component/BackgroundManageComponent.vue";

@Component
export default class BoxModelManageModal extends AbstractModal {
  $refs: {
      manageComponent: BoxModelManageComponent

  }

  mounted() {
      // this.$refs.manageComponent = null
  }
  onChangePseudoSelector()
  {
      this.$refs.manageComponent.onChangePseudoSelector()
  }

  show(currentActiveTag: HtmlTag){
      super.show(currentActiveTag)
      this.$refs.manageComponent.init(currentActiveTag)
  }
}
</script>

<style lang="scss" scoped>
.auto-prop {
  background-color: red;
  // padding: 3px;
  // margin-left: 3px;
  // border-radius: 5px;
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
