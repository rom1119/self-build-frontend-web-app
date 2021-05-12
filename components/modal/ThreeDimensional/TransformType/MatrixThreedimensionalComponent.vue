<template >
  <div class="d-flex" style="flex-direction:column;">
    <div class="content-item p-0 d-flex">
      <input-val-component 
        labelProp="scale X / rotate Z cos(a) / rotate Y cos(a)"
        classContainer="content-item-quarter"
        :valueProp="value.val"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".001"
        @changeValue="value.val = $event"
        @change="change"
      />
      <input-val-component 
        labelProp="Skew Y - tan(a) / rotate Z sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valSecond"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".001"
        @changeValue="value.valSecond = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="rotate Y -sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valThird"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".001"
        @changeValue="value.valThird = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="XXX"
        classContainer="content-item-quarter"
        :valueProp="value.valFourth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".0001"
        @changeValue="value.valFourth = $event"
        @change="change"
      />
    
    </div>
    <div class="content-item p-0 d-flex">
      <input-val-component 
        labelProp="Skew X - tan(a) / Rotate Z  -sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valFiveth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".01"
        @changeValue="value.valFiveth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="Scale Y / rotate Z cos(a) / rotate X cos(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valSixth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".01"
        @changeValue="value.valSixth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="rotate X sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valSeventh"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".01"
        @changeValue="value.valSeventh = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="XXXX"
        classContainer="content-item-quarter"
        :valueProp="value.valEighth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".0001"
        @changeValue="value.valEighth = $event"
        @change="change"
      />

    </div>

    <div class="content-item p-0 d-flex">

      <input-val-component 
        labelProp="rotate Y sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valNinth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".001"
        @changeValue="value.valNinth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="rotate X -sin(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valTenth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".001"
        @changeValue="value.valTenth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="Scale Z / rotate X cos(a) / rotate Y cos(a)"
        classContainer="content-item-quarter"
        :valueProp="value.valEleventh"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".1"
        @changeValue="value.valEleventh = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="XXXX"
        classContainer="content-item-quarter"
        :valueProp="value.valTwelfth"
        :minRangeProp="-2"
        :maxRangeProp="1"
        :stepValue=".0001"
        @changeValue="value.valTwelfth = $event"
        @change="change"
      />

    </div>

    <div class="content-item p-0 d-flex">

      <input-val-component 
        labelProp="Translate X"
        classContainer="content-item-quarter"
        :valueProp="value.valThirteenth"
        :minRangeProp="-800"
        :maxRangeProp="1900"
        :stepValue="1"
        @changeValue="value.valThirteenth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="Translate Y"
        classContainer="content-item-quarter"
        :valueProp="value.valFourteenth"
        :minRangeProp="-800"
        :maxRangeProp="1900"
        :stepValue="1"
        @changeValue="value.valFourteenth = $event"
        @change="change"
      />
      
      
      <input-val-component 
        labelProp="Translate Z"
        classContainer="content-item-quarter"
        :valueProp="value.valFifteenth"
        :minRangeProp="-800"
        :maxRangeProp="1900"
        :stepValue="1"
        @changeValue="value.valFifteenth = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="XXX"
        classContainer="content-item-quarter"
        :valueProp="value.valSixteenth"
        :minRangeProp="-2"
        :maxRangeProp="2"
        :stepValue=".001"
        @changeValue="value.valSixteenth = $event"
        @change="change"
      />

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
import InputValComponent from '../../../InputValComponent.vue';

@Component({
    components: {
        CssTwoAxisComponent, InputValComponent
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
