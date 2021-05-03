<template >
  <div class="white" v-if="active">
    <section class="content">
      <h4>
        {{ mode.getLabel() }}
      </h4>
      <div>
        <label>
          Edit
          <input
            type="radio"
            name="layout-mode"
            :id="editModeName"
            :value="editModeName"
            v-model="modeName"
          />
        </label>
        <label>
          Animation
          <input
            type="radio"
            name="layout-mode"
            :id="animationModeName"
            :value="animationModeName"
            v-model="modeName"
          />
        </label>
        <label>
          View
          <input
            type="radio"
            name="layout-mode"
            :id="viewModeName"
            :value="viewModeName"
            v-model="modeName"
          />
        </label>
        
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import _ from "lodash";
import { Pagination } from "~/types/Pagination";
import PseudoClass from "~/src/PseudoSelector/PseudoClass";
import HtmlTag from "~/src/Layout/HtmlTag";
import PseudoClassManager from "./computedPropertyManagers/pseudoSelector/PseudoClassManager";
import PseudoSelector from "~/src/PseudoSelector/PseudoSelector";
import BasePseudoSelectorComponent from "./BasePseudoSelectorComponent";
import BaseLayoutModeComponent from "./BaseLayoutModeComponent";
import LayoutMode from "../src/Mode/LayoutMode";
import EditMode from "../src/Mode/impl/EditMode";
import ViewMode from "../src/Mode/impl/ViewMode";
import ModeAction from "../src/Mode/ModeAction";
import AnimationMode from '../src/Mode/impl/AnimationMode';

@Component
export default class LayoutCreatorModeComponent extends BaseLayoutModeComponent {
  timeout;


  pseudoClasses: PseudoClass[] = [];

  // _paddingLeft: BasePaddingCss

  cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + "left";
  cmNameRight = Math.floor(Math.random() * 1000000000).toString() + "right";
  cmNameTop = Math.floor(Math.random() * 1000000000).toString() + "top";
  cmNameBottom = Math.floor(Math.random() * 1000000000).toString() + "bottom";

  idName = "text-property-modal";

  public canRun(action: ModeAction) {
    this.mode.canRun(action);
  }

  created() {
    // console.log("created");
    // console.log(this.value);
    // this.show(this.value)
  }

  get editModeName(): string {
    return EditMode.NAME;
  }

  get viewModeName(): string {
    return ViewMode.NAME;
  }
  get animationModeName(): string {
    return AnimationMode.NAME;
  }

  get modeName(): string {
    return this.mode.getName();
  }

  set modeName(arg: string) {
    if (this.mode) {
      this.mode.disable()
    }
    if (arg === EditMode.NAME) {
      this.mode = new EditMode();
    } else if (arg === ViewMode.NAME) {
      this.mode = new ViewMode();
    } else if (arg === AnimationMode.NAME) {
      this.mode = new AnimationMode();
    }
    this.mode.enable()


    this.$emit("change", this.mode);
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
