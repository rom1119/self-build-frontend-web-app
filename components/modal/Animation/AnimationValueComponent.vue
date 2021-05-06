<template >
  <div>
    <div class="content-item__elem_container">
      <div class="content-item__elem p-0">
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
        </label>
      </div>
      <div class="content-item d-flex p-0">
          <div class="content-item-half p-0" v-context-menu="cmNameDuration">
            <label :for="'textShadowBlur-'" class="">
              Duration
              <br>
              <input
                @dblclick.stop.prevent=""
                type="number"
                @input="change"
                style="width: 40px"
                class="input-text"
                v-model="value.duration"
                name="duration"
                :id="'duration-'"
              />
              {{ value.durationValue }}
              <select-time-unit-context-menu
                :propertyUnit="value.durationUnit"
                @changePropUnit="
                  ($event) => {
                    value.durationUnit = $event;
                    change();
                  }
                "
                :ref="cmNameDuration"
              />
            </label>

        </div>
        <div class="content-item-half p-0" v-context-menu="cmNameDelay">
          <label :for="'textShadowSpread-'" class="">
            Delay
            <br>
            <input
              @dblclick.stop.prevent=""
              type="number"
              @input="change"
              style="width: 40px"
              class="input-text"
              v-model="value.delay"
              name="delay"
              :id="'delay-'"
            />
            {{ value.delayValue }}
            <select-time-unit-context-menu
              :propertyUnit="value.delayUnit"
              @changePropUnit="
                ($event) => {
                  value.delayUnit = $event;
                  change();
                }
              "
              :ref="cmNameDelay"
            />
          </label>
   
        </div>
      </div>
      <div class="content-item__elem p-0" v-context-menu="cmNameTimingFunction">
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

      <div class="content-item d-flex p-0">
        <div class="content-item-half  p-0">
          <label :for="'iterationCount' + value.id" >
            Iteration Count
            <span>
              INFINITE
              <input type="checkbox" @change="change" v-model="infiniteChecked" />
            </span>
            <input
              @dblclick.stop.prevent=""
              type="number"
              @input="change"
              :disabled="infiniteCheckedData"
              class="input-text w100"
              v-model="value.iterationCount"
              :name="'iterationCount' + value.id"
              :id="'iterationCount-' + value.id"
            />
          </label>
          
        </div>
        <div class="content-item-half p-0">
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
          </label>
        </div>
      </div>
      <div class="content-item d-flex p-0">
        <div class="content-item-half  p-0">
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
          </label>
        </div>
        <div class="content-item-half p-0">
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
          </label>
        </div>
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

  infiniteCheckedData = false


  cmNameDelay = Math.floor(Math.random() * 1000000000).toString() + "-delay";
  cmNameDuration = Math.floor(Math.random() * 1000000000).toString() + "-duration";
  cmNameTimingFunction = Math.floor(Math.random() * 1000000000).toString() + "timing-function";

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
    this.infiniteCheckedData = this.value.iterationCount === 'infinite' ? true : false

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

  get infiniteChecked(){
    return this.infiniteCheckedData
  }
  
  set infiniteChecked(arg){
    // console.log('set infiniteChecked(arg)');
    // console.log(arg);
    this.infiniteCheckedData = arg
    if (arg) {
      this.value.iterationCount = 'infinite'
    } else {
      this.value.iterationCount = null
    }
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
