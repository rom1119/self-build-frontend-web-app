<template >
  <div class="content-item__elem_container">
    <div class="content-item__elem">
      <label :for="'x1-'">
        X1
        <input
          @dblclick.stop.prevent=""
          step="0.01"
          type="number"
          @input="change"
          style="width: 50px"
          class="input-text"
          v-model="value.x1"
          name="x1"
          :id="'x1-'"
        />
      </label>
    </div>
    <div class="content-item__elem">
      <label :for="'y1-'">
        Y1
        <input
          @dblclick.stop.prevent=""
          step="0.01"
          type="number"
          @input="change"
          style="width: 50px"
          class="input-text"
          v-model="value.y1"
          name="y1"
          :id="'y1-'"
        />
      </label>
    </div>
    <div class="content-item__elem">
      <label :for="'x2-'">
        X2
        <input
          @dblclick.stop.prevent=""
          step="0.01"
          type="number"
          @input="change"
          style="width: 50px"
          class="input-text"
          v-model="value.x2"
          name="x2"
          :id="'x2-'"
        />
      </label>
    </div>
    <div class="content-item__elem">
      <label :for="'y2-'">
        Y2
        <input
          @dblclick.stop.prevent=""
          step="0.01"
          type="number"
          @input="change"
          style="width: 50px"
          class="input-text"
          v-model="value.y2"
          name="y2"
          :id="'y2-'"
        />
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
import { RGBA } from "~/src/Unit";
import HtmlTag from "~/src/Layout/HtmlTag";
import { BoxShadowStruct } from "~/src/Css/Shadow/BoxShadowCss";
import { TransitionStruct } from "~/src/Css/Animation/TransitionCss";

import * as libCss from "~/src/Css/";
import { CubicBezier } from "~/src/Animation/timingFunction";

@Component({
  components: {
    Chrome,
  },
})
export default class CubicBezierComponent extends Vue {
  timeout;
  @Prop({ default: null, required: true })
  tag: HtmlTag;

  @Prop({ default: null, required: true })
  value: CubicBezier;

  @Prop({ default: null, required: true })
  allClass: string[];

  // @Prop({default:null, required:true})
  // index: number

  cssPropNames: string[] = [];

  // @Prop({default:null, required:false})
  // classList: string[]

  cmNameTextShadowOffX =
    Math.floor(Math.random() * 1000000000).toString() + "text_shadow_off_x";
  cmNameTextShadowOffY =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-off-y";
  cmNameTextShadowBlur =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-blur";
  cmNameTextShadowSpread =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-spread";
  cmNameTimingFunction =
    Math.floor(Math.random() * 1000000000).toString() + "timing-function";

  propNameEnable = false;

  color: any = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };

  mounted() {
    var cssProps = libCss;

    // console.log(name);

    for (const cssPropClass in cssProps) {
      // console.log(cssProps[cssPropClass].PROP_NAME);
      this.cssPropNames.push(cssProps[cssPropClass].PROP_NAME);
    }
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
    // this.pickerActive = !this.pickerActive
  }

  cancelColor() {
    console.log(this.color);

    this.toggleColorPicker();
  }

  saveColor() {
    console.log(this.color);
    // this.value.color = this.color.rgba
    // this.value.colorUnit = new RGBA()
    this.change();
    this.toggleColorPicker();
  }

  change() {
    this.$emit("change");
  }

  // get isDisable()
  // {
  //     return this.value.all == true
  // }

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

.top-35 {
  top: 35px;
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
