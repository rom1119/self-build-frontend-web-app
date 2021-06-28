<template >
  <div 
    :style="styles"
    >
    <template v-if="value.isTextNode">
      <span class="font-black">
      {{ value.text }}
      </span>
        
      
    </template>

    <template v-else>
      <div class="open-tag" 
      @click="onContentMouseClick(value, $event)" 
      @mouseover="onContentMouseOver"
      @mouseout="onContentMouseOut"
      :class="{'selected': tagIsSelected}">
        <span class="font-black"><</span><span class="font-red">{{value.getDomainTagName()}}</span><span class="font-black">></span>
      </div>
        <template v-for="child in value.children">
        
          <structure-project-item-component 
            :value="child" 
            @contentMouseOver="onContentMouseOverChild"
            @contentMouseOut="onContentMouseOutChild"
            @contentMouseClick="onContentMouseClickChild($event)" 
            :accualActiveEl="accualActiveEl" 
            :levelNested="levelNested + 1" 
            :key="child.uuid" />
            
          
        </template>
        
      <span class="font-black"></</span><span class="font-red">{{value.getDomainTagName()}}</span><span class="font-black">></span>
    </template>

  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";
import "vue-cal/dist/vuecal.css";
import _ from "lodash";
import HtmlTag from "~/src/Layout/HtmlTag";

@Component({
    components: {

    }
})
export default class StructureProjectItemComponent extends Vue {
  
  @Prop({required: true, default: null})
  value: HtmlTag
  
  @Prop({required: false, default: null})
  accualActiveEl: HtmlTag
  
  @Prop({required: true, default: null})
  levelNested: number
  

  cmNameZOffset = Math.floor(Math.random() * 1000000000).toString() + "zoffset";

  onContentMouseClick(val, event)
  {
      let ev = {
          event: event,
          target: val
      }
      this.$emit('contentMouseClick', ev)
      this.$emit('anyElementMouseClick', ev)
  }

  onContentMouseClickChild(val)
  {
      this.$emit('contentMouseClick', val)
      this.$emit('anyElementMouseClick', val)
  }

  onContentMouseOver(val)
  {
      this.$emit('anyElementMouseOver', this.value)
      this.$emit('contentMouseOver', this.value)

  }

  onContentMouseOut(val)
  {
      this.$emit('anyElementMouseOut', this.value)
      this.$emit('contentMouseOut', this.value)
  }
  
  onContentMouseOverChild(val)
  {
      this.$emit('anyElementMouseOver', val)
      this.$emit('contentMouseOver', val)

  }

  onContentMouseOutChild(val)
  {
      this.$emit('anyElementMouseOut', val)
      this.$emit('contentMouseOut', val)
  }

  mounted() {
      // this.$refs.manageComponent = null
  }

  get styles() {
    var m = 10 * this.levelNested
    return {
      marginLeft: m + 'px'
    }
  }

  get tagIsSelected() {
    if(!this.accualActiveEl) {
      return false
    }

    return this.value.uuid === this.accualActiveEl.uuid
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
.selected {
    background-color: rgba($color: #d81121, $alpha: 0.4);

}
.font-white {
  color: gainsboro;
}
.font-red {
  color: rgb(223, 48, 48);
}

.font-black {
  color: rgb(94, 91, 91);
}
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
