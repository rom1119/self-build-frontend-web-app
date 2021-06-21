<template >

    <div :class="allClass" 
        @dblclick.stop="property.active === true ? deactivate() : activate()"
            
        v-context-menu="cmName"
        >
        <select-unit-context-menu 
                :propertyUnit="property" 
                @changePropUnit="onChange"
                :ref="cmName" />

        <div   class="asd content">
            <input v-if="property.isActive()" @input="onChange" @dblclick.stop.prevent="" style="width: 40px;" class="input-text" type="number" v-model="property.clearWidth" name="property" :id="'padding-top' + contextMenuName">
            <input v-else disabled style="width: 40px;" class="disabled input-text" type="number" v-model="property.clearWidth" name="property" :id="'padding-top' + contextMenuName">
            </br>
            <span @dblclick.stop.prevent="" class="property-value" v-if="property">{{ property.getWidthUnit().label }}  {{ property.getType() }} {{ property.getColor() }}</span>
            <div class="add-settings-box" @dblclick.stop.prevent="">
                <div class="border-radius-btn" @click.stop="toggleTab()">
                </div>

                <div class="border-radius-manage" v-show="pickerActive">
                    <input  type="checkbox" v-model="hasBorderRadius">
                    <input v-if="hasBorderRadius" @input="onChange" @dblclick.stop.prevent="" style="width: 40px;" class="input-text" type="number" v-model="borderRadius">
                    <input v-else disabled style="width: 40px;" class="disabled input-text" type="number" v-model="property.clearWidth" name="property" :id="'padding-top' + contextMenuName">
                    

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
import BorderComputedPropertyManager from "../../computedPropertyManagers/impl/BorderComputedPropertyManager";
import BaseMarginCss from "~/src/Css/BoxModel/BaseMarginCss";
import { Chrome } from "~/node_modules/vue-color";
import { RGBA, Pixel, Percent, EM, REM, VW, VH } from "../../../src/Unit";
import BaseBorderRadiusCss from "~/src/Css/Border/BaseBorderRadiusCss";

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
  property: BaseBorderRadiusCss;

  @Prop({ default: null, required: true })
  contextMenuName;

  @Prop({ default: null, required: true })
  classList: string[];

  cmName = Math.floor(Math.random() * 1000000000).toString() + "asd";

  hasBorderRadius = false;
  borderRadius = 0;
  borderRadiusUnit = 0;
  sizeUnits = [];
  tabActive = false;

  mounted() {
    this.sizeUnits.push(new Pixel());
    this.sizeUnits.push(new Percent());
    this.sizeUnits.push(new EM());
    this.sizeUnits.push(new REM());
    this.sizeUnits.push(new VW());
    this.sizeUnits.push(new VH());
    // console.log(this.property);
    // console.log(this.cmName);
  }

  onChange(val) {
    console.log("change");

    this.$emit("change");
  }

  toggleTab() {
    this.tabActive = !this.tabActive;
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
    //    if (this.globalEl) {
    //        this.borderManager.activePropCss(this.property)
    //         this.borderManager.updateDirections()

    //    } else {
    //        this.borderManager.activePropCss(this.property)

    //    }
  }

  deactivate() {
    //    this.property.setActive(false)
    //    if (this.globalEl) {
    //        this.borderManager.deactiveGlobalPropCss(this.property)
    //         this.borderManager.updateDirections()
    //    } else {
    //        this.borderManager.deactivePropCss(this.property)
    //    }
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
