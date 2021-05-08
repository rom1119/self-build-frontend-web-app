<template >
  <div >
    <div class="content-item__elem">
      <h5>
        Select amount values
      </h5>
      <label>
        Single value
        <input type="radio" @change="change" name="selectAmountValues" id="" :value="false" v-model="value.hasTwoValues">
      </label>
      <label>
        Double value
        <input type="radio" @change="change" name="selectAmountValues" id="" :value="true" v-model="value.hasTwoValues">
      </label>
    </div>
    <template v-if="value.hasTwoValues">
      <div class="content-item__elem d-flex">
        <div class="content-item-half" v-context-menu="cmNameLeft">
          <select-unit-context-menu
                :propertyUnit="value.xValUnit"
                @changePropUnit="
                ($event) => {
                    value.xValUnit = $event; change();
                }
                "
                :ref="cmNameLeft"
            />
            <h5>
              X-position
            </h5>
          <label for="">
            predefined keyword 
            <select name="leftVal" :disabled="!value.canSelectXvalKeyword" v-model="value.xVal" @change="changeXKeywordVal" >
              <option v-for="el in value.getAccessableXAsixProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>

          </label>
          <label for="">
            numeric value
            <br>
            current unit ({{ value.xValUnit.label }})
            <input type="number"  @input="changeXNumericVal"  name="xPos" v-model="value.xVal">
          </label>
        </div>
        <div class="content-item-half" v-context-menu="cmNameRight">
          <select-unit-context-menu
                :propertyUnit="value.yValUnit"
                @changePropUnit="
                ($event) => {
                    value.yValUnit = $event; change();
                }
                "
                :ref="cmNameRight"
            />
            <h5>
              Y-position
            </h5>
          <label for="">
            predefined keyword 
            <select name="rightVal" :disabled="!value.canSelectYvalKeyword" v-model="value.yVal" @change="changeYKeywordVal" >
              <option v-for="el in value.getAccessableYAsixProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>
          </label>
          <label for="">
            numeric value
            <br>
            current unit ({{ value.yValUnit.label }})

            <input type="number"  @input="changeYNumericVal" name="yPos" v-model="value.yVal">
          </label>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-item-half" >
            <h5>
              global position
            </h5>
          <label for="" v-context-menu="cmNameGlobal">
            <select-unit-context-menu
                  :propertyUnit="value.xValUnit"
                  @changePropUnit="
                  ($event) => {
                      value.xValUnit = $event; change();
                  }
                  "
                  :ref="cmNameGlobal"
              />
            predefined keyword
            <select name="globalVal" :disabled="!value.canSelectXvalKeyword" v-model="value.xVal" @change="changeXKeywordVal" >
              <option v-for="el in value.getAccessableProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>
          </label>
          <label for="">
            numeric value
            <br>
            current unit ({{ value.xValUnit.label }})
            <input type="number"  @input="changeXNumericVal" name="globalPos" v-model="value.xVal">
          </label>
        </div>
        
      
    </template>
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

@Component
export default class CssTwoAxisComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: CssTwoAxis

  cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + "left";
  cmNameRight = Math.floor(Math.random() * 1000000000).toString() + "right";
  cmNameGlobal = Math.floor(Math.random() * 1000000000).toString() + "global";

  mounted() {
      // this.$refs.manageComponent = null
  }

  changeXNumericVal() {
    this.value.onChangeXNumericValue()
    this.change()
  }
  changeYNumericVal() {
    this.value.onChangeYNumericValue()
    this.change()
  }
  
  changeXKeywordVal() {
    this.value.onChangeXKeywordValue()
    this.change()
  }
  changeYKeywordVal() {
    this.value.onChangeYKeywordValue()
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
