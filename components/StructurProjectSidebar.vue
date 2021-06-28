<template >
  <div class="sidebar_tool sidebar_tool__project-structure-tool" :class="{'sidebar_tool__open' : active}">
    <div class="sidebar_tool__controls">
      <span class="btn" @click="toggleSidebar">
         TAG LIST
      </span>
    </div>
    
      <div class="sidebar_tool__container d-flex flex-col">

        <h5 class="text-center">
          Structure of project
          <span v-if="accualActiveEl">
            {{ accualActiveEl.toString() }}
          </span>
        </h5>


        <div class="sidebar_tool__content">
          
          <div  class="sidebar_tool__content-item bg-fair">

            <structure-project-item-component 
            v-for="child in treeTags" 
            @anyElementMouseClick="onAnyElementMouseClick" 
            @anyElementMouseOver="onMouseOver"
            @anyElementMouseOut="onMouseOut"
            :levelNested="1" 
            :accualActiveEl="accualActiveEl" 
             :value="child" :key="child.uuid" />
              
              
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
import HtmlTag from "~/src/Layout/HtmlTag";
import ActivableTagToManage from "~/src/ActivableTagToManage";
import ActiveToController from "~/src/ActiveToController";
import AppEventsController from "~/src/Controller/AppEventsController";

@Component({
  components: {

  },
})
export default class StructurProjectSidebar extends Vue {
  active = false
  currentComponentName = ''
  selectorsShow = false


  @Prop({required: true})   
  appEventsController: AppEventsController
  
  @Prop({required: true})   
  treeTags: HtmlTag[];

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

  onAnyElementMouseClick(source) {
    this.appEventsController.onAnyElementMouseClick(source)
  }

  onMouseOver(val) {
    // this.appEventsController.onMouseOver(val)
  }

  onMouseOut(val) {
    // console.log('out');
    // this.appEventsController.onMouseOut(val)
  }


  get accualActiveEl() {
    // @ts-ignore
    return this.appEventsController.activeToManageController.accualActiveEl
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
.bg-dark {
  background-color: rgb(30, 33, 40);
}

.bg-fair {
  background-color: white;
}
</style>
