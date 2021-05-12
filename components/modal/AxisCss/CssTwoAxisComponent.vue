<template >
  <div >
    <div class="content-item__elem">
      <h5 class="font-md">
        Select amount values
      </h5>
      <label>
        Single value
        <input type="radio" @change="onChangeHasTwoValue" :name="'selectAmountValues' + radioBoxName"  :value="false" v-model="hasTwoValsComp">
      </label>
      <label>
        Double value
        <input type="radio" @change="onChangeHasTwoValue" :name="'selectAmountValues' + radioBoxName"  :value="true" v-model="hasTwoValsComp">
      </label>
    </div>
    <template v-if="value.hasTwoValues">
      <div class="content-item__elem d-flex">
        <div class="content-item-half" >

          <input-val-component 
            labelProp="X position"
            classContainer="content-item p-0"
            contextMenuName="length-units"
            :valueProp="value.xVal"
            :unitProp="value.xValUnit"
            :minRangeProp="-2000"
            :maxRangeProp="2000"
            :stepValue="1"
            @changeValue="value.xVal = $event"
            @changeUnit="value.xValUnit = $event"
            @change="change"
          />
          <label for="">
              predefined keyword 
              <select name="leftVal" :disabled="!value.canSelectXvalKeyword" v-model="value.xVal" @change="changeXKeywordVal" >
                <option v-for="el in value.getAccessableXAsixProperty()" :key="el" :value="el">
                  {{ el }}
                </option>
              </select>

            </label>
        </div>
        <div class="content-item-half">

          <input-val-component 
              labelProp="Y position"
              classContainer="content-item p-0"
              contextMenuName="length-units"
              :valueProp="value.yVal"
              :unitProp="value.yValUnit"
              :minRangeProp="-2000"
              :maxRangeProp="2000"
              :stepValue="1"
              @changeValue="value.yVal = $event"
              @changeUnit="value.yValUnit = $event"
              @change="change"
            />
            <label for="">
              predefined keyword 
              <select name="rightVal" :disabled="!value.canSelectYvalKeyword" v-model="value.yVal" @change="changeYKeywordVal" >
                <option v-for="el in value.getAccessableYAsixProperty()" :key="el" :value="el">
                  {{ el }}
                </option>
              </select>
            </label>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-item-half" >
            <h5>
              global-position
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
import InputValComponent from '../../InputValComponent.vue';

@Component({
    components: {
        InputValComponent
    }
})
export default class CssTwoAxisComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: CssTwoAxis

  cmNameLeft = Math.floor(Math.random() * 1000000000).toString() + "left";
  cmNameRight = Math.floor(Math.random() * 1000000000).toString() + "right";
  cmNameGlobal = Math.floor(Math.random() * 1000000000).toString() + "global";
  radioBoxName = Math.floor(Math.random() * 1000000000).toString() + "radiobox";

  mounted() {
      // this.$refs.manageComponent = null
      this.hasTwoVals = this.value.hasTwoValues
      console.log(this.value);
      console.log(this.value.hasTwoValues);
      console.log(this.hasTwoVals);
      console.log('moubnted CssTwoAxisComponent');
      console.log(this.hasTwoVals);
  }

  hasTwoVals = false

  get hasTwoValsComp() {
    return this.hasTwoVals
  }
  set hasTwoValsComp(arg){
    this.hasTwoVals = arg
    this.value.hasTwoValues = arg
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
  
  onChangeHasTwoValue() {
    this.value.onChangeHasTwoValue()
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
