<template >
  <div class="white w300px" v-if="active">
    <section class="content">
      <h4>
      </h4>
      <div v-if="currentMode.isViewMode">
          View mode
      </div>
      <div v-else-if="currentMode.isEditMode">
          Edit project
      </div>
      <div v-else-if="currentMode.isAnimationEditMode">
        <p v-if="currentMode.selectedHtmlEl" class="text-danger">
          Press Esc or click <a href="#" class="btn btn_sm" @click.prevent="backToSelectTag">this</a> to back to choice animation prototype
        </p>
        <p v-if="currentMode.animationIsStarted">
          Edit animation "{{ currentMode.animationName }}"  for frame "{{ currentMode.selectorName }}"
        </p>
        <p v-else>
          Select an HTML element clicking on it, to create animation based on html TAG
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import _ from "lodash";
import PseudoClass from "~/src/PseudoSelector/PseudoClass";
import BaseCreatorInfoComponent from "./BaseLayoutModeComponent";
import LayoutCreatorModeComponent from "./LayoutCreatorModeComponent.vue";
import DefaultActiveToAnimationController from "~/src/Controller/DefaultActiveToAnimationController";
import ActiveToAnimationController from "~/src/ActiveToAnimationController";
import HtmlTag from "~/src/Layout/HtmlTag";

@Component
export default class LayoutCreatorInfoComponent extends BaseCreatorInfoComponent {
  
  timeout;


  pseudoClasses: PseudoClass[] = [];

  // _paddingLeft: BasePaddingCss

  cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + "left";
  cmNameRight = Math.floor(Math.random() * 1000000000).toString() + "right";
  cmNameTop = Math.floor(Math.random() * 1000000000).toString() + "top";
  cmNameBottom = Math.floor(Math.random() * 1000000000).toString() + "bottom";

  idName = "text-property-modal";

  layoutMode : LayoutCreatorModeComponent = null
  activeToAnimationController: ActiveToAnimationController<HtmlTag> = null


  setActiveToAnimation(activeAnimationController: DefaultActiveToAnimationController) {
    this.activeToAnimationController = activeAnimationController
  }

  backToSelectTag() {
    this.activeToAnimationController.deactiveTag()
  }

  created() {
    // console.log("created");
    // console.log(this.value);
    // this.show(this.value)
    this.layoutMode = this.$layoutCreatorMode
  }

  
  get currentMode() {

    return this.layoutMode.mode
  }

  mounted() {
    // console.log("mounted");

    // this.show(this.value)
  }

  public close() {
    this.$emit("close");
  }

  @Watch("$router.route", { deep: false, immediate: false })
  async onRouteChange(e) {}
}
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
}
.green-bg,
.current {
  background-color: greenyellow;
}

.title {
  font-size: 1.1em;
}
.rel {
  position: relative;
}
.abs {
  position: absolute;
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

.white {
  background-color: white;
  left: -300%;
  width: 200px;
  font-size: 13px;
}

.selector {
  height: 50px;
  text-align: center;
  display: flex;

  &:hover {
    background-color: bisque;
  }
}

.close {
  position: abolute;
  top: 0;
  right: 0;
}

.selector-name {
  width: 80%;
}
.btn-check {
  width: 20%;
}
</style>
