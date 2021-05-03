<template >
  <div>
    <div class="content-item__elem_container">
      <div class="content-item__elem">
        <!-- <select-unit-context-menu :propertyUnit="value.offsetXUnit" @changePropUnit="() => {value.offsetXUnit = $event; change();}" :ref="cmNameTextShadowOffX" /> -->

        <label :for="'textShadowOffesetX-'">
          Key Frame
          <select
           @change="onUpdateKeyFrameInAnimation" 
           v-model="compKeyFrame"  
           class="content-item__elem"  
           name="fontFamily" >
            <option v-for="el, kkk in availableKeyFrames" :key="kkk" :value="el" >
                {{ el.name }}
            </option>
        </select>
          <span v-if="value.keyFrame">
            {{ value.keyFrame.name }}

          </span>
        </label>
      </div>
      <div class="content-item__elem">
        <label :for="'textShadowBlur-'">
          Duration
          <input
            @dblclick.stop.prevent=""
            type="number"
            @input="change"
            class="input-text"
            v-model="value.duration"
            name="duration"
            :id="'duration-'"
          />
          {{ value.duration }}
        </label>
      </div>
      <div class="content-item__elem" v-context-menu="cmNameTimingFunction">
        <select-timing-function-menu
          :property="value.timingFunction"
          @changeProp="
            ($event) => {
              value.timingFunction = $event;
              checkCubicBezier($event);
              change();
            }
          "
          :ref="cmNameTimingFunction"
        />

        <label>
          Timing Function:
          {{ value.timingFunction.getValue() }}
        </label>
      </div>

      <div class="content-item__elem">
        <label :for="'textShadowSpread-'">
          Delay
          <input
            @dblclick.stop.prevent=""
            type="number"
            @input="change"
            class="input-text"
            v-model="value.delay"
            name="delay"
            :id="'delay-'"
          />
          {{ value.delay }}
        </label>
      </div>
      <div class="content-item__elem">
        <label :for="'iterationCount' + value.id">
          Iteration Count
          <input
            @dblclick.stop.prevent=""
            type="number"
            @input="change"
            class="input-text"
            v-model="value.iterationCount"
            :name="'iterationCount' + value.id"
            :id="'iterationCount-' + value.id"
          />
          {{ value.delay }}
        </label>
      </div>
      <div class="content-item__elem">
        <label :for="'direction' + value.id">
          Direction
          <select
           @change="change" 
           v-model="value.direction"  
           class="content-item__elem"  
           :name="'direction' + value.id" >
            <option v-for="el, kkk in directionList" :key="kkk" :value="el" >
                {{ el }}
            </option>
        </select>
          {{ value.direction }}
        </label>
      </div>
      <div class="content-item__elem">
        <label :for="'fillMode' + value.id">
          Fill mode
          <select
           @change="change" 
           v-model="value.fillMode"  
           class="content-item__elem"  
           :name="'fillMode' + value.id" >
            <option v-for="el, kkk in fillModeList" :key="kkk" :value="el" >
                {{ el }}
            </option>
        </select>
          {{ value.fillMode }}
        </label>
      </div>
      <div class="content-item__elem">
        <label :for="'playState' + value.id">
          Play state
          <select
           @change="change" 
           v-model="value.playState"  
           class="content-item__elem"  
           :name="'playState' + value.id" >
            <option v-for="el, kkk in playStateList" :key="kkk" :value="el" >
                {{ el }}
            </option>
        </select>
          {{ value.playState }}
        </label>
      </div>

      <div class="content-item__elem content">
        <div class="color-picker-box" @dblclick.stop.prevent="">
          <span v-if="index > 0" class="remove-btn top-35" @click="removeVal">
            X
          </span>
        </div>
      </div>
    </div>
    <cubic-bezier-component
      v-if="isCubicBezier"
      @change="change"
      :allClass="['top-padding', 'padding']"
      :value="value.timingFunction"
      :tag="tag"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import moment from "moment";
import { Pagination } from "~/types/Pagination";
import { TextShadowStruct } from "~/src/Css/Shadow/TextShadowCss";
import { Chrome } from "~/node_modules/vue-color";
import { RGBA } from "~/src/Unit";
import HtmlTag from "~/src/Layout/HtmlTag";
import { BoxShadowStruct } from "~/src/Css/Shadow/BoxShadowCss";
import { TransitionStruct } from "~/src/Css/Animation/TransitionCss";

import * as libCss from "~/src/Css/";
import { CubicBezier } from "~/src/Animation/timingFunction";
import TimingFunction from "~/src/Animation/timingFunction/TimingFunction";
import AnimationCss, { AnimationCssStruct } from "~/src/Css/Animation/AnimationCss";
import KeyFrame from "~/src/Animation/KeyFrame";
import KeyFrameAccessor from "~/src/Animation/KeyFrameAccessor";

