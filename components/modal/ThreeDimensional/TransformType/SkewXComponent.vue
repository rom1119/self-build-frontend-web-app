<template >
  <div class="d-flex">
  
      <div class="content-item-half " v-context-menu="cmNameXOffset" >
          <h5 class="p-0 m-0">
            X val
          </h5>
          <select-angle-unit-context-menu
                :propertyUnit="value.unit"
                @changePropUnit="
                ($event) => {
                    value.unit = $event; change();
                }
                "
                :ref="cmNameXOffset"
            />
        <label for="">

          current unit ({{ value.unit.label }})
          <input type="number" step=".01" class="w50px" @input="change" :name="'xPos' + transformVal.id" v-model="value.val">
        </label>
      </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import _ from "lodash";
import HtmlTag from "~/src/Layout/HtmlTag";
import AnimationManageComponent from "../manageComponent/component/AnimationManageComponent.vue";
import CssTwoAxis from "~/src/Css/CssTwoAxis";
import { Named, Pixel } from "~/src/Unit";
import CssTwoAxisComponent from '~/components/modal/AxisCss/CssTwoAxisComponent.vue';
import { TransformCss, TransformOrigin } from "~/src/Css";
import { TransformCssStruct } from "~/src/Css/ThreeDimensional/TransformCss";
import { Rotate, Scale, ScaleX, SkewX } from "~/src/Css/ThreeDimensional/TransformTypes";

@Component({
    components: {
        CssTwoAxisComponent
    }
})
export default class SkewXComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: SkewX
  
  @Prop({required: true, default: null})
  transform: TransformCss

  @Prop({required: true, default: null})
  transformVal: TransformCssStruct

  cmNameXOffset = Math.floor(Math.random() * 1000000000).toString() + "xoffset";
  cmNameYOffset = Math.floor(Math.random() * 1000000000).toString() + "yoffset";


  mounted() {
      // this.$refs.manageComponent = null
  }

  changeZNumericVal() {
    this.change()
  }

  


  change() {
    this.$emit('change')
  }

}
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba($color: #d81121, $alpha: 0.4);
}
.green-bg {
  background-color: greenyellow;
}
.rel {
  position: relative;
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
</style>
