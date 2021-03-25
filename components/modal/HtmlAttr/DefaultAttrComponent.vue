<template >
  <div class="content-item__elem_container" :class="{ active: hasActive }">
    <div
      v-if="value != null"
      @dblclick.stop.prevent="$emit('toggleAttr')"
      class="content-item__elem"
    >
      <!-- <html-attr-type-unit-menu :propertyUnit="value.directionUnit" @changePropUnit="($event) => {value.directionUnit = $event; change();}" :ref="cmNameTextShadowBlur" /> -->

      <label style="display: inline-flex">
        <b class="small-font">Atrubut "{{ value.key }}"</b>
        <span style="width: 10px"> &nbsp; </span>
        <select
          v-if="isPredefinedAttr"
          disabled
          name="direction"
          class="select-size mr-3"
          @change="change"
          v-model="attrKey"
        >
          <option v-for="type in types" :value="type" :key="type">
            {{ type }}
          </option>
        </select>
        <!-- <select v-else name="direction" class="select-size mr-3" @change="change" v-model="attrKey">
                        <option v-for="type in types" :value="type" :key="type"> {{ type }} </option>
                    </select> -->
        <template v-if="!isPredefinedAttr">
          <input
            type="text"
            @dblclick.stop.prevent=""
            @input="change"
            style="width: 50px"
            class="input-text"
            v-model="attrKey"
          />
          <!-- <input type="range" v-model="value.direction" :step="inputStep" @input="change" :max="maxSize" /> -->
        </template>
      </label>
    </div>
    <div class="content-item__elem">
      <label :for="'textShadowOffesetX-'">
        Value
        <input
          @dblclick.stop.prevent=""
          type="text"
          @input="change"
          style="width: 60px"
          class="input-text"
          v-model="value.value"
          name="textShadowOffesetX"
          :id="cmNameTextShadowOffX"
        />
      </label>
      <span
        v-if="!isPredefinedAttr"
        class="remove-btn"
        style="left: 20px; position: relative; top: 0"
        @click="removeVal"
      >
        X
      </span>
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
import HtmlAttr from "~/src/Attribute/HtmlAttr";
import ColspanAttr from "~/src/Attribute/html/ColspanAttr";
import RowspanAttr from "~/src/Attribute/html/RowspanAttr";
import CustomAttr from "~/src/Attribute/html/CustomAttr";

@Component({
  components: {
    Chrome,
  },
})
export default class DefaultAttrComponent extends Vue {
  timeout;
  @Prop({ default: null, required: true })
  tag: HtmlTag;

  @Prop({ default: null, required: true })
  value: HtmlAttr;

  @Prop({ default: null, required: true })
  index: number;

  attrKey = "";

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

  types: string[] = [];

  get isPredefinedAttr() {
    return !(this.value instanceof CustomAttr);
  }

  get hasActive() {
    return this.value.active;
  }
  mounted() {
    this.types.push(ColspanAttr.NAME);
    this.types.push(RowspanAttr.NAME);
    this.types.push(CustomAttr.NAME);

    console.log("MOUNTED");
    console.log(this.value.key);
    console.log(this.value);
    this.attrKey = this.value.key;
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

  change(a) {
    // @ts-ignore
    this.value.setKey(this.attrKey);
    this.$emit("change");
  }

  removeVal() {
    this.$emit("toggleAttr");
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

.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
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
