<template >
  <div class="content-item">
    <div class="content-item__elem">
      <h4>
        Select amount values
      </h4>
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
          <label for="">
            predefined keyword for X-position
            <select name="leftVal" :disabled="!value.canSelectXvalKeyword" v-model="value.xVal" @change="change" >
              <option v-for="el in value.getAccessableXAsixProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>

          </label>
          <label for="">
            numeric value for X-position
            <br>
            current unit ({{ value.xValUnit.label }})
            <input type="number"  @input="change"  name="xPos" v-model="value.xVal">
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
          <label for="">
            predefined keyword for Y-position
            <select name="rightVal" :disabled="!value.canSelectYvalKeyword" v-model="value.yVal" @change="change" >
              <option v-for="el in value.getAccessableYAsixProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>
          </label>
          <label for="">
            numeric value for Y-position

            <input type="number"  @input="change" name="yPos" v-model="value.yVal">
          </label>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-item-half" >
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
            predefined keyword global
            <select name="globalVal" v-model="value.xVal" @change="change" >
              <option v-for="el in value.getAccessableXAsixProperty()" :key="el" :value="el">
                {{ el }}
              </option>
            </select>
          </label>
          <label for="">
            numeric value for global

            <input type="number"  @input="change" name="globalPos" v-model="value.xVal">
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
