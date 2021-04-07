<template >
  <div class="content-item__elem_container">
    <div class="content-item__elem" v-context-menu="cmNameTextShadowOffX">
      <select-unit-context-menu
        :propertyUnit="value.offsetXUnit"
        @changePropUnit="
          () => {
            value.offsetXUnit = $event;
            change();
          }
        "
        :ref="cmNameTextShadowOffX"
      />

      <label :for="'textShadowOffesetX-'">
        Offset X
        <input
          @dblclick.stop.prevent=""
          type="number"
          @input="change"
          style="width: 40px"
          class="input-text"
          v-model="value.offsetX"
          name="textShadowOffesetX"
          :id="'textShadowOffesetX-'"
        />
        {{ value.offsetXUnit.label }}
      </label>
    </div>
    <div class="content-item__elem" v-context-menu="cmNameTextShadowOffY">
      <select-unit-context-menu
        :propertyUnit="value.offsetYUnit"
        @changePropUnit="
          () => {
            value.offsetYUnit = $event;
            change();
          }
        "
        :ref="cmNameTextShadowOffY"
      />

      <label :for="'textShadowOffesetY-'">
        Offset Y
        <input
          @dblclick.stop.prevent=""
          type="number"
          @input="change"
          style="width: 40px"
          class="input-text"
          v-model="value.offsetY"
          name="textShadowOffesetY"
          :id="'textShadowOffesetY-'"
        />
        {{ value.offsetYUnit.label }}
      </label>
    </div>

    <div class="content-item__elem" v-context-menu="cmNameTextShadowBlur">
      <select-unit-context-menu
        :propertyUnit="value.blurUnit"
        @changePropUnit="
          () => {
            value.blurUnit = $event;
            change();
          }
        "
        :ref="cmNameTextShadowBlur"
      />

      <label :for="'textShadowBlur-'">
        Blur
        <input
          @dblclick.stop.prevent=""
          type="number"
          @input="change"
          style="width: 40px"
          class="input-text"
          v-model="value.blur"
          name="textShadowBlur"
          :id="'textShadowBlur-'"
        />
        {{ value.blurUnit.label }}
      </label>
    </div>
    <div class="content-item__elem content">
      <div class="color-picker-box" @dblclick.stop.prevent="">
        <label @dblclick.stop.prevent="">Kolor</label>
        <div
          @dblclick.stop.prevent=""
          class="color-picker-btn"
          @click.stop="toggleColorPicker()"
        ></div>
        <span class="p-abs" style="top: 20px; right: -5px;">
          <span v-if="index > 0" class="remove-btn" @click="removeVal"> X </span>
        
        </span>

        <div
          class="color-picker"
          style="left 230px; top: 30px;"
          v-show="pickerActive"
        >
          <Chrome v-model="color" :color="color" label="Color" />
          <div class="color-picker-nav">
            <button @click="cancelColor">Anuluj</button>
            <button @click="saveColor">Zapisz</button>
          </div>
        </div>
      </div>
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

@Component({
  components: {
    Chrome,
  },
})
export default class TextShadowValueComponent extends Vue {
  timeout;
  @Prop({ default: null, required: true })
  tag: HtmlTag;

  @Prop({ default: null, required: true })
  value: TextShadowStruct;

  @Prop({ default: null, required: true })
  index: number;

  // @Prop({default:null, required:false})
  // classList: string[]

  cmNameTextShadowOffX =
    Math.floor(Math.random() * 1000000000).toString() + "text_shadow_off_x";
  cmNameTextShadowOffY =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-off-y";
  cmNameTextShadowBlur =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-blur";
  cmNameTextShadowColor =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-color";

  pickerActive = false;

  color: any = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };

  mounted() {
    // console.log(this.contextMenuName);
    // console.log(this.cmName);

    if (this.value.colorUnit instanceof RGBA) {
      console.log("00000000000000000");
      console.log(this.value.color);

      this.color.r = this.value.color.r;
      this.color.g = this.value.color.g;
      this.color.b = this.value.color.b;
      this.color.a = this.value.color.a;
    }
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

  saveColor() {
    console.log(this.color);
    this.value.color = this.color.rgba;
    this.value.colorUnit = new RGBA();
    this.change();
    this.toggleColorPicker();
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
