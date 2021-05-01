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
        <!-- <div class="content-item-half" @dblclick="hasBoxShadow = !hasBoxShadow" :class="{'active': hasBoxShadow}" >
                        <h4 class="content-item__header">
                            Box shadow
                            <span class="add-btn" @click="addDefaultBoxShadowVal">
                                +
                            </span>
                        </h4>
                        <box-shadow-value-component 
                            v-for="(val, index) in boxShadowManager.getProperty().getValues()"
                            @change="onChangeBoxShadow(val)" 
                            @remove="onRemoveBoxShadow(val)" 
                            :key="val.id" 
                            :tag="boxShadowManager.getHtmlTag()" 
                            :index="index" 
                            :value="val" 
                         />

                    </div> -->

        <!-- <li class="content-item__elem" @dblclick="hasFlexGrow = !hasFlexGrow" :class="{'active': hasFlexGrow}">
                        <label :for="'flexGrow-'">
                            Flex Grow
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexGrow" name="flexGrow" :id="'flexGrow-'">

                        </label>
                    </li>
                    <li class="content-item__elem" @dblclick="hasFlexBasis = !hasFlexBasis" :class="{'active': hasFlexBasis}">
                        <label :for="'flexBasis-'">
                            Flex Basis
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexBasis" name="flexBasis" :id="'flexBasis-'">

                        </label>
                    </li>
                    
                    <li class="content-item__elem" @dblclick="hasFlexShrink = !hasFlexShrink" :class="{'active': hasFlexShrink}">
                        <label :for="'flexShrink-'">
                            Flex Shrink
                            <input type="number" style="width: 40px;" class="input-text" v-model="flexShrink" name="flexShrink" :id="'flexShrink-'">

                        </label>
                    </li> -->
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
