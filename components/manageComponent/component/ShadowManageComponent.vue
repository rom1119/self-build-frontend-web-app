<template>
    <div class="component-manage" v-if="value" >
        <div class="component-manage__content">
        
            <div class="content-item" style="display: flex">
                <div
                class="content-item-half"
                @dblclick="hasTextShadow = !hasTextShadow"
                :class="{ active: hasTextShadow }"
                >
                <h4 class="content-item__header">
                    Text shadow
                    <span class="add-btn" @click="addDefaultTextShadowVal"> + </span>
                </h4>
                <text-shadow-value-component
                    v-for="(val, index) in textShadowManager.getProperty().getValues()"
                    @change="onChangeTextShadow(val)"
                    @remove="onRemoveTextShadow(val)"
                    :key="val.id"
                    :tag="textShadowManager.getHtmlTag()"
                    :index="index"
                    :value="val"
                />
                </div>
                <div
                class="content-item-half"
                @dblclick="hasBoxShadow = !hasBoxShadow"
                :class="{ active: hasBoxShadow }"
                >
                <h4 class="content-item__header">
                    Box shadow
                    <span class="add-btn" @click="addDefaultBoxShadowVal"> + </span>
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
                </div>

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
import ShadowManage from '../ShadowManage';

    @Component({
        components: {
            Chrome
        }
    })
    export default class ShadowManageComponent extends ShadowManage {

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

  idName = "text-property-modal";

  created() {
    console.log("DDDDDDDD");
    // console.log(this.property);
  }

  onChangeTextShadow(prop) {
    console.log("update");
    // console.log(val);
    this.textShadowManager.updateCssProp(this.textShadowManager.getProperty());
  }

  onRemoveTextShadow(val) {
    var length = this.textShadowManager.getProperty().getValues().length;
    for (var i = 0; i < length; i++) {
      var el = this.textShadowManager.getProperty().getValues()[i];
      if (el.id == val.id) {
        this.textShadowManager.getProperty().getValues().splice(i, 1);
        break;
      }
    }
  }

  onChangeBoxShadow(prop) {
    console.log("update");
    // console.log(val);
    this.boxShadowManager.updateCssProp(this.boxShadowManager.getProperty());
  }

  onRemoveBoxShadow(val) {
    var length = this.boxShadowManager.getProperty().getValues().length;
    for (var i = 0; i < length; i++) {
      var el = this.boxShadowManager.getProperty().getValues()[i];
      if (el.id == val.id) {
        this.boxShadowManager.getProperty().getValues().splice(i, 1);
        break;
      }
    }
  }

  // *****************************************  TEXT-SHADOW ****************************************************

  get hasTextShadow() {
    return this.textShadowManager.getProperty().active;
  }

  set hasTextShadow(newVal: boolean) {
    if (!newVal) {
      this.textShadowManager.deactivePropCss(
        this.textShadowManager.getProperty()
      );
    } else {
      this.textShadowManager.activePropCss(
        this.textShadowManager.getProperty()
      );
    }
  }

  addDefaultTextShadowVal() {
    // @ts-ignore
    let initVal = this.textShadowManager.createInitValue();
    this.textShadowManager.getProperty().addValue(initVal);
    this.onChangeTextShadow(initVal);
  }

  // *****************************************  BOX-SHADOW ****************************************************

  get hasBoxShadow() {
    return this.boxShadowManager.getProperty().active;
  }

  set hasBoxShadow(newVal: boolean) {
    if (!newVal) {
      this.boxShadowManager.deactivePropCss(
        this.boxShadowManager.getProperty()
      );
    } else {
      this.boxShadowManager.activePropCss(this.boxShadowManager.getProperty());
    }
  }

  addDefaultBoxShadowVal() {
    // @ts-ignore
    let initVal = this.boxShadowManager.createInitValue();
    this.boxShadowManager.getProperty().addValue(initVal);
    this.onChangeBoxShadow(initVal);
  }

  // get widthUnit()
  // {
  //     return  this.widthManager.getProperty().getUnit()
  // }

  // set widthUnit(newVal: UnitSize)
  // {
  //     this.widthManager.getProperty().setUnit(newVal)
  //     this.widthManager.updateCssProp(this.widthManager.getProperty())
  // }

  @Watch("pagination.page", { deep: false, immediate: false })
  async onPaginationChange(e) {}


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
