<template >
  <div >
    <h4>{{ value.value.getName() }}</h4>
    <component 
      :is="getComponentNameByTransformType(value.value)"
       :value="value.value" 
       @change="change"
       :transform="transform"
       :transformVal="value"
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
import TransformType from "~/src/Css/ThreeDimensional/TransformType";
import { Matrix, Matrix3D, Perspective, Rotate, Rotate3D, RotateX, RotateY, RotateZ, Scale, Scale3D, ScaleX, ScaleY, ScaleZ, Skew, SkewX, SkewY, Translate, Translate3D, TranslateX, TranslateY, TranslateZ } from "~/src/Css/ThreeDimensional/TransformTypes";
// COMPONENTS
import RotateComponent from './TransformType/RotateComponent.vue';
import RotateXComponent from './TransformType/RotateXComponent.vue';
import RotateYComponent from './TransformType/RotateYComponent.vue';
import RotateZComponent from './TransformType/RotateZComponent.vue';
import RotateThreedimensionalComponent from './TransformType/RotateThreedimensionalComponent.vue';
import TranslateComponent from './TransformType/TranslateComponent.vue';
import TranslateXComponent from './TransformType/TranslateXComponent.vue';
import TranslateYComponent from './TransformType/TranslateYComponent.vue';
import TranslateZComponent from './TransformType/TranslateZComponent.vue';
import TranslateThreedimensionalComponent from './TransformType/TranslateThreedimensionalComponent.vue';
import ScaleComponent from './TransformType/ScaleComponent.vue';
import ScaleXComponent from './TransformType/ScaleXComponent.vue';
import ScaleYComponent from './TransformType/ScaleYComponent.vue';
import ScaleZComponent from './TransformType/ScaleZComponent.vue';
import ScaleThreedimensionalComponent from './TransformType/ScaleThreedimensionalComponent.vue';
import SkewComponent from './TransformType/SkewComponent.vue';
import SkewXComponent from './TransformType/SkewXComponent.vue';
import SkewYComponent from './TransformType/SkewYComponent.vue';

import PerspectiveComponent from './TransformType/PerspectiveComponent.vue';

import MatrixComponent from './TransformType/MatrixComponent.vue';
import MatrixThreedimensionalComponent from './TransformType/MatrixThreedimensionalComponent.vue';

@Component({
    components: {
        CssTwoAxisComponent, 
        RotateComponent,
        RotateXComponent,
        RotateYComponent,
        RotateZComponent,
        RotateThreedimensionalComponent,
        TranslateComponent,
        TranslateXComponent,
        TranslateYComponent,
        TranslateZComponent,
        TranslateThreedimensionalComponent,
        ScaleComponent,
        ScaleXComponent,
        ScaleYComponent,
        ScaleZComponent,
        ScaleThreedimensionalComponent,
        SkewComponent,
        SkewXComponent,
        SkewYComponent,
        PerspectiveComponent,
        MatrixComponent,
        MatrixThreedimensionalComponent,
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
    
    if (el instanceof RotateX) {
      return 'rotate-x-component'
    }
    
    if (el instanceof RotateY) {
      return 'rotate-y-component'
    }
    
    if (el instanceof RotateZ) {
      return 'rotate-z-component'
    }
    
    if (el instanceof Rotate3D) {
      return 'rotate-threedimensional-component'
    }
    
    if (el instanceof Translate) {
      return 'translate-component'
    }
    
    if (el instanceof TranslateX) {
      return 'translate-x-component'
    }
    
    if (el instanceof TranslateY) {
      return 'translate-y-component'
    }
    
    if (el instanceof TranslateZ) {
      return 'translate-z-component'
    }
    
    if (el instanceof Translate3D) {
      return 'translate-threedimensional-component'
    }
    
    if (el instanceof Scale) {
      return 'scale-component'
    }
    
    if (el instanceof ScaleX) {
      return 'scale-x-component'
    }
    
    if (el instanceof ScaleY) {
      return 'scale-y-component'
    }
    
    if (el instanceof ScaleZ) {
      return 'scale-z-component'
    }

    if (el instanceof Scale3D) {
      return 'scale-threedimensional-component'
    }
    
    if (el instanceof Skew) {
      return 'skew-component'
    }
    
    if (el instanceof SkewX) {
      return 'skew-x-component'
    }
    
    if (el instanceof SkewY) {
      return 'skew-y-component'
    }
    
    if (el instanceof Perspective) {
      return 'perspective-component'
    }
    
    if (el instanceof Matrix3D) {
      return 'matrix-threedimensional-component'
    }
    
    if (el instanceof Matrix) {
      return 'matrix-component'
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
