<template >
  <div class="sidebar_tool sidebar_tool__layout-tag-tool" :class="{'sidebar_tool__open' : active}">
    <div class="sidebar_tool__controls">
      <span class="btn" @click="toggleSidebar">
        HTML Tag 
      </span>
    </div>
    
      <div class="sidebar_tool__container d-flex flex-col">

        <h5 class="text-center">
          Layout Tag Tool Managed 
          <span v-if="accualActiveEl">
            {{ accualActiveEl.toString() }}
          </span>
        </h5>
        <div class="sidebar_tool__tabs">
          <div v-for="tab in tabs" v-show="canSelectTab(tab.componentName)"  @click="onChangeTab(tab.componentName)" :key="tab.componentName" :class="{'active' : tab.componentName === currentComponentName }" class="sidebar_tool__tabs__tab-item">
            {{ tab.name }}
          </div>
        </div>

        <div class="sidebar_tool__content">
          
          <div  class="sidebar_tool__content-item">
            <div class="sidebar_tool__controls" v-if="accualActiveEl && active">
              <span class="btn" @click.stop="selectorsShow = !selectorsShow">
                Pseudo class 
              </span>
              <pseudo-selector-component
                v-if="selectorsShow && accualActiveEl"
                @selectPseudoSelector="onChangePseudoSelector"
                @close="selectorsShow = false"
                :value="accualActiveEl"
                :styles="{left: '-70px'}"
              />
            </div>
            
              <component :is="currentComponentName" ref="manageComponent" v-if="canSelectTab(currentComponentName)"  :autoUpdate="true"  :activeTag="accualActiveEl" />
                
              
          </div>
        </div>

        
      </div>
  </div>  
  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import base64 from "base-64";
import { SidebarMenu } from "vue-sidebar-menu";
import DefaultActiveToManageController from "~/src/Controller/DefaultActiveToManageController";
import TextManageComponent from "~/components/manageComponent/component/TextManageComponent.vue";
import ImgTag from "~/src/Layout/tag/ImgTag";
import SvgTag from "~/src/Layout/tag/SvgTag";
import AbstractManageComponent from "./manageComponent/AbstractManageComponent";

@Component({
  components: {
    TextManageComponent
  },
})
export default class LayoutTagToolSidebar extends Vue {
  active = false
  currentComponentName = ''
  selectorsShow = false
  
  tabs = [
    {
      name: 'Text',
      componentName: 'text-manage-component'
    },
    {
      name: 'Background',
      componentName: 'background-manage-component'
    },
    {
      name: 'Display',
      componentName: 'display-manage-component'
    },
    {
      name: 'Box Model',
      componentName: 'box-model-manage-component'
    },
    {
      name: 'Attribute',
      componentName: 'html-attr-manage-component'
    },
    {
      name: 'Img',
      componentName: 'img-manage-component'
    },
    {
      name: 'Svg',
      componentName: 'svg-manage-component'
    },
    {
      name: 'Shadow',
      componentName: 'shadow-manage-component'
    },
    {
      name: 'Gradient',
      componentName: 'gradient-manage-component'
    },
    {
      name: 'Animation',
      componentName: 'animation-manage-component'
    },
    {
      name: '3D',
      componentName: 'three-dimensional-manage-component'
    },
  ]

  @Prop({required: false, default: null})   
  accualActiveEl = null

  isImgTag = false
  isSvgTag = false

  $refs: {
      manageComponent: AbstractManageComponent

  }

  mounted() {
    this.currentComponentName = 'text-manage-component'
  }

  @Watch('accualActiveEl.selectedSelector')
  updateTagSelector() {
    if (this.$refs.manageComponent) {
      this.$refs.manageComponent.onChangePseudoSelector()

    }
  }
  
  @Watch('accualActiveEl.currentCssAccessor')
  updateCssAccessor() {
    if (this.$refs.manageComponent) {
      this.$refs.manageComponent.onChangePseudoSelector()

    }
  }

  onChangePseudoSelector(e)
  {
    console.log('onChangePseudoSelector asdasd');
    console.log(e);
    
      this.$refs.manageComponent.onChangePseudoSelector()

  }

  canSelectTab(componentName) {
    if (!this.accualActiveEl) {
      return false
    }

    if (componentName === 'img-manage-component') {

      if (this.accualActiveEl instanceof ImgTag) {
        return true
      }

      return false
    }

    // if (componentName === 'img-manage-component') {

    //   if (this.accualActiveEl instanceof ImgTag) {
    //     return true
    //   }

    //   return false
    // }
    
    if (componentName === 'svg-manage-component') {

      if (this.accualActiveEl instanceof SvgTag) {
        return true
      }

      return false
    }


    return true
  }

  toggleSidebar() {
    this.active = !this.active
  }

  onChangeTab(componentName) {
    this.currentComponentName = componentName
  }
  logout() {
    this.$loadingDialog.show();
    // @ts-ignore

    this.$loadingDialog.hide();
  }
}
</script>

<style  lang="scss">
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
</style>
