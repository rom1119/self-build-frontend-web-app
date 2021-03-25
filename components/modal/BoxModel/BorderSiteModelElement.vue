<template >

    <div :class="allClass" 
        @dblclick.stop="property.active === true ? deactivate() : activate()"
            
        v-context-menu="cmName"
        >
        <border-html-context-menu 
                :property="property" 
                :value="property" 
                @change="onChange" 
                :ref="cmName" />

        <div   class="asd content">
            <input v-if="property.isActive()" @input="onChange" @dblclick.stop.prevent="" style="width: 40px;" class="input-text" type="number" v-model="property.clearWidth" name="property" :id="'padding-top' + contextMenuName">
            <input v-else disabled style="width: 40px;" class="disabled input-text" type="number" v-model="property.clearWidth" name="property" :id="'padding-top' + contextMenuName">
            </br>
            <span @dblclick.stop.prevent="" class="property-value" v-if="property">{{ property.getWidthUnit().label }}  {{ property.getType() }} {{ property.getColor() }}</span>
            <div class="color-picker-box" @dblclick.stop.prevent="">
                <div class="color-picker-btn" :style="{'background-color': backgroundColor}"  @click.stop="toggleColorPicker()">
                </div>
                <div class="color-picker" v-show="pickerActive">
                    <Chrome v-model="borderColor" :color="borderColor" label="Color" />
                    <div class="color-picker-nav">
                        <button @click="cancelColor">Anuluj</button>
                        <button @click="saveColor">Zapisz</button>
                    </div>

                </div>

            </div>
            <!-- <select v-if="hasProperty" name="propertyUnit" class="item" v-model="propertyUnit" id="propertyUnit">
                <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
            </select>
            <select v-else disabled name="propertyUnit" class=" item" v-model="propertyUnit" id="propertyUnit">
                <option v-for="unit in allUnits" :key="unit.name" :value="unit.name">{{ unit.name }}</option>
            </select> -->
            
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import { Pagination } from "~/types/Pagination";
import BaseBorderCss from "../../../src/Css/Border/BaseBorderCss";
import BoxModelModal from "~/components/BoxModelModal";
import BorderComputedPropertyManager from "../../computedPropertyManagers/impl/BorderComputedPropertyManager";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import { Chrome } from "~/node_modules/vue-color";
import { RGBA } from "../../../src/Unit";

@Component({
  components: {
    Chrome,
  },
})
export default class BorderSiteModelElement extends Vue {
  timeout;
  // value: HtmlTag
  DEFAULT_FONT_SIZE = 20;
  @Prop({ default: false, required: false })
  globalEl;

  @Prop({ default: null, required: true })
  property: BaseBorderCss;

  @Prop({ default: null, required: true })
  borderManager: BorderComputedPropertyManager;

  @Prop({ default: null, required: true })
  contextMenuName;

  @Prop({ default: null, required: true })
  classList: string[];

  cmName = Math.floor(Math.random() * 1000000000).toString() + "asd";

  color = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };

  pickerActive = false;
  backgroundColor = "white";

  mounted() {
    // console.log(this.property);
    // console.log(this.cmName);

    if (this.property.getColorUnit() instanceof RGBA) {
      console.log("00000000000000000");
      console.log(this.property.clearColor);

      this.color.r = this.property.clearColor.r;
      this.color.g = this.property.clearColor.g;
      this.color.b = this.property.clearColor.b;
      this.color.a = this.property.clearColor.a;
    }
    this.backgroundColor = this.property.getColor();
  }

  onChange(val) {
    console.log("change");

    this.borderManager.updateCssProp(this.property);
  }

  cancelColor() {
    console.log(this.color);

    this.toggleColorPicker();
  }

  saveColor() {
    console.log(this.color);
    this.property.setColor(this.color, new RGBA());
    this.onChange(this.color);
    this.toggleColorPicker();
    this.backgroundColor = this.property.getColor();
  }

  toggleColorPicker() {
    this.pickerActive = !this.pickerActive;
  }

  get borderColor() {
    return this.color;
  }

  set borderColor(val: any) {
    console.log(val);
    console.log(this.color);

    this.color = val.rgba;
  }

  get contextID() {
    return this.cmName;
  }

  get allClass() {
    var res = this.classList;
    if (this.property.isActive()) {
      if (this.globalEl) {
        res.push("active-global");
      } else {
        res.push("active");
      }
    }

    return res;
  }

  activate() {
    this.property.setActive(true);
    if (this.globalEl) {
      this.borderManager.activePropCss(this.property);
      this.borderManager.updateDirections();
    } else {
      this.borderManager.activePropCss(this.property);
    }
  }

  deactivate() {
    this.property.setActive(false);
    if (this.globalEl) {
      this.borderManager.deactiveGlobalPropCss(this.property);
      this.borderManager.updateDirections();
    } else {
      this.borderManager.deactivePropCss(this.property);
    }
  }

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
