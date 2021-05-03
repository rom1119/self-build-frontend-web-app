<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
            <div class="content-item" style="display: flex">
                <div
                class="content-item-half"
                @dblclick="hasTransition = !hasTransition"
                :class="{ active: hasTransition }"
                >
                  <h4 class="content-item__header">
                      Transition
                      <span class="add-btn" @click="addDefaultTransitionVal"> + </span>
                  </h4>
                  <transition-value-component
                      v-for="(val, index) in transitionManager.getProperty().getValues()"
                      @change="onChangeTransition(val)"
                      @remove="onRemoveTransition(val)"
                      :key="val.id"
                      :tag="transitionManager.getHtmlTag()"
                      :index="index"
                      :value="val"
                  />
              </div>

              <div
                class="content-item-half"
                @dblclick="hasAnimation = !hasAnimation"
                :class="{ active: hasAnimation }"
                >
                  <h4 class="content-item__header">
                      Animation
                      <span class="add-btn" @click="addDefaultAnimationVal"> + </span>
                  </h4>
                  <animation-value-component
                      v-for="(val, index) in animationManager.getProperty().getValues()"
                      @change="onChangeAnimation(val)"
                      @remove="onRemoveAnimation(val)"
                      :key="val.id"
                      :tag="animationManager.getHtmlTag()"
                      :index="index"
                      :value="val"
                      :animation="animationManager.getProperty()"
                  />
              </div>
            </div>
        </div>
   </div>
</template>

<script lang="ts">
    import {Component, Watch, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import { Chrome }  from '~/node_modules/vue-color';
import AnimationManage from '../AnimationManage';

    @Component({
        components: {
            Chrome
        }
    })
    export default class AnimationManageComponent extends AnimationManage {

      @Prop({default: null, required: true})
      activeTag

      @Prop({default: false, required: false})
      autoUpdate

      @Watch('activeTag')
      updateTag() {
          this.onInitTag()
      }

      onInitTag(){
        if (this.activeTag) {
            this.setAutoSave(this.autoUpdate)
            this.init(this.activeTag)
        }
      }

      async mounted() {
        this.onInitTag()
      }

      timeout;
  // value: HtmlTag


  created() {
    console.log("DDDDDDDD");
    // console.log(this.property);
  }



  // *****************************************  TRANSITION ****************************************************

  get hasTransition() {
    return this.transitionManager.getProperty().active;
  }

  set hasTransition(newVal: boolean) {
    if (!newVal) {
      this.transitionManager.deactivePropCss(
        this.transitionManager.getProperty()
      );
    } else {
      this.transitionManager.activePropCss(
        this.transitionManager.getProperty()
      );
    }
  }

  addDefaultTransitionVal() {
    // @ts-ignore
    let initVal = this.transitionManager.createInitValue();
    this.transitionManager.getProperty().addValue(initVal);
    this.onChangeTransition(initVal);
  }

  onRemoveTransition(val) {
    var length = this.transitionManager.getProperty().getValues().length;
    for (var i = 0; i < length; i++) {
      var el = this.transitionManager.getProperty().getValues()[i];
      if (el.id == val.id) {
        this.transitionManager.getProperty().getValues().splice(i, 1);
        break;
      }
    }
  }

  onChangeTransition(prop) {
    console.log("update");
    // console.log(val);
    this.transitionManager.updateCssProp(this.transitionManager.getProperty());
  }



  // *****************************************  ANIMATION ****************************************************

  get hasAnimation() {
    return this.animationManager.getProperty().active;
  }

  set hasAnimation(newVal: boolean) {
    if (!newVal) {
      this.animationManager.deactivePropCss(
        this.animationManager.getProperty()
      );
    } else {
      this.animationManager.activePropCss(
        this.animationManager.getProperty()
      );
    }
  }

  addDefaultAnimationVal() {
    // @ts-ignore
    let initVal = this.animationManager.createInitValue();
    this.animationManager.getProperty().addValue(initVal);
    this.onChangeTransition(initVal);
  }

  onRemoveAnimation(val) {
    var length = this.animationManager.getProperty().getValues().length;
    for (var i = 0; i < length; i++) {
      var el = this.animationManager.getProperty().getValues()[i];
      if (el.id == val.id) {
        this.animationManager.getProperty().getValues().splice(i, 1);
        break;
      }
    }
  }

  onChangeAnimation(prop) {
    console.log("update");
    // console.log(val);
    this.animationManager.updateCssProp(this.animationManager.getProperty());
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
