<template >
  <div >
  
    <component 
      :is="getComponentNameByTransformType(value.value)"
       :value="value.value" 
       @change="change"
       :transform="transform" />
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
import TransformType from "~/src/Css/ThreeDimensional/TransformType";
import { Rotate, Rotate3D, Scale, Skew, Translate, Translate3D } from "~/src/Css/ThreeDimensional/TransformTypes";
import RotateComponent from './TransformType/RotateComponent.vue';
import Rotate3DComponent from './TransformType/Rotate3DComponent.vue';
import TranslateComponent from './TransformType/TranslateComponent.vue';
import Translate3DComponent from './TransformType/Translate3DComponent.vue';
import ScaleComponent from './TransformType/ScaleComponent.vue';
import SkewComponent from './TransformType/SkewComponent.vue';

@Component({
    components: {
        CssTwoAxisComponent, 
        RotateComponent,
        Rotate3DComponent,
        TranslateComponent,
        Translate3DComponent,
        ScaleComponent,
        SkewComponent,
    }
})
export default class TransformValComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: TransformCssStruct
  
  @Prop({required: true, default: null})
  transform: TransformCss

  cmNameZOffset = Math.floor(Math.random() * 1000000000).toString() + "zoffset";


  mounted() {
      // this.$refs.manageComponent = null
  }
  
  getComponentNameByTransformType(el: TransformType): string {
    if (el instanceof Rotate) {
      return 'rotate-component'
    }
    
    if (el instanceof Rotate3D) {
      return 'rotate-3d-component'
    }
    
    if (el instanceof Translate) {
      return 'translate-component'
    }
    
    if (el instanceof Translate3D) {
      return 'translate-3d-component'
    }
    
    if (el instanceof Scale) {
      return 'scale-component'
    }
    
    if (el instanceof Skew) {
      return 'skew-component'
    }

    throw Error(`can not fin module for ${el.getName()} Transform type`)
  
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
