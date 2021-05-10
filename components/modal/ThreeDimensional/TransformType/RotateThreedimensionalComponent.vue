<template >
  <div class="d-flex" style="flex-direction: column;" >
    <div class=" d-flex"  >
      <div class="content-item-half "  >
          <h5 class="p-0 m-0">
            X position
          </h5>

        <label for="">
          numeric value
          <input type="number" step=".01" class="w50px" @input="change"  name="zPos" v-model="value.val">
        </label>
      </div>
      <div class="content-item-half "  >
          <h5 class="p-0 m-0">
            Y position
          </h5>

        <label for="">
          numeric value
          <input type="number" step=".01" class="w50px"  @input="change" name="yPos" v-model="value.valSecond">
        </label>
      </div>
    </div>
    <div class="d-flex"  >
    <div class="content-item-half "  >
        <h5 class="p-0 m-0">
          Z position
        </h5>

      <label for="">
        numeric value
        <input type="number" step=".01" class="w50px" @input="change" name="zPos" v-model="value.valThird">
      </label>
    </div>
      <div class="content-item-half " v-context-menu="cmNameZOffset" >
            <h5 class="p-0 m-0">
              Z position
            </h5>
            <select-angle-unit-context-menu
                  :propertyUnit="value.valForthUnit"
                  @changePropUnit="
                  ($event) => {
                      value.valForthUnit = $event; change();
                  }
                  "
                  :ref="cmNameZOffset"
              />
          <label for="">
            numeric value
            <input type="number"  class="w50px" @input="change" name="zPos" v-model="value.valFourth">
            <br>
            current unit ({{ value.valForthUnit.label }})
          </label>
        </div>
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
import { Rotate3D } from "~/src/Css/ThreeDimensional/TransformTypes";

@Component({
    components: {
        CssTwoAxisComponent
    }
})
export default class RotateThreedimensionalComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: Rotate3D
  
  @Prop({required: true, default: null})
  transform: TransformCss

  @Prop({required: true, default: null})
  transformVal: TransformCssStruct

  cmNameZOffset = Math.floor(Math.random() * 1000000000).toString() + "zoffset";


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
