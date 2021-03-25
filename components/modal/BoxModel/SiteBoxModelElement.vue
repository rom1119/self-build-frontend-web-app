<template >

    <div :class="allClass" 
        @dblclick.stop="customHasProp === true ? customHasProp = false : customHasProp = true"
            
        v-context-menu="cmName"
        >
        <select-unit-context-menu :propertyUnit="customPropUnit" @changePropUnit="customPropUnit = $event" :ref="cmName" />

        <div class="">
            <div v-if="setPropAuto">
                <button :class="{'green-bg': propAuto}" @click.stop="clickAutoBtn"  class="auto-prop">auto</button>
            </div>
            <input v-if="hasProperty" @dblclick.stop.prevent="" style="width: 40px;" class="input-text" type="number" v-model="customProp" name="property" :id="'padding-top' + contextMenuName">
            <input v-else disabled style="width: 40px;" class="disabled input-text" type="number" v-model="customProp" name="property" :id="'padding-top' + contextMenuName">
            </br>
            <span @dblclick.stop.prevent="" v-if="customPropUnit">{{ customPropUnit.label }}</span>
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

@Component
export default class SiteBoxModelElement extends Vue {
  timeout;
  // value: HtmlTag
  DEFAULT_FONT_SIZE = 20;
  @Prop({ default: false, required: false })
  globalEl;

  @Prop({ default: false, required: false })
  setPropAuto;

  @Prop({ default: null, required: false })
  onClickPropAuto;

  @Prop({ default: null, required: false })
  propAuto;

  @Prop({ default: null, required: true })
  hasProperty;

  @Prop({ default: null, required: true })
  property;

  @Prop({ default: null, required: true })
  propertyUnit;

  @Prop({ default: null, required: true })
  contextMenuName;

  @Prop({ default: null, required: true })
  classList: string[];

  cmName = Math.floor(Math.random() * 1000000000).toString() + "asd";

  mounted() {
    // console.log(this.contextMenuName);
    // console.log(this.cmName);
  }

  clickAutoBtn() {
    this.$emit("clickAuto");
  }

  get contextID() {
    return this.cmName;
  }

  get allClass() {
    var res = this.classList;
    if (this.hasProperty) {
      if (this.globalEl) {
        res.push("active-global");
      } else {
        res.push("active");
      }
    }

    return res;
  }

  get customHasProp() {
    return this.hasProperty;
  }

  set customHasProp(val) {
    this.$emit("changeHasProp", val);
  }

  get customProp() {
    return this.property;
  }

  set customProp(val) {
    this.$emit("changeProp", val);
  }

  get customPropUnit() {
    return this.propertyUnit;
  }

  set customPropUnit(val) {
    if (val) {
      this.$emit("changePropUnit", val);
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
