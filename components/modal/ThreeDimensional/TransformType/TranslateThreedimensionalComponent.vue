<template >
  <div class="d-flex">

      <input-val-component 
        labelProp="X position"
        classContainer="content-item-half"
        contextMenuName="length-units"
        :valueProp="value.val"
        :unitProp="value.unit"
        :minRangeProp="-2000"
        :maxRangeProp="2000"
        :stepValue="1"
        @changeValue="value.val = $event"
        @changeUnit="value.unit = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="Y position"
        classContainer="content-item-half"
        contextMenuName="length-units"
        :valueProp="value.valSecond"
        :unitProp="value.unitSecond"
        :minRangeProp="-2000"
        :maxRangeProp="2000"
        :stepValue="1"
        @changeValue="value.valSecond = $event"
        @changeUnit="value.unitSecond = $event"
        @change="change"
      />
      
      <input-val-component 
        labelProp="Z position"
        classContainer="content-item-half"
        contextMenuName="length-units"
        :valueProp="value.valThird"
        :unitProp="value.unitThird"
        :minRangeProp="-2000"
        :maxRangeProp="2000"
        :stepValue="1"
        @changeValue="value.valThird = $event"
        @changeUnit="value.unitThird = $event"
        @change="change"
      />
    
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
import { Rotate, Translate, Translate3D } from "~/src/Css/ThreeDimensional/TransformTypes";
import InputValComponent from '../../../InputValComponent.vue';

@Component({
    components: {
        CssTwoAxisComponent, InputValComponent
    }
})
export default class TranslateThreedimensionalComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: Translate3D
  
  @Prop({required: true, default: null})
  transform: TransformCss

  @Prop({required: true, default: null})
  transformVal: TransformCssStruct

  cmNameXOffset = Math.floor(Math.random() * 1000000000).toString() + "xoffset";
  cmNameYOffset = Math.floor(Math.random() * 1000000000).toString() + "yoffset";
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
