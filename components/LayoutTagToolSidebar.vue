<template >
  <div class="sidebar_tool sidebar_tool__layout-tag-tool" :class="{'sidebar_tool__open' : active}">
    <div class="sidebar_tool__controls">
      <span class="btn" @click="toggleSidebar">
        HTML Tag 
      </span>
    </div>
    
      <div class="sidebar_tool__container">

        <h5 class="text-center">
          Layout Tag Tool Managed
        </h5>
        <div class="sidebar_tool__tabs">
          <div v-for="tab in tabs" v-show="canSelectTab(tab)"  @click="onChangeTab(tab.componentName)" :key="tab.componentName" :class="{'active' : tab.componentName === currentComponentName }" class="sidebar_tool__tabs__tab-item">
            {{ tab.name }}
          </div>
        </div>

        <div class="sidebar_tool__content">
 
          <div  class="sidebar_tool__content-item">
            <component :is="currentComponentName" v-if="accualActiveEl"  :autoUpdate="true"  :activeTag="accualActiveEl" />
          </div>
        </div>

        
      </div>
  </div>  
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import base64 from "base-64";
import { SidebarMenu } from "vue-sidebar-menu";
import DefaultActiveToManageController from "~/src/Controller/DefaultActiveToManageController";
import TextManageComponent from "~/components/manageComponent/component/TextManageComponent.vue";
import ImgTag from "~/src/Layout/tag/ImgTag";
import SvgTag from "~/src/Layout/tag/SvgTag";

@Component({
  components: {
    TextManageComponent
  },
})
export default class LayoutTagToolSidebar extends Vue {
  active = true
  currentComponentName = ''

  
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

  mounted() {
    this.currentComponentName = 'three-dimensional-manage-component'
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

    if (componentName === 'img-manage-component') {

      if (this.accualActiveEl instanceof ImgTag) {
        return true
      }

      return false
    }
    
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
