<template >
  <div class="my-modal" :style="{'width': widthComp}">
    <div class="my-modal__header">
      <div class="my-modal__move" @mousedown.stop="onMouseDown($event)">
        <div class="left" v-if="selectorsActive">
          <button @click.stop="selectorsShow = !selectorsShow">
            Selectors
          </button>
          <pseudo-selector-component
            v-if="selectorsShow && tag"
            @selectPseudoSelector="onSelectPseudoClass"
            @close="selectorsShow = false"
            :value="tag"
            :styles="{left: '-300%'}"

          />
        </div>
      </div>
      <slot name="header" />
    </div>
    <div class="my-modal__content">
      <slot name="content" v-bind:value="tag" />
    </div>
    <div class="my-modal__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
import { Pagination } from "~/types/Pagination";
import HtmlTag from "~/src/Layout/HtmlTag";
import AbstractModal from "./AbstractModal";
import MoveEventController from "~/src/MoveEventController";
import DefaultMoveEventController from "~/src/Controller/DefaultMoveEventController";
import MouseMoveEventSource from "../src/Controller/MouseMoveEventSource";
import TextManageComponent from "~/components/manageComponent/component/TextManageComponent.vue";

@Component({
  components: {
  },
})
export default class BaseModal extends Vue {
  moveController: MoveEventController<MouseMoveEventSource>;
  selectorsShow = false;

  @Prop({ default: true, required: false })
  selectorsActive: boolean

  @Prop({ default: null, required: false })
  width: string

  @Prop({ default: null, required: false })
  tag: HtmlTag;
  mouseMoveHandler;
  mouseUpHandler;

  onSelectPseudoClass() {
    this.$emit("changePseudoSelector");
  }

  get widthComp() {
      if (!this.width) {
          return '600px'
      }

      return this.width
  }

  onMouseDown(ev) {
    var source = new MouseMoveEventSource();
    source.event = ev;
    source.target = (<HTMLElement>ev.target).parentElement.parentElement;
    this.moveController.mouseDownHandler(source);
    this.mouseMoveHandler = (ev) => {
      this.moveController.mouseMoveHandler(ev);
    };

    this.mouseUpHandler = (ev) => {
      this.moveController.mouseUpHandler(ev);
      this.onMouseUp();
    };
    window.document.body.addEventListener("mousemove", this.mouseMoveHandler);
    window.document.body.addEventListener("mouseup", this.mouseUpHandler);
  }

  onMouseUp() {
    window.document.body.removeEventListener(
      "mousemove",
      this.mouseMoveHandler
    );
    window.document.body.removeEventListener("mouseup", this.mouseUpHandler);
  }

  async mounted() {
    this.moveController = new DefaultMoveEventController();
  }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}
}
</script>

<style lang="scss">
.left {
  position: relative;
  top: 0;
  left: 0;
  float: left;
}
</style>
