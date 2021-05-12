<template >
  <div v-if="contextMenuName && unit" :class="classContainer"  >
  <div v-context-menu="cmName">

    <h5 class="p-0 m-0 font-sm">
      {{ labelProp }}
    </h5>
    <component
      :is="getNameContextMenuComponent()"
      :propertyUnit="unit"
      @changePropUnit="
      ($event) => {
          unit = $event; changeUnit();
      }
      "
      :ref="cmName"
    />
    <label for="" class="rel">
      <template v-if="unit">
        <span>
          current unit ({{ unit.label }})
        </span>
      </template>
      <div class="input-for-val rel">
        <div v-if="showMinMax" class="inputs-min-max d-flex">
          <div class="input-number-range">
            Min 
            <br>
            <input type="text" class="w100"  :name="nameMinRange" v-model="minRange">
          </div>
          <div class="input-number-range">
            Max 
            <br>
            <input type="text" class="w100"  :name="nameMaxRange" v-model="maxRange">
          </div>
        </div>
        <input type="number" :step="stepValue" class="w100" @input="changeValue" :name="nameValue" v-model="val">
      </div>
      <input
          v-if="showRangeEl"
          type="range"
          v-model="val"
          @input="changeValue"
          :min="minRange"
          :max="maxRange"
          :step="stepValue"
          class="w100"
        />
    </label>
  </div>
  </div> 
  <div v-else :class="classContainer" style="flex-direction:column;">
    <h5 class="p-0 m-0 font-sm">
      {{ labelProp }}
    </h5>
    <label for="" class="w100">
      <template v-if="unit">
        <span>
          current unit ({{ unit.label }})
        </span>
      </template>
      <div class="input-for-val rel">
        <div v-if="showMinMax" class="inputs-min-max d-flex">
          <div class="input-number-range">
            Min 
            <br>
            <input type="text" class="w100"  :name="nameMinRange" v-model="minRange">
          </div>
          <div class="input-number-range">
            Max 
            <br>
            <input type="text" class="w100"  :name="nameMaxRange" v-model="maxRange">
          </div>
        </div>
        <input type="number" :step="stepValue" class="w100" @input="changeValue" :name="nameValue" v-model="val">
      </div>
      <input
          v-if="showRangeEl"
          type="range"
          v-model="val"
          @input="changeValue"
          :min="minRange"
          :max="maxRange"
          :step="stepValue"
          class="w100"
        />
    </label>
  </div> 
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import base64 from "base-64";
import { SidebarMenu } from "vue-sidebar-menu";
import KeyFrameManageComponent from "~/components/animation/KeyFrameManageComponent.vue";
import Unit from "~/src/Unit/Unit";

@Component({
  components: {
    KeyFrameManageComponent
  },
})
export default class InputValComponent extends Vue {
  active = false

  cmName = Math.floor(Math.random() * 1000000000).toString() + "cmName";
  nameValue = Math.floor(Math.random() * 1000000000).toString() + "nameValue";
  nameMinRange = Math.floor(Math.random() * 1000000000).toString() + "nameMinRange";
  nameMaxRange = Math.floor(Math.random() * 1000000000).toString() + "nameMaxRange";


  @Prop({ required: false, default: null })
  contextMenuName: string ;
  
  @Prop({ required: false, default: 'content-item-half' })
  classContainer: string ;
  
  @Prop({ required: false, default: true })
  showRangeEl: boolean ;
  
  @Prop({ required: false, default: true })
  showMinMax: boolean ;
  
  @Prop({ required: false, default: null })
  unitProp: Unit ;
  
  @Prop({ required: true })
  valueProp: number ;
  
  @Prop({ required: true })
  labelProp: string ;
  
  @Prop({ required: false, default: '1' })
  stepValue: number ;

  @Prop({ required: false })
  minRangeProp: number ;
  
  @Prop({ required: false })
  maxRangeProp: number ;
  
  minRange: number = 0;
  
  maxRange: number  = 100;

  unit: Unit = null
  val: number = 0


  mounted() {
    this.val = this.valueProp
    this.unit = this.unitProp
    if (this.minRangeProp) {
      this.minRange = this.minRangeProp
    }
    
    if (this.maxRangeProp) {
      this.maxRange = this.maxRangeProp
    }

    if (this.val > this.maxRange) {
      this.maxRange = this.val
    }
    
    if (this.val < this.minRange) {
      this.minRange = this.val
    }
  }

  getNameContextMenuComponent() {
    if (this.contextMenuName === 'angle-units') {
      return 'select-angle-unit-context-menu'
    }
    
    if (this.contextMenuName === 'time-units') {
      return 'select-time-unit-context-menu'
    }
    
    if (this.contextMenuName === 'length-units') {
      return 'select-unit-context-menu'
    }

    throw Error('Can not create Context menu from name ' + this.contextMenuName)
  }

  changeUnit() {
    this.$emit('changeUnit', this.unit)
    this.change()
  }
  
  changeValue() {
    this.$emit('changeValue', this.val)
    this.change()
  }

  change() {
    this.$emit('change')
  }
}
</script>

<style  lang="scss">
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

.input-number-range {
  width: 50%;
}

.inputs-min-max {
  top: -185%;
  position: absolute;
  background-color: antiquewhite;
  display: none !important;
}


.input-for-val:hover  .inputs-min-max {
    background-color: rgb(215, 215, 250);
    display: flex !important;
}


</style>
