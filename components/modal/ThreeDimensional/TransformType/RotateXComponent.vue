<template >
  <div >
  
    <input-val-component 
        labelProp="X position"
        classContainer="content-item-half"
        contextMenuName="angel-units"
        :valueProp="value.val"
        :unitProp="value.unit"
        :minRangeProp="-2000"
        :maxRangeProp="2000"
        :stepValue="1"
        @changeValue="value.val = $event"
        @changeUnit="value.unit = $event"
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
import { Rotate, RotateX } from "~/src/Css/ThreeDimensional/TransformTypes";
import InputValComponent from '../../../InputValComponent.vue';

@Component({
    components: {
        CssTwoAxisComponent, InputValComponent
    }
})
export default class RotateXComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: RotateX
  
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