@Component({
  components: {
    Chrome,
  },
})
export default class AnimationValueComponent extends Vue {
  timeout;
  @Prop({ default: null, required: true })
  tag: HtmlTag;

  @Prop({ default: null, required: true })
  value: AnimationCssStruct;

  @Prop({ default: null, required: true })
  animation: AnimationCss;

  @Prop({ default: null, required: true })
  index: number;

  cssPropNames: string[] = [];

  isCubicBezier = false;

  fillModeList = AnimationCss.FILL_MODES
  directionList = AnimationCss.DIRECTIONS
  playStateList = AnimationCss.PLAY_STATES

  // @Prop({default:null, required:false})
  // classList: string[]

  cmNameTextShadowOffX =
    Math.floor(Math.random() * 1000000000).toString() + "text_shadow_off_x";
  cmNameTextShadowOffY =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-off-y";
  cmNameTextShadowBlur =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-blur";
  cmNameTextShadowSpread =
    Math.floor(Math.random() * 1000000000).toString() + "text-shadow-spread";
  cmNameTimingFunction =
    Math.floor(Math.random() * 1000000000).toString() + "timing-function";

  propNameEnable = false;

  color: any = {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
  };
  compKeyFrame: KeyFrame = null;

  mounted() {
    var cssProps = libCss;

    // console.log(name);

    for (const cssPropClass in cssProps) {
      // console.log(cssProps[cssPropClass].PROP_NAME);
      this.cssPropNames.push(cssProps[cssPropClass].PROP_NAME);
    }

    this.checkCubicBezier(this.value.timingFunction);
    this.compKeyFrame = this.value.keyFrame

    // console.log(this.contextMenuName);
    // console.log(this.cmName);

    // if (this.value.colorUnit instanceof RGBA) {
    //     console.log('00000000000000000');
    //     console.log(this.value.color);

    //     this.color.r = this.value.color.r
    //     this.color.g = this.value.color.g
    //     this.color.b = this.value.color.b
    //     this.color.a = this.value.color.a
    // }
  }

  get availableKeyFrames() {
    return KeyFrameAccessor.getInstance().keyFrames
  }

  checkCubicBezier(tFunction: TimingFunction) {
    if (tFunction instanceof CubicBezier) {
      this.isCubicBezier = true;
    } else {
      this.isCubicBezier = false;
    }
  }

  onUpdateKeyFrameInAnimation(val)
  {
      // console.log('onUpdateFontFaceInFontFamily');
      // console.log(this.compFontFace);
      // console.log(this.fontFamVal.fontFace);
      // console.log(val.target);
      // console.log(val.target.value);
      if (this.value.keyFrame) {
        if (this.compKeyFrame.uuid !== this.value.keyFrame.uuid) {
          KeyFrameAccessor.getInstance().deleteAnimationOwnerFromKeyFrame(this.value.keyFrame, this.animation)
  
        }

      }

      this.value.keyFrame = this.compKeyFrame
      if (this.value.keyFrame) {
        KeyFrameAccessor.getInstance().addAnimationOwnerToKeyFrame(this.value.keyFrame, this.animation)

      }

      // var f = FontFamily.findFontByName(newVal)
      // this.fontFamilyManager.getProperty().setValue(f)

      this.change()
  }

  toggleColorPicker() {
    // this.pickerActive = !this.pickerActive
  }

  cancelColor() {
    console.log(this.color);

    this.toggleColorPicker();
  }

  removeVal() {
    this.tag.api.deleteCssValue(this.value).then(
      () => {
        this.$emit("remove");
      },
      () => {
        alert("server error");
      }
    );
  }

  saveColor() {
    console.log(this.color);
    // this.value.color = this.color.rgba
    // this.value.colorUnit = new RGBA()
    this.change();
    this.toggleColorPicker();
  }

  change() {
    this.$emit("change");
  }

  get isDisable() {
    return this.value.all == true;
  }

  // get allClass()
  // {
  //     var res = this.classList
  //     if (this.hasProperty) {
  //         if (this.globalEl) {
  //             res.push('active-global')

  //         } else {
  //             res.push('active')

  //         }
  //     }

  //     return res
  // }

  // get customHasProp()
  // {
  //     return this.hasProperty
  // }

  // set customHasProp(val)
  // {
  //     this.$emit('changeHasProp', val)
  // }

  // get customProp()
  // {
  //     return this.property
  // }

  // set customProp(val)
  // {
  //     this.$emit('changeProp', val)
  // }

  // get customPropUnit()
  // {
  //     return this.propertyUnit
  // }

  // set customPropUnit(val)
  // {
  //     if (val) {
  //         this.$emit('changePropUnit', val)

  //     }
  // }

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

.top-35 {
  top: 35px;
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
