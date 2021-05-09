<template >
  <div class="content-item__elem_container">
    <div
      v-if="value != null"
      class="content-item__elem"
      v-context-menu="cmNameTextShadowBlur"
    >
      <select-linear-gradient-direction-unit-menu
        :propertyUnit="value.directionUnit"
        @changePropUnit="
          ($event) => {
            value.directionUnit = $event;
            change();
          }
        "
        :ref="cmNameTextShadowBlur"
      />

      <label :for="'textShadowBlur-'" style="display: inline-flex">
        <b>Direction</b>
        <span style="width: 50px"> &nbsp; </span>
        <select
          v-if="isNamedUnit"
          name="direction"
          @change="change"
          v-model="value.direction"
          id="linear-direction"
        >
          <option
            v-for="direction in directions"
            :value="direction"
            :key="direction"
          >
            {{ direction }}
          </option>
        </select>
        <template v-else>
          <input
            type="number"
            @dblclick.stop.prevent=""
            :step="inputStep"
            @input="change"
            style="width: 40px"
            class="input-text"
            v-model="value.direction"
            :maxSize="maxSize"
          />
          <input
            type="range"
            v-model="value.direction"
            :step="inputStep"
            @input="change"
            :max="maxSize"
          />
        </template>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import { Pagination } from "~/types/Pagination";
import { TextShadowStruct } from "~/src/Css/Shadow/TextShadowCss";
import { Chrome } from "~/node_modules/vue-color";
import { RGBA, Percent, Named } from "~/src/Unit";
import HtmlTag from "~/src/Layout/HtmlTag";
import { BoxShadowStruct } from "~/src/Css/Shadow/BoxShadowCss";
import { BaseGradientStructVal } from "~/src/Css/Gradient/BaseGradientCss";
import LinearSites from "~/src/Css/Gradient/LinearSites";
import { LinearGradientDirection } from "../../../src/Css/Gradient/impl/LinearGradientCss";
import UnitTurn from "~/src/Unit/UnitAngle/UnitTurn";

@Component({
  components: {
    Chrome,
  },
})
export default class LinearGradientDirectionComponent extends Vue {
  timeout;
  @Prop({ default: null, required: true })
  tag: HtmlTag;

  @Prop({ default: null, required: true })
  value: LinearGradientDirection;

  directions = LinearSites.getAccessableProperty();

  // @Prop({default:null, required:false})
  // classList: string[]

  cmNameTextShadowOffX =
    Math.floor(Math.random() * 1000000000).toString() + "text_shadow_off_x";
  cmNameTextShadowOffY =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-off-y";
  cmNameTextShadowBlur =
    Math.floor(Math.random() * 1000000000).toString() +
    "direction-linear-gradient";
  cmNameTextShadowSpread =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-spread";
  cmNameTextShadowColor =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-color";

  pickerActive = false;

  color: any = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };

  get isNamedUnit() {
    if (this.value.directionUnit instanceof Named) {
      return true;
    }

    this.value.direction = "0";
    return false;
  }

  get maxSize() {
    if (this.value.directionUnit instanceof UnitTurn) {
      return 1;
    }

    return 360;
  }

  get inputStep() {
    if (this.value.directionUnit instanceof UnitTurn) {
      return 0.01;
    }

    return 1;
  }

  mounted() {
    // console.log(this.contextMenuName);
    // console.log(this.cmName);
    // if (this.value.colorUnit instanceof RGBA) {
    //     console.log('00000000000000000');
    //     console.log(this.value.color);
    //     this.color.r = this.value.color.r
    //     this.color.g = this.value.color.g
    //     this.color.b = this.value.color.b
    //     this.color.a = this.value.color.a
    // }
  }

  toggleColorPicker() {
    this.pickerActive = !this.pickerActive;
  }

  cancelColor() {
    console.log(this.color);

    this.toggleColorPicker();
  }

  removeVal() {
    this.tag.api.deleteCssValue(this.value).then(
      () => {
        this.$emit("remove");
      },
      () => {
        alert("server error");
      }
    );
  }

  change() {
    this.$emit("change");
  }

  // get allClass()
  // {
  //     var res = this.classList
  //     if (this.hasProperty) {
  //         if (this.globalEl) {
  //             res.push('active-global')

  //         } else {
  //             res.push('active')

  //         }
  //     }

  //     return res
  // }

  // get customHasProp()
  // {
  //     return this.hasProperty
  // }

  // set customHasProp(val)
  // {
  //     this.$emit('changeHasProp', val)
  // }

  // get customProp()
  // {
  //     return this.property
  // }

  // set customProp(val)
  // {
  //     this.$emit('changeProp', val)
  // }

  // get customPropUnit()
  // {
  //     return this.propertyUnit
  // }

  // set customPropUnit(val)
  // {
  //     if (val) {
  //         this.$emit('changePropUnit', val)

  //     }
  // }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}
}
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.6;
}
.auto-prop {
  background-color: red;
  padding: 5px;
  // margin-left: 3px;
  border-radius: 5px;
}
.green-bg {
  background-color: greenyellow;
}
// .rel {
//     position: relative;
// }

// .h-550 {
//     height: 550px;
// }
// .w-400 {
//     width: 400px;
// }

// .h-400 {
//     height: 400px;
// }
</style>
