<template >
  <div class="sidebar_tool sidebar_tool__animate-tool" :class="{'sidebar_tool__open' : active}">
    <div class="sidebar_tool__controls">
        <span class="btn" @click="toggleSidebar">
          Animation 
        </span>
    </div>
    <div class="sidebar_tool_container">
      <h5 class="text-center">
        Animation Tool Manager
      </h5>
    </div>
  </div>  
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import base64 from "base-64";
import { SidebarMenu } from "vue-sidebar-menu";

@Component({
  components: {
  },
})
export default class AnimationToolSidebar extends Vue {
  active = false

  toggleSidebar() {
    this.active = !this.active
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
