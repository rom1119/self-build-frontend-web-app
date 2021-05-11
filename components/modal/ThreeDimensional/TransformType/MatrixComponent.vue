<template >
  <div class="d-flex">
  
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            scale X
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'scaleX' + transformVal.id" v-model="value.val">
        </label>
      </div>
      
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            Skew Y
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'skewY' + transformVal.id" v-model="value.valSecond">
        </label>
      </div>
      
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            Skew X
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'skewX' + transformVal.id" v-model="value.valThird">
        </label>
      </div>
      
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            Scale Y
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'scaleY' + transformVal.id" v-model="value.valFourth">
        </label>
      </div>
      
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            Translate X
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'translateX' + transformVal.id" v-model="value.valFiveth">
        </label>
      </div>
      
      <div class="content-item-half " >
          <h5 class="p-0 m-0 font-sm">
            Translate Y
          </h5>

        <label for="">

          <input type="number" step=".01" class="w50px" @input="change" :name="'translateY' + transformVal.id" v-model="value.valSixth">
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
import { Matrix, Rotate, Scale, ScaleX } from "~/src/Css/ThreeDimensional/TransformTypes";
import UnitSecond from '../../../../src/Unit/Time/UnitSecond';

@Component({
    components: {
        CssTwoAxisComponent
    }
})
export default class MatrixComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: Matrix
  
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
