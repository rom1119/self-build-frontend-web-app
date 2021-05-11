<template >
  <div class="d-flex" style="flex-direction:column;">
    <div class="content-item p-0 d-flex">
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            scale X / rotate Z cos(a) / rotate Y cos(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valOne' + transformVal.id" v-model="value.val">
        </label>
      </div>
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Skew Y - tan(a) / rotate Z sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valTwo' + transformVal.id" v-model="value.valSecond">
        </label>
      </div>
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXX / rotate Y -sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valThree' + transformVal.id" v-model="value.valThird">
        </label>
      </div>
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXX
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valFour' + transformVal.id" v-model="value.valFourth">
        </label>
      </div>
    
    </div>
    <div class="content-item p-0 d-flex">

      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Skew X - tan(a) / Rotate Z  -sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valFive' + transformVal.id" v-model="value.valFiveth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Scale Y / rotate Z cos(a) / rotate X cos(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valSix' + transformVal.id" v-model="value.valSixth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXXX / rotate X sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valSeventh' + transformVal.id" v-model="value.valSeventh">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXX
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valEighth' + transformVal.id" v-model="value.valEighth">
        </label>
      </div>

      

    </div>

    <div class="content-item p-0 d-flex">

      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXXX / rotate Y sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valNinth' + transformVal.id" v-model="value.valNinth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXXX / rotate X -sin(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valTenth' + transformVal.id" v-model="value.valTenth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Scale Z / rotate X cos(a) / rotate Y cos(a)
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valEleventh' + transformVal.id" v-model="value.valEleventh">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXX
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valTwelfth' + transformVal.id" v-model="value.valTwelfth">
        </label>
      </div>

    </div>

    <div class="content-item p-0 d-flex">

      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Translate X
          </h5>
        <label for="" class="w100">
          <input type="number" step="1" class="w100" @input="change" :name="'valThirteenth' + transformVal.id" v-model="value.valThirteenth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Translate Y
          </h5>
        <label for="" class="w100">
          <input type="number" step="1" class="w100" @input="change" :name="'valFourteenth' + transformVal.id" v-model="value.valFourteenth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            Translate Z
          </h5>
        <label for="" class="w100">
          <input type="number" step="1" class="w100" @input="change" :name="'valFifteenth' + transformVal.id" v-model="value.valFifteenth">
        </label>
      </div>
      
      <div class="content-item-quarter " >
          <h5 class="p-0 m-0 font-sm">
            XXXX
          </h5>
        <label for="" class="w100">
          <input type="number" step=".0001" class="w100" @input="change" :name="'valSixteenth' + transformVal.id" v-model="value.valSixteenth">
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
import { Matrix, Matrix3D, Rotate, Scale, ScaleX } from "~/src/Css/ThreeDimensional/TransformTypes";
import UnitSecond from '../../../../src/Unit/Time/UnitSecond';

@Component({
    components: {
        CssTwoAxisComponent
    }
})
export default class MatrixThreedimensionalComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: Matrix3D
  
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
