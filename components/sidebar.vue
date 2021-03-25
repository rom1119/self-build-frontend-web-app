<template >
  <sidebar-menu :menu="menu" :relative="true" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import base64 from "base-64";
import { SidebarMenu } from "vue-sidebar-menu";

@Component({
  components: {
    SidebarMenu,
  },
})
export default class Sidebar extends Vue {
  get hasInstitution() {
    return !!this.$auth.user.institution;
  }

  menu = [
    {
      // header: true,
      href: "/dashboard/layouts",
      title: "Lista projektów frontendowych",
      icon: "fa fa-user",
      hiddenOnCollapse: true,
    },
    {
      href: "/",
      title: "Zarządzanie bazą danych",
      icon: "fa fa-user",
    },
  ];

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
